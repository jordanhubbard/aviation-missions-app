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
   - Web Interface: http://localhost:8080 (default, configurable via WEB_PORT)
   - API Documentation: http://localhost:8080/docs/ (uses WEB_PORT)
   - API Endpoint: http://localhost:3000 (default, configurable via API_PORT)

### Custom Port Configuration

You can override the default ports using environment variables:

```bash
# Use custom ports
WEB_PORT=9000 API_PORT=4000 make start

# Or set them permanently in your shell
export WEB_PORT=9000
export API_PORT=4000
make start
```

The application will then be available at:
- Web Interface: http://localhost:9000
- API Documentation: http://localhost:9000/docs/
- API Endpoint: http://localhost:4000

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

### Quick Production Deployment
```bash
# Clone and build
git clone <repository-url>
cd scenario-generator
make build

# Start with custom ports
WEB_PORT=80 API_PORT=3000 make start
```

### Automated Cloud Deployment
Use the included deployment script for easy cloud deployment:

```bash
# Make the script executable
chmod +x deploy-cloud.sh

# Deploy to different providers
./deploy-cloud.sh docker-hub
./deploy-cloud.sh aws-ecs
./deploy-cloud.sh google-run
./deploy-cloud.sh azure-aci
./deploy-cloud.sh kubernetes
./deploy-cloud.sh railway
./deploy-cloud.sh heroku

# With custom options
./deploy-cloud.sh google-run --image-name my-aviation-app --web-port 80
```

### Containerized Service Providers

#### Docker Hub / Container Registry Deployment

**Step 1: Build and Push to Registry**
```bash
# Build the image
docker build -t your-registry/aviation-missions:latest .

# Push to your registry (Docker Hub, AWS ECR, Google Container Registry, etc.)
docker push your-registry/aviation-missions:latest
```

**Step 2: Deploy with Docker Compose**
```yaml
# docker-compose.prod.yml
version: '3.8'
services:
  aviation-app:
    image: your-registry/aviation-missions:latest
    ports:
      - "80:8080"    # Map host port 80 to container port 8080
      - "3000:3000"  # API port (optional for direct access)
    environment:
      - WEB_PORT=8080
      - API_PORT=3000
      - DATABASE_URL=jdbc:h2:./data/aviation-missions
    volumes:
      - aviation_data:/app/data  # Persist database
    restart: unless-stopped
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:3000/health"]
      interval: 30s
      timeout: 10s
      retries: 3

volumes:
  aviation_data:
```

```bash
docker-compose -f docker-compose.prod.yml up -d
```

#### AWS ECS (Elastic Container Service)

**Task Definition JSON:**
```json
{
  "family": "aviation-missions",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "executionRoleArn": "arn:aws:iam::ACCOUNT:role/ecsTaskExecutionRole",
  "containerDefinitions": [
    {
      "name": "aviation-app",
      "image": "your-registry/aviation-missions:latest",
      "portMappings": [
        {
          "containerPort": 8080,
          "protocol": "tcp"
        }
      ],
      "environment": [
        {"name": "WEB_PORT", "value": "8080"},
        {"name": "API_PORT", "value": "3000"}
      ],
      "logConfiguration": {
        "logDriver": "awslogs",
        "options": {
          "awslogs-group": "/ecs/aviation-missions",
          "awslogs-region": "us-east-1",
          "awslogs-stream-prefix": "ecs"
        }
      },
      "healthCheck": {
        "command": ["CMD-SHELL", "curl -f http://localhost:3000/health || exit 1"],
        "interval": 30,
        "timeout": 5,
        "retries": 3
      }
    }
  ]
}
```

**Deploy with AWS CLI:**
```bash
# Register task definition
aws ecs register-task-definition --cli-input-json file://task-definition.json

# Create or update service
aws ecs create-service \
  --cluster your-cluster \
  --service-name aviation-missions \
  --task-definition aviation-missions:1 \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-12345],securityGroups=[sg-12345],assignPublicIp=ENABLED}"
```

#### Google Cloud Run

```bash
# Build and push to Google Container Registry
docker build -t gcr.io/YOUR-PROJECT-ID/aviation-missions:latest .
docker push gcr.io/YOUR-PROJECT-ID/aviation-missions:latest

# Deploy to Cloud Run
gcloud run deploy aviation-missions \
  --image gcr.io/YOUR-PROJECT-ID/aviation-missions:latest \
  --platform managed \
  --region us-central1 \
  --port 8080 \
  --set-env-vars WEB_PORT=8080,API_PORT=3000 \
  --memory 1Gi \
  --cpu 1 \
  --max-instances 10 \
  --allow-unauthenticated
```

#### Azure Container Instances

```bash
# Create resource group
az group create --name aviation-rg --location eastus

# Deploy container
az container create \
  --resource-group aviation-rg \
  --name aviation-missions \
  --image your-registry/aviation-missions:latest \
  --ports 8080 \
  --environment-variables WEB_PORT=8080 API_PORT=3000 \
  --cpu 1 \
  --memory 1 \
  --restart-policy Always
```

#### Kubernetes Deployment

**deployment.yaml:**
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: aviation-missions
spec:
  replicas: 2
  selector:
    matchLabels:
      app: aviation-missions
  template:
    metadata:
      labels:
        app: aviation-missions
    spec:
      containers:
      - name: aviation-app
        image: your-registry/aviation-missions:latest
        ports:
        - containerPort: 8080
        env:
        - name: WEB_PORT
          value: "8080"
        - name: API_PORT
          value: "3000"
        resources:
          requests:
            memory: "512Mi"
            cpu: "250m"
          limits:
            memory: "1Gi"
            cpu: "500m"
        livenessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /health
            port: 3000
          initialDelaySeconds: 5
          periodSeconds: 5
---
apiVersion: v1
kind: Service
metadata:
  name: aviation-missions-service
spec:
  selector:
    app: aviation-missions
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer
```

```bash
kubectl apply -f deployment.yaml
```

#### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and initialize
railway login
railway init

# Deploy
railway up
```

**railway.json:**
```json
{
  "build": {
    "builder": "DOCKER"
  },
  "deploy": {
    "startCommand": "/start.sh",
    "healthcheckPath": "/health"
  }
}
```

#### Heroku (Container Registry)

```bash
# Login to Heroku Container Registry
heroku container:login

# Create Heroku app
heroku create your-aviation-app

# Build and push
heroku container:push web --app your-aviation-app
heroku container:release web --app your-aviation-app

# Set environment variables
heroku config:set WEB_PORT=8080 --app your-aviation-app
heroku config:set API_PORT=3000 --app your-aviation-app
```

**heroku.yml:**
```yaml
build:
  docker:
    web: Dockerfile
run:
  web: /start.sh
```

### Environment Variables

**Required:**
- `WEB_PORT` - Port for web interface (default: 8080)
- `API_PORT` - Port for API server (default: 3000)

**Optional:**
- `DATABASE_URL` - Database connection string (default: `jdbc:h2:./data/aviation-missions`)

### Data Persistence

**Important:** The application uses an H2 database that stores data in `/app/data/`. For production deployments:

1. **Docker Volumes:** Mount a volume to `/app/data/`
2. **Cloud Storage:** Use persistent volumes or managed databases
3. **Backup Strategy:** Regularly backup the `aviation-missions.mv.db` file

### SSL/TLS and Domain Setup

Most container services provide automatic HTTPS. For custom domains:

1. **Cloud Providers:** Use their load balancer/ingress with SSL certificates
2. **Reverse Proxy:** Place nginx/Traefik in front with Let's Encrypt
3. **CDN:** Use CloudFlare or similar for SSL termination

### Monitoring and Logs

The application provides:
- **Health Check Endpoint:** `GET /health`
- **API Documentation:** `/docs/`
- **Structured Logging:** Container logs via stdout/stderr

### Scaling Considerations

- **Stateless Design:** Application can run multiple instances
- **Database:** Currently uses H2 (single file). For high availability, consider:
  - PostgreSQL with connection pooling
  - MySQL with read replicas
  - Cloud database services (RDS, Cloud SQL, etc.)

### Security Recommendations

1. **Admin Authentication:** Change default admin password
2. **Network Security:** Use private networks where possible
3. **Container Security:** Regularly update base images
4. **Secrets Management:** Use container orchestration secrets for sensitive data

### Cost Optimization

- **Resource Limits:** Set appropriate CPU/memory limits
- **Auto-scaling:** Configure based on traffic patterns
- **Sleep/Wake:** Use services that can scale to zero during low usage

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
