#!/bin/sh

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
java -jar /app/aviation-missions.jar &

# Start nginx in the foreground
nginx -g "daemon off;"
