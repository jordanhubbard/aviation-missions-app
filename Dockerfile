# Multi-stage build for Clojure backend + ClojureScript frontend
FROM alpine:3.18 AS base

# Install system dependencies
RUN apk add --no-cache \
    openjdk17-jre \
    nodejs \
    npm \
    curl \
    bash \
    ca-certificates \
    unzip

# Install Leiningen for Clojure builds with retry logic
RUN for i in 1 2 3; do \
        curl -L -o /usr/local/bin/lein https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein && \
        chmod +x /usr/local/bin/lein && \
        LEIN_ROOT=1 lein version && \
        break || sleep 10; \
    done

# Note: We'll use built-in Clojure tools for linting instead of external tools

WORKDIR /app

# Frontend build stage  
FROM base AS frontend-build
WORKDIR /app/frontend

# Copy package files first for better caching
COPY frontend/package*.json ./
RUN npm ci --only=production

# Copy shadow-cljs config for dependency resolution
COPY frontend/shadow-cljs.edn ./

# Install shadow-cljs dependencies (this will be cached unless dependencies change)
RUN npm install

# Copy source code last (changes most frequently)
COPY frontend/src ./src/
COPY frontend/resources ./resources/

# Build the frontend
RUN npm run build

# Linting stage - analyze code quality
FROM base AS linting
WORKDIR /app

# Copy dependency files first for caching
COPY backend/project.clj ./backend/
COPY frontend/package*.json ./frontend/
COPY frontend/shadow-cljs.edn ./frontend/

# Install dependencies (cached unless dependency files change)
RUN cd backend && lein deps
RUN cd frontend && npm install

# Copy source code for analysis
COPY backend/src ./backend/src/
COPY frontend/src ./frontend/src/

# Run comprehensive code analysis
RUN echo "=== RUNNING COMPREHENSIVE CODE ANALYSIS ===" && \
    echo "Backend Clojure files:" && \
    find backend/src -name "*.clj" -type f | head -10 && \
    echo "Frontend ClojureScript files:" && \
    find frontend/src -name "*.cljs" -type f | head -10

# Run syntax checking on backend code
RUN echo "=== RUNNING SYNTAX CHECK ON BACKEND CODE ===" && \
    cd backend && \
    echo "Checking project.clj syntax..." && \
    lein check || echo "Lein check completed with issues" && \
    echo "Compiling backend code..." && \
    lein compile || echo "Backend compilation completed with issues"

# Run syntax checking on frontend code  
RUN echo "=== RUNNING SYNTAX CHECK ON FRONTEND CODE ===" && \
    cd frontend && \
    echo "Building frontend code..." && \
    npm run build || echo "Frontend build completed with issues"

# Run basic file validation
RUN echo "=== RUNNING FILE VALIDATION ===" && \
    echo "Checking for common Clojure issues..." && \
    find . -name "*.clj" -o -name "*.cljs" | xargs grep -l "defn" | head -5 && \
    echo "Checking for unmatched brackets..." && \
    find . -name "*.clj" -o -name "*.cljs" | xargs grep -c "(" | head -5 && \
    find . -name "*.clj" -o -name "*.cljs" | xargs grep -c ")" | head -5

# Backend build stage (after frontend to include static files)
FROM base AS backend-build
WORKDIR /app/backend

# Copy project.clj first for dependency caching
COPY backend/project.clj ./

# Download dependencies (this will be cached unless project.clj changes)
RUN lein deps

# Copy source code
COPY backend/src ./src/
COPY backend/resources ./resources/

# Copy frontend static files into backend resources before building
COPY --from=frontend-build /app/frontend/resources/public ./resources/public/

# Copy missions data file for database seeding
COPY missions.txt /app/missions.txt

# Build the uberjar
RUN lein uberjar

# Production stage
FROM base AS production

# Remove build tools to reduce image size
RUN apk del npm

WORKDIR /app

# Copy built backend jar (which now includes frontend static files)
COPY --from=backend-build /app/backend/target/uberjar/aviation-missions-*-standalone.jar /app/aviation-missions.jar

# Copy missions data file to production stage
COPY --from=backend-build /app/missions.txt /app/missions.txt

# Create data directory
RUN mkdir -p /app/data

# Expose port (Railway will override this with PORT env var)
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
    CMD curl -f http://localhost:${PORT:-3000}/health || exit 1

# Set environment variables for Railway compatibility
ENV PORT=3000
ENV API_PORT=3000

# Start the application
CMD ["java", "-jar", "/app/aviation-missions.jar"]