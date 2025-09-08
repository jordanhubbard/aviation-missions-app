#!/bin/bash

# Aviation Mission Management System Deployment Script

set -e

echo "🛩️  Aviation Mission Management System Deployment"
echo "=================================================="

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Create .env file if it doesn't exist
if [ ! -f .env ]; then
    echo "📝 Creating .env file..."
    cp env.example .env
    echo "✅ Created .env file. You can modify it to change ports if needed."
fi

# Create data directory
echo "📁 Creating data directory..."
mkdir -p data

# Build the application
echo "🏗️  Building application..."
docker-compose build

# Start the application
echo "🚀 Starting application..."
docker-compose up -d

# Wait for application to be ready
echo "⏳ Waiting for application to start..."
sleep 10

# Check if services are running
if docker-compose ps | grep -q "Up"; then
    echo "✅ Application started successfully!"
    echo ""
    echo "🌐 Access your application:"
    echo "   Web Interface: http://localhost:8080"
    echo "   API Documentation: http://localhost:8080/docs/"
    echo ""
    echo "📊 To view logs: make logs"
    echo "🛑 To stop: make stop"
    echo "🧹 To clean up: make clean"
else
    echo "❌ Failed to start application. Check logs with 'make logs'"
    exit 1
fi
