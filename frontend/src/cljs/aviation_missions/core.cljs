(ns aviation-missions.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [aviation-missions.config :as config]
   [aviation-missions.theme :refer [current-colors]]
   [aviation-missions.state :as state]
   [aviation-missions.api :as api]
   [aviation-missions.pages :refer [navigation missions-page]]
   [aviation-missions.dialogs :refer [mission-brief-dialog mission-rate-dialog]]))

(defn app []
  (let [colors (current-colors)]
    [:div.app {:style {:background-color (:bg-primary colors) :min-height "100vh" :color (:text-primary colors)}}
     [navigation]
     [:main.main-content
      [missions-page]]
     [mission-brief-dialog]
     [mission-rate-dialog]]))

(defn ^:dev/after-load mount-root []
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [app] root-el)))

(defn init! []
  (js/console.log "🏠 FRONTEND STARTUP: Aviation Missions UI initializing...")
  (js/console.log "Debug mode:" config/debug?)
  (js/console.log "API base URL:" config/api-base-url)

  (mount-root)
  (api/check-admin-status)
  (api/fetch-missions))