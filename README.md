# Aviation Mission Management System

A full-stack web application for managing general aviation training missions. Built with Clojure backend and TypeScript/React frontend, fully containerized with Docker.

## Features

- **Mission Catalog**: Browse and search aviation training missions by category and difficulty
- **Mission Details**: Comprehensive mission information including objectives, procedures, and routes
- **Community Features**: Comments, reviews, and completion tracking
- **Mission Submission**: Community-driven mission suggestions with admin review
- **API Documentation**: Full OpenAPI/Swagger documentation with introspection
- **Responsive Design**: Modern Bootstrap-based UI that works on all devices

## Quick Start

### Using Docker (Recommended)

1. **Clone and build**:
   ```bash
   git clone <repository-url>
   cd scenario-generator
   make build
   ```

2. **Start the application**:
   ```bash
   make start
   ```

3. **Access the application**:
   - Web Interface: http://localhost:8080
   - API Documentation: http://localhost:8080/docs/
   - API Endpoint: http://localhost:3000 (for direct backend access)

### Development Mode

1. **Setup development environment**:
   ```bash
   make dev-setup
   ```

2. **Start backend** (Terminal 1):
   ```bash
   make dev-backend
   ```

3. **Start frontend** (Terminal 2):
   ```bash
   make dev-frontend
   ```

4. **Access development servers**:
   - Frontend: http://localhost:3001
   - Backend API: http://localhost:3000

## Architecture

### Backend (Clojure)
- **Framework**: Ring + Compojure
- **Database**: H2 (embedded, file-based)
- **API**: RESTful with JSON
- **Documentation**: OpenAPI/Swagger spec
- **Port**: 3000 (configurable via API_PORT)

### Frontend (TypeScript + React)
- **Framework**: React 18 + TypeScript
- **UI Library**: React Bootstrap
- **Build Tool**: Vite
- **State Management**: React Query
- **Port**: 8080 (configurable via WEB_PORT)

### Container Architecture
- **Single Container**: Both services run in one container
- **Reverse Proxy**: Nginx serves frontend and proxies API calls
- **Database**: H2 file database persisted in Docker volume
- **Networking**: Internal communication between services

## Configuration

Environment variables can be set in a `.env` file (copy from `env.example`):

```bash
WEB_PORT=8080          # Web interface port
API_PORT=3000          # API server port
DATABASE_URL=jdbc:h2:./data/aviation-missions  # Database location
```

## API Endpoints

### Missions
- `GET /missions` - List all missions (with filtering)
- `GET /missions/:id` - Get mission details
- `POST /missions` - Create new mission
- `PUT /missions/:id` - Update mission
- `DELETE /missions/:id` - Delete mission

### Interactions
- `GET /missions/:id/comments` - Get mission comments
- `POST /missions/:id/comments` - Add comment
- `GET /missions/:id/reviews` - Get mission reviews
- `POST /missions/:id/reviews` - Add review
- `POST /missions/:id/completed` - Mark mission completed

### Submissions
- `GET /submissions` - List submissions (admin)
- `POST /submissions` - Submit new mission
- `PUT /submissions/:id/approve` - Approve submission
- `PUT /submissions/:id/reject` - Reject submission

### Documentation
- `GET /swagger.json` - OpenAPI specification (JSON)
- `/docs/` - Interactive Swagger UI documentation

## Database Schema

The application uses H2 database with the following tables:
- `missions` - Core mission data
- `comments` - Mission comments
- `reviews` - Mission reviews and ratings
- `mission_completions` - Completion tracking
- `submissions` - Pending mission submissions

## Mission Format

Missions follow a structured format with:
- **Title** and **Category**
- **Difficulty** rating (1-10)
- **Objective** - What pilots will learn
- **Mission Description** - Detailed procedures
- **Why Description** - Educational value
- **Route** - Suggested flight path
- **Notes** - Additional considerations

## Development

### Backend Development
```bash
cd backend
lein ring server-headless 3000  # Start development server
lein test                       # Run tests
lein uberjar                   # Build production JAR
```

### Frontend Development
```bash
cd frontend
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run linter
```

### Docker Development
```bash
make build       # Build container
make start       # Start application
make logs        # View logs
make shell       # Access container shell
make stop        # Stop application
make clean       # Clean up containers
```

## Deployment

### Production Deployment
1. Set environment variables in `.env`
2. Run `make production`
3. Configure reverse proxy (nginx/Apache) to point to container
4. Set up SSL/TLS certificates
5. Configure DNS to point to server

### Port Configuration
The application uses configurable ports:
- Default web port: 8080
- Default API port: 3000
- Change via `WEB_PORT` and `API_PORT` environment variables

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

### Mission Contributions
Use the "Submit Mission" feature in the web interface to contribute new missions. All submissions are reviewed before publication.

## License

[License information]

## Support

For support and questions:
- Check the API documentation at `/api/swagger.json`
- Review the mission format in `missions.txt`
- Open an issue in the repository
