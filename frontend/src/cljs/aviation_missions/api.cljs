(ns aviation-missions.api
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [go <!]]
            [aviation-missions.config :as config]
            [aviation-missions.state :as state]))

(defn fetch-missions []
  (js/console.log "Fetching missions from API...")
  (swap! state/app-state assoc :loading true)
  (go
    (let [url (str config/api-base-url "/missions")
          response (<! (http/get url))]
      (if (= 200 (:status response))
        (do
          (js/console.log "Missions loaded successfully")
          (swap! state/app-state assoc :missions (:missions (:body response)) :loading false))
        (do
          (js/console.error "Failed to fetch missions")
          (swap! state/app-state assoc :loading false))))))

(defn check-admin-status []
  (go
    (let [response (<! (http/get (str config/api-base-url "/admin/check")))]
      (when (= 200 (:status response))
        (swap! state/app-state assoc :admin? (:admin (:body response)))))))

(defn admin-login [credentials]
  (go
    (let [response (<! (http/post (str config/api-base-url "/admin/login")
                                  {:json-params credentials}))]
      (if (= 200 (:status response))
        (do
          (swap! state/app-state assoc :admin? true :login-dialog-open false)
          (js/alert "Admin login successful!"))
        (js/alert "Invalid credentials")))))

(defn complete-mission [mission-id]
  (go
    (let [response (<! (http/post (str config/api-base-url "/missions/" mission-id "/complete")))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission completed successfully!")
          (fetch-missions))
        (js/alert "Failed to complete mission")))))

(defn rate-mission [mission-id rating]
  (go
    (let [response (<! (http/post (str config/api-base-url "/missions/" mission-id "/rate")
                                  {:json-params {:rating rating}}))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission rated successfully!")
          (swap! state/app-state assoc :mission-rate-open false :user-rating 0)
          (fetch-missions))
        (js/alert "Failed to rate mission")))))

(defn submit-mission [mission-data]
  (go
    (let [response (<! (http/post (str config/api-base-url "/missions/submit")
                                  {:json-params mission-data}))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission submitted successfully! It will be reviewed by administrators.")
          (swap! state/app-state assoc :submit-dialog-open false)
          (swap! state/app-state assoc-in [:submission-form] {:title ""
                                                             :category "General Training"
                                                             :difficulty 5
                                                             :objective ""
                                                             :mission_description ""
                                                             :why_description ""
                                                             :notes ""
                                                             :route ""
                                                             :suggested_route ""
                                                             :pilot_experience "Intermediate (100-500 hours)"
                                                             :special_challenges ""}))
        (js/alert "Failed to submit mission. Please try again.")))))

(defn download-missions-yaml []
  (go
    (let [response (<! (http/get (str config/api-base-url "/missions/export/yaml")))]
      (if (= 200 (:status response))
        (let [yaml-content (:body response)
              blob (js/Blob. #js [yaml-content] #js {:type "application/x-yaml"})
              url (js/URL.createObjectURL blob)
              link (js/document.createElement "a")]
          (set! (.-href link) url)
          (set! (.-download link) "aviation-missions.yaml")
          (js/document.body.appendChild link)
          (.click link)
          (js/document.body.removeChild link)
          (js/URL.revokeObjectURL url))
        (js/alert "Failed to download missions. Please try again.")))))

(defn upload-missions-yaml [file]
  (go
    (let [form-data (js/FormData.)
          _ (.append form-data "file" file)
          response (<! (http/post (str config/api-base-url "/missions/import/yaml")
                                  {:body form-data
                                   :headers {"Authorization" (str "Bearer " (.getItem js/localStorage "admin-token"))}}))]
      (if (= 200 (:status response))
        (do
          (js/alert (str "Successfully imported " (:imported_count (:body response)) " missions!"))
          (fetch-missions))
        (js/alert (str "Failed to upload missions: " (get-in response [:body :error])))))))