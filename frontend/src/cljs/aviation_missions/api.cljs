(ns aviation-missions.api
  (:require [cljs-http.client :as http]
            [cljs.core.async :refer [go <!]]
            [aviation-missions.config :as config]
            [aviation-missions.state :as state]))

(defn fetch-missions []
  (js/console.log "Fetching missions from API...")
  (js/console.log "API base URL:" config/api-base-url)
  (swap! state/app-state assoc :loading true)

  ;; Use JavaScript fetch directly to test
  (let [url (str config/api-base-url "/api/missions")]
    (js/console.log "Requesting URL:" url)
    (-> (js/fetch url)
        (.then (fn [response]
                 (js/console.log "Fetch response received, status:" (.-status response))
                 (if (= 200 (.-status response))
                   (-> response
                       (.json)
                       (.then (fn [data]
                                (js/console.log "JSON data received:" data)
                                (let [missions (.-missions data)]
                                  (js/console.log "Missions array:" missions)
                                  (js/console.log "Mission count:" (.-length missions))
                                  (swap! state/app-state assoc :missions (js->clj missions :keywordize-keys true) :loading false)))))
                   (do
                     (js/console.error "HTTP error, status:" (.-status response))
                     (swap! state/app-state assoc :loading false)))))
        (.catch (fn [error]
                  (js/console.error "Fetch error:" error)
                  (js/console.error "Error message:" (.-message error))
                  (swap! state/app-state assoc :loading false))))))

(defn check-admin-status []
  (js/console.log "Checking admin status...")
  (go
    (let [url (str config/api-base-url "/api/admin/status")
          _ (js/console.log "Admin status URL:" url)
          response (<! (http/get url))]
      (js/console.log "Admin status response:" (pr-str response))
      (if (= 200 (:status response))
        (do
          (js/console.log "Admin status loaded successfully")
          (swap! state/app-state assoc :admin? (:is_admin (:body response))))
        (do
          (js/console.error "Failed to check admin status. Status:" (:status response))
          (js/console.error "Admin status error:" (pr-str response)))))))

(defn admin-login [credentials]
  (go
    (let [response (<! (http/post (str config/api-base-url "/api/admin/login")
                                  {:json-params credentials}))]
      (if (= 200 (:status response))
        (do
          (swap! state/app-state assoc :admin? true :login-dialog-open false)
          (js/alert "Admin login successful!"))
        (js/alert "Invalid credentials")))))

(defn complete-mission [mission-id]
  (go
    (let [response (<! (http/post (str config/api-base-url "/api/missions/" mission-id "/complete")))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission completed successfully!")
          (fetch-missions))
        (js/alert "Failed to complete mission")))))

(defn rate-mission [mission-id rating]
  (go
    (let [response (<! (http/post (str config/api-base-url "/api/missions/" mission-id "/rate")
                                  {:json-params {:rating rating}}))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission rated successfully!")
          (swap! state/app-state assoc :mission-rate-open false :user-rating 0)
          (fetch-missions))
        (js/alert "Failed to rate mission")))))

(defn submit-mission [mission-data]
  (go
    (let [response (<! (http/post (str config/api-base-url "/api/missions/submit")
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
    (let [response (<! (http/get (str config/api-base-url "/api/missions/export/yaml")))]
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
          response (<! (http/post (str config/api-base-url "/api/missions/import/yaml")
                                  {:body form-data
                                   :headers {"Authorization" (str "Bearer " (.getItem js/localStorage "admin-token"))}}))]
      (if (= 200 (:status response))
        (do
          (js/alert (str "Successfully imported " (:imported_count (:body response)) " missions!"))
          (fetch-missions))
        (js/alert (str "Failed to upload missions: " (get-in response [:body :error])))))))