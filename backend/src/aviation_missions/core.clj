(ns aviation-missions.core
  (:require [ring.adapter.jetty :as jetty]
            [compojure.core :refer [defroutes GET POST PUT DELETE]]
            [compojure.route :as route]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.not-modified :refer [wrap-not-modified]]
            [ring.util.response :refer [response status resource-response content-type]]
            [aviation-missions.db :as db]
            [aviation-missions.handlers :as handlers]
            [aviation-missions.swagger :as swagger]
            [clojure.tools.logging :as log])
  (:gen-class))

(defroutes app-routes
  ;; API Documentation
  (GET "/swagger.json" [] swagger/swagger-spec)
  (GET "/api" []
    (log/info "📚 Serving API documentation interface at /api")
    (-> (response
    (str "<!DOCTYPE html>
<html>
<head>
  <title>Aviation Mission Management API Documentation</title>
  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css\" />
  <style>
    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }
    *, *:before, *:after { box-sizing: inherit; }
    body { margin:0; background: #fafafa; }
  </style>
</head>
<body>
  <div id=\"swagger-ui\"></div>
  <script src=\"https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js\"></script>
  <script src=\"https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-standalone-preset.js\"></script>
  <script>
    window.onload = function() {
      const ui = SwaggerUIBundle({
        url: '/swagger.json',
        dom_id: '#swagger-ui',
        deepLinking: true,
        presets: [
          SwaggerUIBundle.presets.apis,
          SwaggerUIStandalonePreset
        ],
        plugins: [
          SwaggerUIBundle.plugins.DownloadUrl
        ],
        layout: \"StandaloneLayout\"
      });
    };
  </script>
</body>
</html>"))
                     (content-type "text/html")))
  
  ;; Mission endpoints
  (GET "/missions" [] handlers/get-missions)
  
  ;; JSON Import/Export endpoints (admin only) - must come before /missions/:id
  (GET "/missions/export" request ((handlers/admin-required handlers/export-missions) request))
  (POST "/missions/import" request ((handlers/admin-required handlers/import-missions) request))
  
  (GET "/missions/:id" [id] (handlers/get-mission id))
  (POST "/missions" request (handlers/create-mission request))
  (PUT "/missions/:id" [id :as request] (handlers/update-mission id request))
  (DELETE "/missions/:id" [id] ((handlers/admin-required handlers/delete-mission) id))
  
  ;; Mission interaction endpoints
  (POST "/missions/:id/comments" [id :as request] (handlers/add-comment id request))
  (GET "/missions/:id/comments" [id] (handlers/get-comments id))
  (POST "/missions/:id/reviews" [id :as request] (handlers/add-review id request))
  (GET "/missions/:id/reviews" [id] (handlers/get-reviews id))
  (POST "/missions/:id/rating" [id :as request] (handlers/add-rating id request))
  (GET "/missions/:id/rating/:pilot_name" [id pilot_name] (handlers/get-user-rating id pilot_name))
  (POST "/missions/:id/completed" [id :as request] (handlers/mark-completed id request))
  (GET "/missions/:id/completed" [id] (handlers/get-completions id))
  
  ;; Mission submission endpoints
  (POST "/submissions" request (handlers/create-submission request))
  (GET "/submissions" request ((handlers/admin-required handlers/get-submissions) request))
  (PUT "/submissions/:id/approve" [id] ((handlers/admin-required handlers/approve-submission) id))
  (PUT "/submissions/:id/reject" [id] ((handlers/admin-required handlers/reject-submission) id))
  
  ;; Mission update endpoints
  (GET "/updates" request ((handlers/admin-required handlers/get-mission-updates) request))
  (PUT "/updates/:id/approve" [id] ((handlers/admin-required handlers/approve-mission-update) id))
  (PUT "/updates/:id/reject" [id] ((handlers/admin-required handlers/reject-mission-update) id))
  
  ;; Admin endpoints
  (POST "/admin/login" request (handlers/admin-login request))
  (GET "/admin/status" request (handlers/check-admin-status request))
  
  ;; Health check
  (GET "/health" []
    (let [mission-count (count (db/get-all-missions))]
      (log/debug (format "Health check: API responding, %d missions available" mission-count))
      (response {:status "healthy" :missions_loaded mission-count})))
  
  ;; Serve frontend static files
  (GET "/" [] (-> (resource-response "public/index.html")
                  (assoc-in [:headers "Content-Type"] "text/html; charset=utf-8")))
  (GET "/*" [] (-> (resource-response "public/index.html")
                   (assoc-in [:headers "Content-Type"] "text/html; charset=utf-8")))
  
  (route/not-found {:status 404 :body {:error "Not found"}}))

(def app
  (-> app-routes
      wrap-keyword-params
      wrap-params
      (wrap-cors :access-control-allow-origin [#".*"]
                 :access-control-allow-methods [:get :post :put :delete :options]
                 :access-control-allow-headers ["Content-Type" "Authorization"])
      (wrap-json-body {:keywords? true})
      wrap-json-response
      (wrap-resource "public")
      wrap-content-type
      wrap-not-modified
      (wrap-defaults (assoc-in site-defaults [:security :anti-forgery] false))))

(defn -main
  "Start the server"
  [& args]
  (log/info "🚀 Aviation Mission Management System starting up...")

  ;; Phase 1: Database initialization
  (db/init-db!)

  ;; Phase 2: Mission data loading
  (log/info "📊 STARTUP PHASE 2: Loading mission data...")
  (let [existing-missions (db/get-all-missions)]
    (if (empty? existing-missions)
      (do
        (log/info "Database is empty, seeding with initial missions...")
        (try
          (require 'aviation-missions.mission-parser)
          (let [seed-fn (resolve 'aviation-missions.mission-parser/seed-database-with-missions!)]
            (seed-fn "/app/missions.txt")
            (let [loaded-count (count (db/get-all-missions))]
              (log/info (format "✅ STARTUP PHASE 2 COMPLETE: Loaded %d missions from seed file" loaded-count))))
          (catch Exception e
            (log/warn (format "⚠️  Could not seed database with missions: %s" (.getMessage e))))))
      (log/info (format "✅ STARTUP PHASE 2 COMPLETE: Found %d existing missions in database" (count existing-missions)))))

  ;; Phase 3: API server startup
  (log/info "🌐 STARTUP PHASE 3: Starting API server...")
  (let [port (Integer/parseInt (or (System/getenv "PORT") (System/getenv "API_PORT") "3000"))]
    (log/info (format "Starting server on port %d" port))
    (log/info "✅ STARTUP PHASE 3 COMPLETE: API server ready and listening")
    (log/info "🎯 Aviation Mission Management System fully operational!")
    (jetty/run-jetty app {:port port :join? true})))
