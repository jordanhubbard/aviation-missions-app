# Multi-stage build for the aviation mission application
FROM clojure:temurin-21-lein AS backend-build

WORKDIR /app/backend
COPY backend/project.clj .
RUN lein deps

COPY backend/src ./src
COPY backend/resources ./resources
RUN lein uberjar

# Frontend build stage
FROM node:20-alpine AS frontend-build

WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm install

COPY frontend/ ./
RUN npm run build

# Runtime stage
FROM eclipse-temurin:21-jre-alpine

# Install nginx, wget, and curl for serving frontend and health checks
RUN apk add --no-cache nginx wget curl

# Copy backend jar
COPY --from=backend-build /app/backend/target/uberjar/aviation-missions-*-standalone.jar /app/aviation-missions.jar

# Copy missions data file
COPY missions.txt /app/missions.txt

# Copy frontend build
COPY --from=frontend-build /app/frontend/dist /usr/share/nginx/html

# Download and setup Swagger UI
RUN wget -O swagger-ui.tar.gz https://github.com/swagger-api/swagger-ui/archive/refs/tags/v5.10.3.tar.gz && \
    tar -xzf swagger-ui.tar.gz && \
    mkdir -p /usr/share/nginx/html/swagger-ui && \
    cp -r swagger-ui-5.10.3/dist/* /usr/share/nginx/html/swagger-ui/ && \
    rm -rf swagger-ui.tar.gz swagger-ui-5.10.3

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Create startup script
COPY start.sh /start.sh
RUN chmod +x /start.sh

EXPOSE 8080 3000

CMD ["/start.sh"]
