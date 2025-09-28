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
	@echo "  restart      - Stop and restart the application (convenience command)"
	@echo "  stop         - Stop the running application"
	@echo "  logs         - View application logs (blocking)"
	@echo "  clean        - Complete cleanup: stop, remove containers, images, and files"
	@echo "  build        - Build the Docker image"
	@echo "  test         - Run tests in Docker containers (recommended for CI/CD)"
	@echo "  test-local   - Test the application locally (requires local setup)"
	@echo ""
	@echo "  Code Quality & Analysis:"
	@echo "  lint         - Comprehensive analysis (clj-kondo + eastwood + compilation)"
	@echo "  lint-fast    - Fast syntax checking with clj-kondo only"
	@echo "  lint-eastwood- Deep static analysis with eastwood (requires local setup)"
	@echo ""
	@echo "  Database Management:"
	@echo "  backup       - Create a backup of the database"
	@echo "  restore      - Restore database from backup (requires BACKUP_FILE)"
	@echo ""
	@echo "  Local Development (requires local Clojure/Node.js setup):"
	@echo "  dev-backend  - Start only the Clojure backend for development"
	@echo "  dev-frontend - Start only the ClojureScript frontend for development"
	@echo ""
	@echo "Port Configuration:"
	@echo "  PORT = $(PORT) (Main application port)"
	@echo "  API_PORT = $(API_PORT) (Backend API port)"
	@echo ""
	@echo "Usage:"
	@echo "  make start                    # Production mode (Docker)"
	@echo "  make lint                     # Comprehensive code analysis"
	@echo "  make lint-fast                # Quick syntax check"
	@echo "  PORT=9000 make start          # Use custom port"
	@echo ""
	@echo "Note: Development mode requires docker-compose.dev.yml (not included)"
	@echo "      For local development, use dev-backend and dev-frontend separately"

# Build the Docker image
.PHONY: build
build:
	@echo "🔨 Building Aviation Mission Management Docker image..."
	docker build -t $(IMAGE_NAME):latest .

# Run comprehensive linting analysis on the code
.PHONY: lint
lint:
	@echo "🔍 Running comprehensive Clojure/ClojureScript code analysis..."
	@echo "📋 Tools: clj-kondo, eastwood, leiningen, shadow-cljs"
	docker build --target linting -t $(IMAGE_NAME):lint .
	@echo "✅ Linting analysis completed successfully!"

# Run only clj-kondo for fast syntax checking
.PHONY: lint-fast
lint-fast:
	@echo "⚡ Running fast clj-kondo syntax analysis..."
	@echo "Backend Clojure files:"
	@if command -v clj-kondo >/dev/null 2>&1; then \
		clj-kondo --lint backend/src --config '{:output {:format :text}}'; \
	else \
		echo "clj-kondo not installed locally, using Docker..."; \
		docker run --rm -v $(PWD):/workspace -w /workspace cljkondo/clj-kondo:latest clj-kondo --lint backend/src; \
	fi
	@echo "Frontend ClojureScript files:"
	@if command -v clj-kondo >/dev/null 2>&1; then \
		clj-kondo --lint frontend/src --config '{:output {:format :text}}'; \
	else \
		echo "clj-kondo not installed locally, using Docker..."; \
		docker run --rm -v $(PWD):/workspace -w /workspace cljkondo/clj-kondo:latest clj-kondo --lint frontend/src; \
	fi

# Run eastwood static analysis (requires local setup)
.PHONY: lint-eastwood
lint-eastwood:
	@echo "🔬 Running eastwood static analysis..."
	@if [ -f backend/deps.edn ]; then \
		cd backend && clojure -Sdeps '{:deps {jonase/eastwood {:mvn/version "1.4.2"}}}' -M -m eastwood.lint '{:source-paths ["src"] :exclude-linters [:constant-test :wrong-arity]}'; \
	else \
		echo "Creating deps.edn for eastwood..."; \
		echo '{:deps {jonase/eastwood {:mvn/version "1.4.2"}}}' > backend/deps.edn; \
		cd backend && clojure -Sdeps '{:deps {jonase/eastwood {:mvn/version "1.4.2"}}}' -M -m eastwood.lint '{:source-paths ["src"] :exclude-linters [:constant-test :wrong-arity]}'; \
	fi

# Start the application in production mode
.PHONY: start
start: build
	@echo "🚀 Starting Aviation Mission Management (Production)..."
	docker compose -f $(COMPOSE_FILE) up -d
	@echo "✅ Application started successfully!"
	@echo ""
	@echo "🌐 Main Application: http://localhost:$(PORT)"
	@echo "📚 API Documentation: http://localhost:$(PORT)/api/swagger.json"
	@echo ""
	@echo "To view logs: make logs"
	@echo "To stop: make stop"

# Start the application in development mode
.PHONY: dev
dev:
	@echo "❌ Development mode requires docker-compose.dev.yml which is not included."
	@echo ""
	@echo "For local development, use:"
	@echo "  make dev-backend   # Start backend (requires Leiningen)"
	@echo "  make dev-frontend  # Start frontend (requires Node.js)"
	@echo ""
	@echo "For production deployment, use:"
	@echo "  make start         # Full Docker deployment"
	@exit 1

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
	-docker compose -f $(COMPOSE_FILE) down 2>/dev/null || true
	-docker compose -f $(DEV_COMPOSE_FILE) down 2>/dev/null || true
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
	docker compose -f $(COMPOSE_FILE) logs -f 2>/dev/null || docker compose -f $(DEV_COMPOSE_FILE) logs -f

# Clean up everything
.PHONY: clean
clean: stop
	@echo "🧹 Cleaning up Docker resources..."
	-docker compose -f $(COMPOSE_FILE) down -v --rmi all --remove-orphans 2>/dev/null || true
	-docker compose -f $(DEV_COMPOSE_FILE) down -v --rmi all --remove-orphans 2>/dev/null || true
	-docker rmi $(IMAGE_NAME):latest 2>/dev/null || true
	-docker rmi $(IMAGE_NAME):dev 2>/dev/null || true
	@echo "🗑️  Cleaning up application data..."
	-rm -rf data/* 2>/dev/null || true
	-rm -rf backend/target/ 2>/dev/null || true
	-rm -rf frontend/dist/ 2>/dev/null || true
	-rm -rf frontend/node_modules/.cache/ 2>/dev/null || true
	@echo "✅ Complete cleanup finished!"

# Test the application in Docker containers
.PHONY: test
test:
	@echo "🧪 Testing application in Docker containers..."
	@echo "Building test environment..."
	docker build --target testing -t $(IMAGE_NAME):test .
	@echo "✅ All tests completed successfully!"

# Test the application locally
.PHONY: test-local
test-local:
	@echo "🧪 Testing application locally..."
	@echo "Testing backend build..."
	cd backend && lein test
	@echo "Testing frontend build..."
	cd frontend && npm install && npm run build
	@echo "✅ Local tests completed!"

# Create a backup of the database
.PHONY: backup
backup:
	@echo "🗄️  Creating database backup..."
	@if [ ! -f "./data/aviation-missions.mv.db" ]; then \
		echo "❌ No database found. Make sure the application has been started at least once."; \
		exit 1; \
	fi
	@./scripts/backup-database.sh

# Restore database from backup
.PHONY: restore
restore:
	@echo "🔄 Restoring database from backup..."
	@if [ -z "$(BACKUP_FILE)" ]; then \
		echo "❌ Please specify BACKUP_FILE. Usage: make restore BACKUP_FILE=backups/aviation-missions-backup-YYYYMMDD_HHMMSS.tar.gz"; \
		exit 1; \
	fi
	@if [ ! -f "$(BACKUP_FILE)" ]; then \
		echo "❌ Backup file not found: $(BACKUP_FILE)"; \
		exit 1; \
	fi
	@echo "⚠️  This will overwrite the current database. Continue? [y/N]" && read ans && [ $${ans:-N} = y ]
	@echo "🛑 Stopping application..."
	@$(MAKE) stop
	@echo "📦 Extracting backup..."
	@mkdir -p ./temp-restore
	@tar -xzf "$(BACKUP_FILE)" -C ./temp-restore/
	@BACKUP_NAME=$$(basename "$(BACKUP_FILE)" .tar.gz) && \
		cp ./temp-restore/$$BACKUP_NAME/* ./data/ && \
		rm -rf ./temp-restore
	@echo "🚀 Starting application..."
	@$(MAKE) start
	@echo "✅ Database restored successfully!"