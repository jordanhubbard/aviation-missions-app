(ns aviation-missions.core
  (:require [ring.adapter.jetty :as jetty]
            [compojure.core :refer [defroutes GET POST PUT DELETE OPTIONS]]
            [compojure.route :as route]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer [wrap-defaults site-defaults]]
            [ring.middleware.params :refer [wrap-params]]
            [ring.middleware.keyword-params :refer [wrap-keyword-params]]
            [ring.middleware.resource :refer [wrap-resource]]
            [ring.middleware.content-type :refer [wrap-content-type]]
            [ring.middleware.not-modified :refer [wrap-not-modified]]
            [ring.util.response :refer [response resource-response content-type]]
            [aviation-missions.db :as db]
            [aviation-missions.handlers :as handlers]
            [aviation-missions.swagger :as swagger]
            [clojure.tools.logging :as log])
  (:gen-class))

(def swagger-ui-html
  (str "<!DOCTYPE html>"
       "<html>"
       "<head>"
       "  <title>Aviation Mission Management API Documentation</title>"
       "  <link rel=\"stylesheet\" type=\"text/css\" href=\"https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui.css\" />"
       "  <style>"
       "    html { box-sizing: border-box; overflow: -moz-scrollbars-vertical; overflow-y: scroll; }"
       "    *, *:before, *:after { box-sizing: inherit; }"
       "    body { margin:0; background: #fafafa; }"
       "  </style>"
       "</head>"
       "<body>"
       "  <div id=\"swagger-ui\"></div>"
       "  <script src=\"https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-bundle.js\"></script>"
       "  <script src=\"https://unpkg.com/swagger-ui-dist@4.15.5/swagger-ui-standalone-preset.js\"></script>"
       "  <script>"
       "    window.onload = function() {"
       "      const ui = SwaggerUIBundle({"
       "        url: '/swagger.json',"
       "        dom_id: '#swagger-ui',"
       "        deepLinking: true,"
       "        presets: ["
       "          SwaggerUIBundle.presets.apis,"
       "          SwaggerUIStandalonePreset"
       "        ],"
       "        plugins: ["
       "          SwaggerUIBundle.plugins.DownloadUrl"
       "        ],"
       "        layout: \"StandaloneLayout\""
       "      });"
       "    };"
       "  </script>"
       "</body>"
       "</html>"))

(defroutes app-routes
  ;; API Documentation
  (GET "/swagger.json" [] swagger/swagger-spec)
  (GET "/api" []
    (log/info "📚 Serving API documentation interface at /api")
    (-> (response swagger-ui-html)
        (content-type "text/html")))
  
  ;; Mission endpoints
  (GET "/api/missions" [] handlers/get-missions)

  ;; JSON Import/Export endpoints (admin only) - must come before /missions/:id
  (GET "/api/missions/export" request ((handlers/admin-required handlers/export-missions) request))
  (GET "/api/missions/export/yaml" request (handlers/export-missions-yaml request))
  (POST "/api/missions/import" request ((handlers/admin-required handlers/import-missions) request))
  (POST "/api/missions/import/yaml" request ((handlers/admin-required handlers/import-missions-yaml) request))

  (GET "/api/missions/:id" [id] (handlers/get-mission id))
  (POST "/api/missions" request (handlers/create-mission request))
  (PUT "/api/missions/:id" [id :as request] (handlers/update-mission id request))
  (DELETE "/api/missions/:id" [id] ((handlers/admin-required handlers/delete-mission) id))

  ;; Mission interaction endpoints
  (POST "/api/missions/:id/comments" [id :as request] (handlers/add-comment id request))
  (GET "/api/missions/:id/comments" [id] (handlers/get-comments id))
  (POST "/api/missions/:id/reviews" [id :as request] (handlers/add-review id request))
  (GET "/api/missions/:id/reviews" [id] (handlers/get-reviews id))
  (POST "/api/missions/:id/rating" [id :as request] (handlers/add-rating id request))
  (GET "/api/missions/:id/rating/:pilot_name" [id pilot_name] (handlers/get-user-rating id pilot_name))
  (POST "/api/missions/:id/completed" [id :as request] (handlers/mark-completed id request))
  (GET "/api/missions/:id/completed" [id] (handlers/get-completions id))

  ;; Mission submission endpoints
  (POST "/api/submissions" request (handlers/create-submission request))
  (GET "/api/submissions" request ((handlers/admin-required handlers/get-submissions) request))
  (PUT "/api/submissions/:id/approve" [id] ((handlers/admin-required handlers/approve-submission) id))
  (PUT "/api/submissions/:id/reject" [id] ((handlers/admin-required handlers/reject-submission) id))

  ;; Mission update endpoints
  (GET "/api/updates" request ((handlers/admin-required handlers/get-mission-updates) request))
  (PUT "/api/updates/:id/approve" [id] ((handlers/admin-required handlers/approve-mission-update) id))
  (PUT "/api/updates/:id/reject" [id] ((handlers/admin-required handlers/reject-mission-update) id))

  ;; Admin endpoints
  (POST "/api/admin/login" request (handlers/admin-login request))
  (GET "/api/admin/status" request (handlers/check-admin-status request))
  
  ;; Health check
  (GET "/health" []
    (let [mission-count (count (db/get-all-missions))]
      (log/debug (format "Health check: API responding, %d missions available" mission-count))
      (response {:status "healthy" :missions_loaded mission-count})))
  
  ;; CORS preflight handler - handle OPTIONS requests for all API endpoints
  (OPTIONS "/api/*" []
    (-> (response "")
        (assoc-in [:headers "Access-Control-Allow-Origin"] "*")
        (assoc-in [:headers "Access-Control-Allow-Methods"] "GET, POST, PUT, DELETE, OPTIONS")
        (assoc-in [:headers "Access-Control-Allow-Headers"] "Content-Type, Authorization, Accept")
        (assoc-in [:headers "Access-Control-Max-Age"] "86400")))

  ;; Serve frontend static files - only for non-API routes
  (GET "/" [] (-> (resource-response "public/index.html")
                  (assoc-in [:headers "Content-Type"] "text/html; charset=utf-8")))

  (route/not-found {:status 404 :body {:error "Not found"}}))

(def app
  (-> app-routes
      ;; Apply CORS first to handle preflight OPTIONS requests
      (wrap-cors :access-control-allow-origin [#".*"]
                 :access-control-allow-methods [:get :post :put :delete :options]
                 :access-control-allow-headers ["Content-Type" "Authorization" "Accept"]
                 :access-control-max-age (* 60 60 24)) ; Cache preflight for 24 hours
      wrap-keyword-params
      wrap-params
      (wrap-json-body {:keywords? true})
      wrap-json-response
      (wrap-resource "public")
      wrap-content-type
      wrap-not-modified
      ;; Disable anti-forgery and frame options for API compatibility
      (wrap-defaults (-> site-defaults
                         (assoc-in [:security :anti-forgery] false)
                         (assoc-in [:security :frame-options] false)))))

(defn -main
  "Start the server"
  [& _args]
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
