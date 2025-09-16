#!/bin/bash

# Aviation Missions - Cloud Deployment Script
# This script helps deploy the application to various cloud providers

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Default values
IMAGE_NAME="aviation-missions"
IMAGE_TAG="latest"
PORT="3000"

print_usage() {
    echo "Usage: $0 [PROVIDER] [OPTIONS]"
    echo ""
    echo "Providers:"
    echo "  docker-hub     Deploy to Docker Hub"
    echo "  aws-ecs        Deploy to AWS ECS"
    echo "  google-run     Deploy to Google Cloud Run"
    echo "  azure-aci      Deploy to Azure Container Instances"
    echo "  kubernetes     Deploy to Kubernetes cluster"
    echo "  railway        Deploy to Railway"
    echo "  heroku         Deploy to Heroku"
    echo ""
    echo "Options:"
    echo "  --image-name NAME    Docker image name (default: aviation-missions)"
    echo "  --image-tag TAG      Docker image tag (default: latest)"
    echo "  --port PORT          Application port (default: 3000)"
    echo "  --help               Show this help message"
}

log() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

warn() {
    echo -e "${YELLOW}[WARN]${NC} $1"
}

error() {
    echo -e "${RED}[ERROR]${NC} $1"
    exit 1
}

check_command() {
    if ! command -v $1 &> /dev/null; then
        error "$1 is required but not installed. Please install $1 and try again."
    fi
}

build_and_push() {
    local registry=$1
    local full_image_name="${registry}/${IMAGE_NAME}:${IMAGE_TAG}"
    
    log "Building Docker image: $full_image_name"
    docker build -t $full_image_name .
    
    log "Pushing to registry: $registry"
    docker push $full_image_name
    
    echo $full_image_name
}

deploy_docker_hub() {
    check_command docker
    
    read -p "Enter your Docker Hub username: " DOCKER_USERNAME
    
    log "Logging into Docker Hub"
    docker login
    
    IMAGE_FULL=$(build_and_push $DOCKER_USERNAME)
    
    log "✅ Image pushed to Docker Hub: $IMAGE_FULL"
    log "You can now deploy using: docker run -p $PORT:3000 $IMAGE_FULL"
}

deploy_aws_ecs() {
    check_command aws
    check_command docker
    
    read -p "Enter your AWS account ID: " AWS_ACCOUNT_ID
    read -p "Enter your AWS region (e.g., us-east-1): " AWS_REGION
    read -p "Enter your ECS cluster name: " CLUSTER_NAME
    
    ECR_REGISTRY="${AWS_ACCOUNT_ID}.dkr.ecr.${AWS_REGION}.amazonaws.com"
    
    log "Creating ECR repository if it doesn't exist"
    aws ecr describe-repositories --repository-names $IMAGE_NAME --region $AWS_REGION 2>/dev/null || \
    aws ecr create-repository --repository-name $IMAGE_NAME --region $AWS_REGION
    
    log "Logging into ECR"
    aws ecr get-login-password --region $AWS_REGION | docker login --username AWS --password-stdin $ECR_REGISTRY
    
    IMAGE_FULL=$(build_and_push $ECR_REGISTRY)
    
    # Update task definition with actual image
    sed "s|your-registry/aviation-missions:latest|$IMAGE_FULL|g" ecs-task-definition.json > ecs-task-definition-updated.json
    sed -i "s|YOUR-ACCOUNT-ID|$AWS_ACCOUNT_ID|g" ecs-task-definition-updated.json
    sed -i "s|us-east-1|$AWS_REGION|g" ecs-task-definition-updated.json
    
    log "Registering task definition"
    aws ecs register-task-definition --cli-input-json file://ecs-task-definition-updated.json --region $AWS_REGION
    
    log "✅ Task definition registered. Create your ECS service using the AWS console or CLI."
    log "Image: $IMAGE_FULL"
    
    rm ecs-task-definition-updated.json
}

deploy_google_run() {
    check_command gcloud
    check_command docker
    
    read -p "Enter your Google Cloud Project ID: " PROJECT_ID
    read -p "Enter your preferred region (e.g., us-central1): " REGION
    
    log "Setting up Google Cloud project"
    gcloud config set project $PROJECT_ID
    gcloud auth configure-docker
    
    GCR_REGISTRY="gcr.io/${PROJECT_ID}"
    IMAGE_FULL=$(build_and_push $GCR_REGISTRY)
    
    log "Deploying to Cloud Run"
    gcloud run deploy aviation-missions \
        --image $IMAGE_FULL \
        --platform managed \
        --region $REGION \
        --port $WEB_PORT \
        --set-env-vars WEB_PORT=$WEB_PORT,API_PORT=$API_PORT \
        --memory 1Gi \
        --cpu 1 \
        --max-instances 10 \
        --allow-unauthenticated
    
    log "✅ Deployed to Google Cloud Run!"
}

deploy_azure_aci() {
    check_command az
    
    read -p "Enter your resource group name: " RESOURCE_GROUP
    read -p "Enter your preferred location (e.g., eastus): " LOCATION
    read -p "Enter your container registry (or press enter to use Docker Hub): " REGISTRY
    
    if [ -z "$REGISTRY" ]; then
        REGISTRY="docker.io"
        read -p "Enter your Docker Hub username: " DOCKER_USERNAME
        IMAGE_FULL="${DOCKER_USERNAME}/${IMAGE_NAME}:${IMAGE_TAG}"
    else
        IMAGE_FULL="${REGISTRY}/${IMAGE_NAME}:${IMAGE_TAG}"
    fi
    
    log "Creating resource group if it doesn't exist"
    az group create --name $RESOURCE_GROUP --location $LOCATION
    
    log "Deploying to Azure Container Instances"
    az container create \
        --resource-group $RESOURCE_GROUP \
        --name aviation-missions \
        --image $IMAGE_FULL \
        --ports $WEB_PORT \
        --environment-variables WEB_PORT=$WEB_PORT API_PORT=$API_PORT \
        --cpu 1 \
        --memory 1 \
        --restart-policy Always
    
    log "✅ Deployed to Azure Container Instances!"
}

deploy_kubernetes() {
    check_command kubectl
    
    read -p "Enter your container registry and image (e.g., your-registry/aviation-missions:latest): " IMAGE_FULL
    
    # Update the Kubernetes deployment file
    sed "s|your-registry/aviation-missions:latest|$IMAGE_FULL|g" k8s-deployment.yaml > k8s-deployment-updated.yaml
    
    log "Applying Kubernetes deployment"
    kubectl apply -f k8s-deployment-updated.yaml
    
    log "✅ Deployed to Kubernetes!"
    log "Check status with: kubectl get pods,services,ingress"
    
    rm k8s-deployment-updated.yaml
}

deploy_railway() {
    check_command railway
    
    log "Initializing Railway project"
    railway login
    railway init
    
    log "Setting environment variables"
    railway variables set WEB_PORT=$WEB_PORT
    railway variables set API_PORT=$API_PORT
    
    log "Deploying to Railway"
    railway up
    
    log "✅ Deployed to Railway!"
}

deploy_heroku() {
    check_command heroku
    
    read -p "Enter your Heroku app name: " APP_NAME
    
    log "Creating Heroku app"
    heroku create $APP_NAME || true
    
    log "Setting environment variables"
    heroku config:set WEB_PORT=$WEB_PORT --app $APP_NAME
    heroku config:set API_PORT=$API_PORT --app $APP_NAME
    
    log "Deploying to Heroku Container Registry"
    heroku container:login
    heroku container:push web --app $APP_NAME
    heroku container:release web --app $APP_NAME
    
    log "✅ Deployed to Heroku!"
    log "Your app is available at: https://$APP_NAME.herokuapp.com"
}

# Parse command line arguments
while [[ $# -gt 0 ]]; do
    case $1 in
        --image-name)
            IMAGE_NAME="$2"
            shift 2
            ;;
        --image-tag)
            IMAGE_TAG="$2"
            shift 2
            ;;
        --web-port)
            WEB_PORT="$2"
            shift 2
            ;;
        --api-port)
            API_PORT="$2"
            shift 2
            ;;
        --help)
            print_usage
            exit 0
            ;;
        docker-hub|aws-ecs|google-run|azure-aci|kubernetes|railway|heroku)
            PROVIDER="$1"
            shift
            ;;
        *)
            error "Unknown option: $1"
            ;;
    esac
done

if [ -z "$PROVIDER" ]; then
    error "Please specify a cloud provider. Use --help for usage information."
fi

log "🚀 Starting deployment to $PROVIDER"
log "Image: $IMAGE_NAME:$IMAGE_TAG"
log "Ports: Web=$WEB_PORT, API=$API_PORT"

case $PROVIDER in
    docker-hub)
        deploy_docker_hub
        ;;
    aws-ecs)
        deploy_aws_ecs
        ;;
    google-run)
        deploy_google_run
        ;;
    azure-aci)
        deploy_azure_aci
        ;;
    kubernetes)
        deploy_kubernetes
        ;;
    railway)
        deploy_railway
        ;;
    heroku)
        deploy_heroku
        ;;
    *)
        error "Unknown provider: $PROVIDER"
        ;;
esac

log "🎉 Deployment completed successfully!"
