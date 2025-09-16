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
            [ring.util.response :refer [response status resource-response]]
            [aviation-missions.db :as db]
            [aviation-missions.handlers :as handlers]
            [aviation-missions.swagger :as swagger])
  (:gen-class))

(defroutes app-routes
  ;; API Documentation
  (GET "/swagger.json" [] swagger/swagger-spec)
  
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
  (GET "/health" [] (response {:status "healthy"}))
  
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
  (db/init-db!)
  
  ;; Seed database with initial missions if empty
  (when (empty? (db/get-all-missions))
    (try
      (require 'aviation-missions.mission-parser)
      (let [seed-fn (resolve 'aviation-missions.mission-parser/seed-database-with-missions!)]
        (seed-fn "/app/missions.txt"))
      (catch Exception e
        (println "Could not seed database with missions:" (.getMessage e)))))
  
  (let [port (Integer/parseInt (or (System/getenv "PORT") (System/getenv "API_PORT") "3000"))]
    (println (str "Starting server on port " port))
    (jetty/run-jetty app {:port port :join? true})))
