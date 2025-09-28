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
  (let [colors (current-colors)
        missions (state/get-missions)
        loading? (:loading @state/app-state)]
    [:div.app {:style {:background-color (:bg-primary colors) :min-height "100vh" :color (:text-primary colors)}}
     [navigation]
     [:main.main-content
      [missions-page]]
     [mission-brief-dialog]
     [mission-rate-dialog]
     ;; Sentinel element - only shows when app is fully loaded and not in loading state
     (when (and (not loading?) (seq missions))
       [:div#app-loaded-sentinel {:style {:position "absolute" :bottom "10px" :right "10px" :font-size "10px" :opacity "0.5" :color (:text-secondary colors)}}
        "<!-- AVIATION_MISSIONS_APP_FULLY_LOADED -->"])]))

(defn ^:dev/after-load mount-root []
  (js/console.log "🔧 MOUNT-ROOT: Starting mount process...")
  (let [root-el (.getElementById js/document "app")]
    (js/console.log "🔧 MOUNT-ROOT: Found app element:" root-el)
    (js/console.log "🔧 MOUNT-ROOT: App element innerHTML before render:" (.-innerHTML root-el))

    (js/console.log "🔧 MOUNT-ROOT: Rendering new component...")
    (rdom/render [app] root-el)
    (js/console.log "🔧 MOUNT-ROOT: App element innerHTML after render:" (.-innerHTML root-el))
    (js/console.log "🔧 MOUNT-ROOT: Mount process complete!")))

(defn init! []
  (js/console.log "🏠 FRONTEND STARTUP: Aviation Missions UI initializing...")
  (js/console.log "Debug mode:" config/debug?)
  (js/console.log "API base URL:" config/api-base-url)
  (js/console.log "Initial app state:" (pr-str @state/app-state))

  (mount-root)
  (js/console.log "Root mounted successfully")

  ;; Set a test mission to see if sentinel works
  (js/console.log "Setting test mission to check sentinel...")
  (let [test-missions [{:id 1
                        :title "Test Mission"
                        :category "General Training"
                        :difficulty 5
                        :pilot_experience "Intermediate (100-500 hours)"
                        :objective "Test the application loading"
                        :mission_description "This is a test mission to verify the app loads correctly"
                        :why_description "We need to ensure all components render properly"}]]
    (swap! state/app-state assoc
           :missions test-missions
           :filtered-missions test-missions
           :loading false))
  (js/console.log "Test mission set, app state:" (pr-str @state/app-state))

  (api/check-admin-status)
  (api/fetch-missions))