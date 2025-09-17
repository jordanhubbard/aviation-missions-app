# Aviation Mission Management Makefile
# Clojure Backend + ClojureScript/Reagent Frontend

# Port Configuration (can be overridden by environment variables)
PORT ?= 8080
API_PORT ?= 3000

# Export ports for use in docker-compose and other tools
export PORT
export API_PORT

# Variables
IMAGE_NAME=aviation-missions
CONTAINER_NAME=aviation-missions-container
COMPOSE_FILE=docker-compose.yml
DEV_COMPOSE_FILE=docker-compose.dev.yml

# Docker BuildKit optimization settings
export DOCKER_BUILDKIT=1
export BUILDKIT_PROGRESS=plain

# Default target
.PHONY: help
help:
	@echo "Aviation Mission Management - Available Commands:"
	@echo ""
	@echo "  start        - Build and start the complete application (production)"
	@echo "  dev          - Build and start in development mode"
	@echo "  restart      - Stop and restart the application (convenience command)"
	@echo "  stop         - Stop the running application"
	@echo "  logs         - View application logs (blocking)"
	@echo "  clean        - Complete cleanup: stop, remove containers, images, and files"
	@echo "  build        - Build the Docker image"
	@echo "  test-local   - Test the application locally"
	@echo ""
	@echo "  Backend Development:"
	@echo "  dev-backend  - Start only the Clojure backend for development"
	@echo "  dev-frontend - Start only the ClojureScript frontend for development"
	@echo ""
	@echo "Port Configuration:"
	@echo "  PORT = $(PORT) (Main application port)"
	@echo "  API_PORT = $(API_PORT) (Backend API port)"
	@echo ""
	@echo "Usage:"
	@echo "  make start                    # Production mode"
	@echo "  make dev                      # Development mode"
	@echo "  make lint                     # Run code analysis and linting"
	@echo "  PORT=9000 make start          # Use custom port"

# Build the Docker image
.PHONY: build
build:
	@echo "🔨 Building Aviation Mission Management Docker image..."
	docker build -t $(IMAGE_NAME):latest .

# Run linting analysis on the code
.PHONY: lint
lint:
	@echo "🔍 Running Clojure code analysis and linting..."
	docker build --target linting -t $(IMAGE_NAME):lint .
	@echo "✅ Build completed successfully!"

# Start the application in production mode
.PHONY: start
start: build
	@echo "🚀 Starting Aviation Mission Management (Production)..."
	docker-compose -f $(COMPOSE_FILE) up -d
	@echo "✅ Application started successfully!"
	@echo ""
	@echo "🌐 Main Application: http://localhost:$(PORT)"
	@echo "📚 API Documentation: http://localhost:$(PORT)/api/swagger.json"
	@echo ""
	@echo "To view logs: make logs"
	@echo "To stop: make stop"

# Start the application in development mode
.PHONY: dev
dev: build
	@echo "🚀 Starting Aviation Mission Management (Development)..."
	docker-compose -f $(DEV_COMPOSE_FILE) up -d
	@echo "✅ Development environment started successfully!"
	@echo ""
	@echo "🌐 Main Application: http://localhost:$(PORT)"
	@echo "📚 API Documentation: http://localhost:$(PORT)/api/swagger.json"
	@echo ""
	@echo "To view logs: make logs"
	@echo "To stop: make stop"

# Start only the backend for development
.PHONY: dev-backend
dev-backend:
	@echo "☕ Starting Clojure backend for development..."
	cd backend && lein run

# Start only the frontend for development
.PHONY: dev-frontend
dev-frontend:
	@echo "⚛️ Starting ClojureScript frontend for development..."
	cd frontend && npm install && npm run dev

# Stop the running application
.PHONY: stop
stop:
	@echo "🛑 Stopping Aviation Mission Management..."
	-docker-compose -f $(COMPOSE_FILE) down 2>/dev/null || true
	-docker-compose -f $(DEV_COMPOSE_FILE) down 2>/dev/null || true
	@echo "✅ Application stopped successfully!"

# Restart the application (stop + start)
.PHONY: restart
restart: stop start
	@echo "🔄 Application restarted successfully!"

# View application logs (blocking)
.PHONY: logs
logs:
	@echo "📋 Viewing Aviation Mission Management logs..."
	@echo "Press Ctrl+C to stop viewing logs"
	docker-compose -f $(COMPOSE_FILE) logs -f 2>/dev/null || docker-compose -f $(DEV_COMPOSE_FILE) logs -f

# Clean up everything
.PHONY: clean
clean: stop
	@echo "🧹 Cleaning up Docker resources..."
	-docker-compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans 2>/dev/null || true
	-docker-compose -f $(DEV_COMPOSE_FILE) down -v --rmi all --remove-orphans 2>/dev/null || true
	-docker rmi $(IMAGE_NAME):latest 2>/dev/null || true
	-docker rmi $(IMAGE_NAME):dev 2>/dev/null || true
	@echo "🗑️  Cleaning up application data..."
	-rm -rf data/* 2>/dev/null || true
	-rm -rf backend/target/ 2>/dev/null || true
	-rm -rf frontend/dist/ 2>/dev/null || true
	-rm -rf frontend/node_modules/.cache/ 2>/dev/null || true
	@echo "✅ Complete cleanup finished!"

# Test the application locally
.PHONY: test-local
test-local:
	@echo "🧪 Testing application locally..."
	@echo "Testing backend build..."
	cd backend && lein test
	@echo "Testing frontend build..."
	cd frontend && npm install && npm run build
	@echo "✅ Local tests completed!"