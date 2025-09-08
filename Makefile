# Aviation Mission Management Application Makefile

.PHONY: help build start stop dev-backend dev-frontend install clean logs shell

# Default target
help:
	@echo "Aviation Mission Management Application"
	@echo ""
	@echo "Available commands:"
	@echo "  build         Build the Docker container"
	@echo "  start         Start the application in Docker"
	@echo "  stop          Stop the application"
	@echo "  dev-backend   Start backend development server"
	@echo "  dev-frontend  Start frontend development server"
	@echo "  install       Install all dependencies"
	@echo "  clean         Clean up containers and volumes"
	@echo "  logs          Show application logs"
	@echo "  shell         Open shell in running container"

# Build the Docker container
build:
	@echo "Building Docker container..."
	docker-compose build

# Start the application
start:
	@echo "Starting Aviation Mission Management application..."
	docker-compose up -d
	@echo "Application started!"
	@echo "Web interface: http://localhost:8080"
	@echo "API Documentation: http://localhost:8080/docs/"
	@echo "API endpoint: http://localhost:3000 (direct backend access)"

# Stop the application
stop:
	@echo "Stopping application..."
	docker-compose down

# Development mode - backend only
dev-backend:
	@echo "Starting backend development server..."
	cd backend && lein ring server-headless 3000

# Development mode - frontend only
dev-frontend:
	@echo "Starting frontend development server..."
	cd frontend && npm run dev

# Install dependencies
install:
	@echo "Installing backend dependencies..."
	cd backend && lein deps
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

# Clean up
clean:
	@echo "Cleaning up Docker containers and volumes..."
	docker-compose down -v --remove-orphans
	docker system prune -f

# Show logs
logs:
	docker-compose logs -f

# Open shell in running container
shell:
	docker-compose exec aviation-app /bin/sh

# Development setup
dev-setup: install
	@echo "Setting up development environment..."
	@echo "Creating data directory..."
	mkdir -p data
	@echo "Development environment ready!"
	@echo ""
	@echo "To start development:"
	@echo "  Terminal 1: make dev-backend"
	@echo "  Terminal 2: make dev-frontend"
	@echo ""
	@echo "Or run in Docker:"
	@echo "  make build && make start"

# Quick start for production
production: build start
	@echo "Production deployment started!"
	@echo "Access the application at http://localhost:8080"
