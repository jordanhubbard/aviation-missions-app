# Multi-stage build for Clojure backend + ClojureScript frontend
FROM alpine:3.18 AS base

# Install system dependencies
RUN apk add --no-cache \
    openjdk17-jre \
    nodejs \
    npm \
    curl \
    bash \
    ca-certificates

# Install Leiningen for Clojure builds
RUN curl -L -o /usr/local/bin/lein https://raw.githubusercontent.com/technomancy/leiningen/stable/bin/lein \
    && chmod +x /usr/local/bin/lein \
    && LEIN_ROOT=1 lein version

WORKDIR /app

# Frontend build stage  
FROM base AS frontend-build
COPY frontend/ ./frontend/
WORKDIR /app/frontend
RUN npm install && npm run build

# Backend build stage (after frontend to include static files)
FROM base AS backend-build
COPY backend/ ./backend/
# Copy frontend static files into backend resources before building
COPY --from=frontend-build /app/frontend/resources/public ./backend/resources/public/
WORKDIR /app/backend
RUN lein uberjar

# Production stage
FROM base AS production

# Remove build tools to reduce image size
RUN apk del npm

WORKDIR /app

# Copy built backend jar (which now includes frontend static files)
COPY --from=backend-build /app/backend/target/uberjar/aviation-missions-*-standalone.jar /app/aviation-missions.jar

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