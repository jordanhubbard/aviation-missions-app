(ns aviation-missions.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [cljs.core.async :refer [go <!]]
   [cljs-http.client :as http]
   [clojure.string :as str]
   [aviation-missions.config :as config]))

;; Global state
(defonce app-state (r/atom {:current-page :missions
                           :missions []
                           :loading false}))

;; API functions
(defn fetch-missions []
  (js/console.log "Fetching missions from API...")
  (swap! app-state assoc :loading true)
  (go
    (let [url (str config/api-base-url "/missions")
          response (<! (http/get url))]
      (if (= 200 (:status response))
        (do
          (js/console.log "Missions loaded successfully")
          (swap! app-state assoc :missions (:missions (:body response)) :loading false))
        (do
          (js/console.error "Failed to fetch missions")
          (swap! app-state assoc :loading false))))))

;; Components
(defn mission-card [mission]
  [:div.mission-card
   [:h3 (:title mission)]
   [:p (:category mission)]
   [:p (str "Difficulty: " (:difficulty mission))]
   [:p (:objective mission)]])

(defn missions-page []
  [:div.missions-page
   [:h1 "✈️ Aviation Training Missions"]
   
   (if (:loading @app-state)
     [:div.loading "Loading missions..."]
     [:div.missions-grid
      (for [mission (:missions @app-state)]
        ^{:key (:id mission)}
        [mission-card mission])])])

(defn app []
  [:div.app
   [:header.app-header
    [:h1 "Aviation Mission Management"]]
   [:main.main-content
    [missions-page]]])

;; Initialization
(defn ^:dev/after-load mount-root []
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [app] root-el)))

(defn init! []
  (js/console.log "Aviation Missions app initializing...")
  (mount-root)
  (fetch-missions))
