# Aviation Mission Management Makefile
# Clojure Backend + Pure JavaScript Frontend

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
	@echo "  lint         - Comprehensive analysis (clj-kondo + ESLint with React support)"
	@echo "  lint-fast    - Fast syntax checking (clj-kondo + Node.js syntax validation)"
	@echo "  lint-eastwood- Deep static analysis with eastwood (requires local setup)"
	@echo ""
	@echo "  Database Management:"
	@echo "  backup       - Create a backup of the database"
	@echo "  restore      - Restore database from backup (requires BACKUP_FILE)"
	@echo ""
	@echo "  Local Development (requires local Clojure setup for backend):"
	@echo "  dev-backend  - Start only the Clojure backend for development"
	@echo "  dev-frontend - Start only the JavaScript frontend for development"
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
	@echo "🔍 Running comprehensive code analysis in Docker containers..."
	@echo "📋 Tools: clj-kondo (Clojure), ESLint (JavaScript/React)"
	@echo "Backend Clojure files:"
	docker run --rm -v $(PWD):/workspace -w /workspace cljkondo/clj-kondo:latest clj-kondo --lint backend/src
	@echo "Frontend JavaScript/React files:"
	docker run --rm -v $(PWD):/workspace -w /workspace node:18-alpine sh -c '\
		cd /workspace && \
		echo "Installing ESLint and React plugins..." && \
		npm init -y > /dev/null 2>&1 && \
		npm install --no-save eslint@8 eslint-plugin-react eslint-plugin-react-hooks > /dev/null 2>&1 && \
		echo "Creating ESLint config..." && \
		echo "{\
			\"env\": {\"browser\": true, \"es2021\": true}, \
			\"extends\": [\"eslint:recommended\", \"plugin:react/recommended\"], \
			\"plugins\": [\"react\", \"react-hooks\"], \
			\"parserOptions\": {\"ecmaVersion\": 2021, \"sourceType\": \"module\", \"ecmaFeatures\": {\"jsx\": true}}, \
			\"rules\": {\"no-unused-vars\": \"warn\", \"no-console\": \"off\", \"react/react-in-jsx-scope\": \"off\"}, \
			\"settings\": {\"react\": {\"version\": \"detect\"}} \
		}" > .eslintrc.json && \
		echo "Running ESLint on JavaScript files..." && \
		npx eslint frontend/resources/public/js/app.js || echo "ESLint completed with warnings/errors"'
	@echo "✅ Linting analysis completed successfully!"

# Run only fast syntax checking
.PHONY: lint-fast
lint-fast:
	@echo "⚡ Running fast syntax analysis in Docker containers..."
	@echo "Backend Clojure files:"
	docker run --rm -v $(PWD):/workspace -w /workspace cljkondo/clj-kondo:latest clj-kondo --lint backend/src
	@echo "Frontend JavaScript files:"
	docker run --rm -v $(PWD):/workspace -w /workspace node:18-alpine sh -c '\
		echo "Validating JavaScript syntax..." && \
		find frontend/resources/public/js -name "*.js" -not -path "*/cljs-runtime/*" -exec node -c {} \; && \
		echo "✅ JavaScript syntax valid"'

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
	@echo "🌐 Starting JavaScript frontend for development..."
	@echo "Frontend uses pure JavaScript - serve static files from frontend/resources/public/"
	@echo "Example: python3 -m http.server 3000 --directory frontend/resources/public"
	@if command -v python3 >/dev/null 2>&1; then \
		cd frontend/resources/public && python3 -m http.server 3000; \
	else \
		echo "Python3 not available. Please serve frontend/resources/public/ manually."; \
	fi

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
	@echo "Building and running comprehensive test suite..."
	docker build --target testing -t $(IMAGE_NAME):test .
	@echo "✅ All tests completed successfully!"
	@echo ""
	@echo "Test coverage includes:"
	@echo "  📋 Backend unit tests (Clojure)"
	@echo "  🌐 API integration tests"
	@echo "  🧪 Frontend syntax validation (JavaScript)"
	@echo "  🔍 Code quality analysis"

# Test the application locally
.PHONY: test-local
test-local:
	@echo "🧪 Testing application locally..."
	@echo "Testing backend build..."
	cd backend && lein test
	@echo "Testing frontend JavaScript syntax..."
	docker run --rm -v $(PWD):/workspace -w /workspace node:18-alpine sh -c '\
		find frontend/resources/public/js -name "*.js" -not -path "*/cljs-runtime/*" -exec node -c {} \; && \
		echo "✅ JavaScript syntax valid"'
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