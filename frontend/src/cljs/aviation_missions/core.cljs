(ns aviation-missions.core
  "Main application entry point and initialization."
  (:require [reagent.dom :as rdom]
            [aviation-missions.ui.pages.dashboard :as dashboard]
            [aviation-missions.utils.logging :as log]
            [aviation-missions.config.settings :as settings]
            [aviation-missions.test]
            [aviation-missions.simple-test]
            [aviation-missions.minimal-test]))

(enable-console-print!)

;; Immediate execution when namespace loads
(.log js/console "📦 CORE NAMESPACE LOADING")
(println "📦 CORE NAMESPACE LOADING")

;; Create immediate visual indicator that core namespace loaded
(when (.-body js/document)
  (let [ns-div (.createElement js/document "div")]
    (set! (.-innerHTML ns-div) "📦 CORE NS LOADED!")
    (set! (.-id ns-div) "core-namespace-loaded")
    (set! (.-style ns-div) "position:fixed;top:10px;left:10px;background:blue;color:white;padding:10px;z-index:99999;")
    (.appendChild (.-body js/document) ns-div)))

(defn app
  "Root application component"
  []
  [:div {:style {:min-height "100vh"
                 :background-color "#f8fafc"
                 :font-family "system-ui, -apple-system, sans-serif"}}
   [dashboard/dashboard]])

(defn mount-app
  "Mount the application to the DOM"
  []
  (log/log "Mounting Aviation Missions application...")
  (let [root-element (.getElementById js/document "app")]
    (if root-element
      (do
        (rdom/render [app] root-element)
        (log/log-success "Application mounted successfully"))
      (log/log-error "Could not find #app element to mount application"))))

(defn init
  "Initialize the application"
  []
  (try
    (.log js/console "🚀 INIT FUNCTION CALLED - Starting initialization")
    (println "🚀 INIT FUNCTION CALLED - Starting initialization")

    ;; Create immediate visual indicator
    (let [init-div (.createElement js/document "div")]
      (set! (.-innerHTML init-div) "🚀 INIT FUNCTION CALLED!")
      (set! (.-id init-div) "init-function-called")
      (set! (.-style init-div) "position:fixed;top:10px;right:10px;background:orange;color:black;padding:10px;z-index:99999;")
      (.appendChild (.-body js/document) init-div))

    (log/log "Initializing Aviation Missions application")
    (log/log "Debug mode:" settings/debug?)
    (log/log "API base URL:" settings/api-base-url)

    ;; Mount the application
    (.log js/console "🚀 INIT: About to mount app")
    (mount-app)
    (.log js/console "🚀 INIT: App mounted")

    ;; Initialize the dashboard
    (.log js/console "🚀 INIT: About to initialize dashboard")
    (dashboard/init-dashboard!)
    (.log js/console "🚀 INIT: Dashboard initialized")

    (log/log-success "Application initialization complete")
    (.log js/console "🚀 INIT FUNCTION COMPLETED SUCCESSFULLY")

  (catch js/Error e
    (.error js/console "🚨 ERROR IN INIT FUNCTION:" e)
    (println "🚨 ERROR IN INIT FUNCTION:" e)

    ;; Create error indicator
    (let [error-div (.createElement js/document "div")]
      (set! (.-innerHTML error-div) (str "🚨 INIT ERROR: " (.-message e)))
      (set! (.-id error-div) "init-error")
      (set! (.-style error-div) "position:fixed;top:50px;right:10px;background:red;color:white;padding:10px;z-index:99999;")
      (.appendChild (.-body js/document) error-div)))))

;; Remove the duplicate init call - let Shadow-CLJS handle it
;; (init)