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
                           :loading false
                           :admin? false
                           :login-dialog-open false
                           :create-dialog-open false
                           :mission-details nil
                           :login-credentials {:username "" :password ""}}))

;; Utility functions
(defn get-difficulty-class [difficulty]
  (cond
    (<= difficulty 2) "badge-difficulty-1"
    (<= difficulty 3) "badge-difficulty-2"
    (<= difficulty 5) "badge-difficulty-3"
    :else "badge-difficulty-6"))

(defn analyze-mission-challenges [mission]
  "Analyze mission content to identify flight challenges"
  (let [content (str (:objective mission) " " (:description mission) " " (:why_description mission))
        content-lower (str/lower-case content)
        challenges []]
    (cond-> challenges
      (re-find #"weather|wind|turbulence|fog|visibility|cloud" content-lower)
      (conj {:icon "🌤️" :label "Weather"})
      
      (re-find #"navigation|gps|vor|ils|approach|departure" content-lower)
      (conj {:icon "🧭" :label "Navigation"})
      
      (re-find #"radio|communication|atc|tower|ground|clearance" content-lower)
      (conj {:icon "📻" :label "Communications"})
      
      (re-find #"traffic|busy|crowded|multiple|aircraft|sequence" content-lower)
      (conj {:icon "✈️" :label "Traffic"})
      
      (re-find #"emergency|malfunction|failure|problem|issue" content-lower)
      (conj {:icon "🚨" :label "Emergency"})
      
      (re-find #"night|dark|lighting|beacon|strobe" content-lower)
      (conj {:icon "🌙" :label "Night Ops"})
      
      (re-find #"precision|accuracy|exact|careful|tight" content-lower)
      (conj {:icon "🎯" :label "Precision"})
      
      (re-find #"time|pressure|quick|fast|urgent|deadline" content-lower)
      (conj {:icon "⏱️" :label "Time Pressure"}))))

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

(defn check-admin-status []
  (go
    (let [response (<! (http/get (str config/api-base-url "/admin/check")))]
      (when (= 200 (:status response))
        (swap! app-state assoc :admin? (:admin (:body response)))))))

(defn admin-login [credentials]
  (go
    (let [response (<! (http/post (str config/api-base-url "/admin/login") 
                                  {:json-params credentials}))]
      (if (= 200 (:status response))
        (do
          (swap! app-state assoc :admin? true :login-dialog-open false)
          (js/alert "Admin login successful!"))
        (js/alert "Invalid credentials")))))

;; UI Components
(defn mission-card [mission]
  (let [challenges (analyze-mission-challenges mission)
        difficulty (:difficulty mission)]
    [:div.mission-card
     [:div.mission-header
      [:div.mission-title (:title mission)]
      [:div.mission-meta
       [:span.category-badge (:category mission)]
       [:span.difficulty-badge {:class (get-difficulty-class difficulty)}
        (str "DIFF: " difficulty "/10")]
       [:span.experience-badge (str "EXP: " (:pilot_experience mission))]]]
     
     [:div.mission-content
      [:div.mission-data-grid
       [:span.mission-data-label {:style {:background-color "#e8f5e8" :padding "2px 4px" :border-radius "3px"}} "OBJECTIVE:"]
       [:span.mission-data-value {:style {:background-color "#f0f8ff" :padding "2px 4px" :border-radius "3px"}} (:objective mission)]
       
       [:span.mission-data-label {:style {:background-color "#fff3e0" :padding "2px 4px" :border-radius "3px"}} "AIRPORT:"]
       [:span.mission-data-value {:style {:background-color "#f5f5dc" :padding "2px 4px" :border-radius "3px"}} (:airport mission)]
       
       [:span.mission-data-label {:style {:background-color "#fce4ec" :padding "2px 4px" :border-radius "3px"}} "AIRCRAFT:"]
       [:span.mission-data-value {:style {:background-color "#f3e5f5" :padding "2px 4px" :border-radius "3px"}} (:aircraft mission)]
       
       [:span.mission-data-label {:style {:background-color "#e0f2f1" :padding "2px 4px" :border-radius "3px"}} "WEATHER:"]
       [:span.mission-data-value {:style {:background-color "#e8f5e8" :padding "2px 4px" :border-radius "3px"}} (:weather mission)]]
      
      [:div.mission-section
       [:h4 {:style {:background-color "#e3f2fd" :padding "4px 8px" :border-radius "3px" :margin "8px 0 4px 0"}} "DESCRIPTION"]
       [:p {:style {:background-color "#fafafa" :padding "6px" :border-radius "3px" :border-left "3px solid #2196f3"}} (:description mission)]]
      
      (when (seq challenges)
        [:div.challenges-section
         [:h4 {:style {:background-color "#fff8e1" :padding "4px 8px" :border-radius "3px" :margin "8px 0 4px 0"}} "FLIGHT CHALLENGES"]
         [:div.challenges-grid
          (for [challenge challenges]
            ^{:key (:label challenge)}
            [:div.challenge-item {:style {:background-color "#fff3cd" :border "1px solid #ffeaa7"}}
             [:span.challenge-icon (:icon challenge)]
             [:span.challenge-label (:label challenge)]])]])]
     
     [:div.mission-footer
      [:div.pilot-experience (str "PILOT LEVEL: " (:pilot_experience mission))]
      [:div.mission-actions
       [:button.btn-mission.primary "📋 BRIEF"]
       [:button.btn-mission "✅ COMPLETE"]
       [:button.btn-mission "⭐ RATE"]]]]))

(defn admin-login-dialog []
  [:div.modal {:class (when (:login-dialog-open @app-state) "modal-open")}
   [:div.modal-backdrop {:on-click #(swap! app-state assoc :login-dialog-open false)}]
   [:div.modal-content
    [:div.modal-header
     [:h2 "🔐 Admin Login"]
     [:button.modal-close {:on-click #(swap! app-state assoc :login-dialog-open false)} "×"]]
    [:div.modal-body
     [:div.form-group
      [:label "Username:"]
      [:input {:type "text"
               :value (get-in @app-state [:login-credentials :username])
               :on-change #(swap! app-state assoc-in [:login-credentials :username] (.. % -target -value))}]]
     [:div.form-group
      [:label "Password:"]
      [:input {:type "password"
               :value (get-in @app-state [:login-credentials :password])
               :on-change #(swap! app-state assoc-in [:login-credentials :password] (.. % -target -value))}]]]
    [:div.modal-footer
     [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :login-dialog-open false)} "Cancel"]
     [:button.btn.btn-primary {:on-click #(admin-login (:login-credentials @app-state))} "Login"]]]])

(defn create-mission-dialog []
  [:div.modal {:class (when (:create-dialog-open @app-state) "modal-open")}
   [:div.modal-backdrop {:on-click #(swap! app-state assoc :create-dialog-open false)}]
   [:div.modal-content
    [:div.modal-header
     [:h2 "✈️ Create New Mission"]
     [:button.modal-close {:on-click #(swap! app-state assoc :create-dialog-open false)} "×"]]
    [:div.modal-body
     [:p "Mission creation form would go here..."]]
    [:div.modal-footer
     [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :create-dialog-open false)} "Cancel"]
     [:button.btn.btn-primary "Create Mission"]]]])

(defn navigation []
  [:header.app-header
   [:div.container
    [:div {:style {:display "flex" :justify-content "space-between" :align-items "center"}}
     [:h1.app-title "✈️ Aviation Mission Management"]
     [:div {:style {:display "flex" :gap "1rem" :align-items "center"}}
      (if (:admin? @app-state)
        [:span {:style {:color "#4caf50" :font-weight "bold"}} "👨‍💼 ADMIN MODE"]
        [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :login-dialog-open true)} 
         "🔐 Admin Login"])]]]])

(defn missions-page []
  [:div.missions-page
   [:div.container
    [:div.page-header
     [:h1 "🎯 Aviation Training Missions"]
     (when (:admin? @app-state)
       [:div
        [:button.btn.btn-primary {:on-click #(swap! app-state assoc :create-dialog-open true)} 
         "➕ Create Mission"]])]

    (if (:loading @app-state)
      [:div.loading "🔄 Loading missions..."]
      [:div.missions-grid
       (for [mission (:missions @app-state)]
         ^{:key (:id mission)}
         [mission-card mission])])]])

(defn floating-action-button []
  (when (:admin? @app-state)
    [:button.fab {:on-click #(swap! app-state assoc :create-dialog-open true)}
     [:div.fab-icon "➕"]
     [:div.fab-label "CREATE MISSION"]]))

(defn app []
  [:div.app
   [navigation]
   [:main.main-content
    [missions-page]]
   [admin-login-dialog]
   [create-mission-dialog]
   [floating-action-button]])

;; Initialization
(defn ^:dev/after-load mount-root []
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [app] root-el)))

(defn init! []
  (js/console.log "🏠 FRONTEND STARTUP: Aviation Missions UI initializing...")
  (js/console.log "Debug mode:" config/debug?)
  (js/console.log "API base URL:" config/api-base-url)
  
  (mount-root)
  (check-admin-status)
  (fetch-missions))