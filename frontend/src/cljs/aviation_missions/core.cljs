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

;; Mission field configuration - schema-driven UI
(def mission-field-config
  "Configuration for mission fields with display properties"
  [{:key :objective :label "OBJECTIVE" :color "#2e7d32" :required true}
   {:key :route :label "ROUTE" :color "#1565c0" :required false}
   {:key :suggested_route :label "SUGGESTED ROUTE" :color "#7b1fa2" :required false}
   {:key :notes :label "NOTES" :color "#ef6c00" :required false}
   {:key :special_challenges :label "SPECIAL CHALLENGES" :color "#c62828" :required false}])

(defn render-mission-field [mission field-config]
  "Render a mission field only if it has content"
  (let [{:keys [key label color required]} field-config
        value (get mission key)]
    (when (and value (not (str/blank? (str value))))
      [:div.mission-field {:key (name key)}
       [:span.mission-data-label {:style {:color color :font-weight "bold"}} (str label ":")]
       [:span.mission-data-value {:style {:color "#333" :margin-left "8px"}} value]])))

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
      ;; Schema-driven field rendering - only shows fields that exist
      [:div.mission-data-grid
       (for [field-config mission-field-config]
         ^{:key (:key field-config)}
         [render-mission-field mission field-config])]
      
      ;; Mission description section
      [:div.mission-section
       [:h4 {:style {:color "#1976d2" :margin "12px 0 6px 0" :font-size "0.85rem"}} "DESCRIPTION"]
       [:p {:style {:color "#424242" :line-height "1.4" :margin "0" :border-left "3px solid #1976d2" :padding-left "8px"}} 
        (:mission_description mission)]]
      
      ;; Why section
      (when (:why_description mission)
        [:div.mission-section
         [:h4 {:style {:color "#388e3c" :margin "12px 0 6px 0" :font-size "0.85rem"}} "WHY THIS MISSION"]
         [:p {:style {:color "#424242" :line-height "1.4" :margin "0" :border-left "3px solid #388e3c" :padding-left "8px"}} 
          (:why_description mission)]])
      
      ;; Flight challenges
      (when (seq challenges)
        [:div.challenges-section
         [:h4 {:style {:color "#f57c00" :margin "12px 0 6px 0" :font-size "0.85rem"}} "FLIGHT CHALLENGES"]
         [:div.challenges-grid
          (for [challenge challenges]
            ^{:key (:label challenge)}
            [:div.challenge-item {:style {:background-color "#fff8e1" :border "1px solid #ffcc02" :color "#e65100"}}
             [:span.challenge-icon (:icon challenge)]
             [:span.challenge-label (:label challenge)]])]])]
     
     [:div.mission-footer
      [:div.pilot-experience {:style {:color "#5d4037" :font-weight "bold"}} 
       (str "PILOT LEVEL: " (:pilot_experience mission))]
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