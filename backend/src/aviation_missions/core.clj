(ns aviation-missions.core
  (:require [ring.adapter.jetty :as jetty]
            [compojure.core :refer [defroutes GET POST PUT DELETE]]
            [compojure.route :as route]
            [ring.middleware.json :refer [wrap-json-body wrap-json-response]]
            [ring.middleware.cors :refer [wrap-cors]]
            [ring.middleware.defaults :refer [wrap-defaults api-defaults]]
            [ring.util.response :refer [response status]]
            [aviation-missions.db :as db]
            [aviation-missions.handlers :as handlers]
            [aviation-missions.swagger :as swagger])
  (:gen-class))

(defroutes app-routes
  ;; API Documentation
  (GET "/swagger.json" [] swagger/swagger-spec)
  
  ;; Mission endpoints
  (GET "/missions" [] handlers/get-missions)
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
  
  ;; Mission submission endpoints
  (POST "/submissions" request (handlers/create-submission request))
  (GET "/submissions" [] ((handlers/admin-required handlers/get-submissions) []))
  (PUT "/submissions/:id/approve" [id] ((handlers/admin-required handlers/approve-submission) id))
  (PUT "/submissions/:id/reject" [id] ((handlers/admin-required handlers/reject-submission) id))
  
  ;; Mission update endpoints
  (GET "/updates" [] ((handlers/admin-required handlers/get-mission-updates) []))
  (PUT "/updates/:id/approve" [id] ((handlers/admin-required handlers/approve-mission-update) id))
  (PUT "/updates/:id/reject" [id] ((handlers/admin-required handlers/reject-mission-update) id))
  
  ;; Admin endpoints
  (POST "/admin/login" request (handlers/admin-login request))
  
  ;; Health check
  (GET "/health" [] (response {:status "healthy"}))
  
  (route/not-found {:status 404 :body {:error "Not found"}}))

(def app
  (-> app-routes
      (wrap-cors :access-control-allow-origin [#".*"]
                 :access-control-allow-methods [:get :post :put :delete :options]
                 :access-control-allow-headers ["Content-Type" "Authorization"])
      (wrap-json-body {:keywords? true})
      wrap-json-response
      (wrap-defaults api-defaults)))

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
  
  (let [port (Integer/parseInt (or (System/getenv "API_PORT") "3000"))]
    (println (str "Starting server on port " port))
    (jetty/run-jetty app {:port port :join? true})))
