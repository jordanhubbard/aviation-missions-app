#!/bin/sh

# Get the API port from environment variable, default to 3000
API_PORT=${API_PORT:-3000}

# Generate nginx configuration with the correct API port
cat > /etc/nginx/nginx.conf << EOF
events {
    worker_connections 1024;
}

http {
    include       /etc/nginx/mime.types;
    default_type  application/octet-stream;

    upstream backend {
        server localhost:${API_PORT};
    }

    server {
        listen 8080;
        server_name localhost;

        # Serve frontend static files
        location / {
            root /usr/share/nginx/html;
            index index.html;
            try_files \$uri \$uri/ /index.html;
        }

        # Swagger UI for API documentation
        location /docs/ {
            alias /usr/share/nginx/html/swagger-ui/;
            try_files \$uri \$uri/ /docs/index.html;
        }

        # Proxy API requests to backend
        location /api/ {
            proxy_pass http://backend/;
            proxy_set_header Host \$host;
            proxy_set_header X-Real-IP \$remote_addr;
            proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto \$scheme;
        }

        # Health check endpoint
        location /health {
            access_log off;
            return 200 "healthy\n";
            add_header Content-Type text/plain;
        }
    }
}
EOF

# Configure Swagger UI to point to our API spec
cat > /usr/share/nginx/html/swagger-ui/swagger-initializer.js << 'EOF'
window.onload = function() {
  window.ui = SwaggerUIBundle({
    url: '/api/swagger.json',
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset.presets.standalone
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  });
};
EOF

# Start the Clojure backend in the background
echo "Starting Clojure backend..."
java -jar /app/aviation-missions.jar &

# Wait for backend to be ready
echo "Waiting for backend to be ready..."
sleep 5

# Test backend connectivity
echo "Testing backend connectivity..."
until curl -f http://localhost:${API_PORT}/health > /dev/null 2>&1; do
    echo "Waiting for backend to respond..."
    sleep 2
done
echo "Backend is ready!"

# Start nginx in the foreground
echo "Starting nginx..."
nginx -g "daemon off;"
