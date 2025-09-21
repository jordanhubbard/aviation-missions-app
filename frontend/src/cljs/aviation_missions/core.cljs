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

;; Mission field configuration - schema-driven UI with dark theme colors
(def mission-field-config
  "Configuration for mission fields with display properties - dark theme"
  [{:key :objective :label "OBJECTIVE" :color "#81c784" :required true}      ; Light green
   {:key :route :label "ROUTE" :color "#64b5f6" :required false}             ; Light blue  
   {:key :suggested_route :label "SUGGESTED ROUTE" :color "#ba68c8" :required false} ; Light purple
   {:key :notes :label "NOTES" :color "#ffb74d" :required false}             ; Light orange
   {:key :special_challenges :label "SPECIAL CHALLENGES" :color "#e57373" :required false}]) ; Light red

(defn render-mission-field [mission field-config]
  "Render a mission field only if it has content as a table row"
  (let [{:keys [key label color required]} field-config
        value (get mission key)]
    (when (and value (not (str/blank? (str value))))
      [:tr.mission-field {:key (name key)}
       [:td.mission-data-label {:style {:color color :font-weight "bold" :padding "6px 8px 6px 8px" :vertical-align "top" :white-space "nowrap"}} (str label ":")]
       [:td.mission-data-value {:style {:color "#e0e0e0" :padding "6px 8px" :word-wrap "break-word"}} value]])))

;; UI Components
(defn mission-card [mission]
  (let [challenges (analyze-mission-challenges mission)
        difficulty (:difficulty mission)]
    [:div.mission-card {:style {:background-color "#2d2d2d" :border "1px solid #555" :border-radius "8px" :color "#e0e0e0"}}
     [:div.mission-header {:style {:background-color "#3d3d3d" :padding "12px" :border-radius "8px 8px 0 0" :border-bottom "1px solid #555"}}
      [:div.mission-title {:style {:color "#ffffff" :font-size "1.1rem" :font-weight "bold" :margin-bottom "8px"}} (:title mission)]
      [:div.mission-meta {:style {:display "flex" :gap "8px" :flex-wrap "wrap"}}
       [:span.category-badge {:style {:background-color "#424242" :color "#81c784" :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold"}} (:category mission)]
       [:span.difficulty-badge {:style {:background-color "#424242" :color "#ffb74d" :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold"}}
        (str "DIFF: " difficulty "/10")]
       [:span.experience-badge {:style {:background-color "#424242" :color "#64b5f6" :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold"}} (str "EXP: " (:pilot_experience mission))]]]
     
     [:div.mission-content {:style {:padding "12px"}}
      ;; Schema-driven field rendering - only shows fields that exist
      [:table.mission-data-table {:style {:width "100%" :border-collapse "collapse" :margin "8px 0" :background-color "#333" :border-radius "4px"}}
       [:tbody
        (for [field-config mission-field-config]
          ^{:key (:key field-config)}
          [render-mission-field mission field-config])]]
      
      ;; Mission description section
      [:div.mission-section
       [:h4 {:style {:color "#64b5f6" :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "DESCRIPTION"]
       [:p {:style {:color "#e0e0e0" :line-height "1.4" :margin "0" :border-left "3px solid #64b5f6" :padding "8px" :border-radius "4px" :background-color "#333"}} 
        (:mission_description mission)]]
      
      ;; Why section
      (when (:why_description mission)
        [:div.mission-section
         [:h4 {:style {:color "#81c784" :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "WHY THIS MISSION"]
         [:p {:style {:color "#e0e0e0" :line-height "1.4" :margin "0" :border-left "3px solid #81c784" :padding "8px" :border-radius "4px" :background-color "#333"}} 
          (:why_description mission)]])
      
      ;; Flight challenges
      (when (seq challenges)
        [:div.challenges-section
         [:h4 {:style {:color "#ffb74d" :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "FLIGHT CHALLENGES"]
         [:div.challenges-grid {:style {:display "flex" :flex-wrap "wrap" :gap "8px" :margin-top "8px"}}
          (for [challenge challenges]
            ^{:key (:label challenge)}
            [:div.challenge-item {:style {:background-color "#424242" :border "1px solid #666" :color "#ffb74d" :padding "6px 10px" :border-radius "4px" :display "flex" :align-items "center" :gap "6px"}}
             [:span.challenge-icon (:icon challenge)]
             [:span.challenge-label (:label challenge)]])]])]
     
     [:div.mission-footer {:style {:background-color "#3d3d3d" :padding "12px" :border-radius "0 0 8px 8px" :border-top "1px solid #555" :display "flex" :justify-content "space-between" :align-items "center"}}
      [:div.pilot-experience {:style {:color "#ba68c8" :font-weight "bold" :font-size "0.85rem"}} 
       (str "PILOT LEVEL: " (:pilot_experience mission))]
      [:div.mission-actions {:style {:display "flex" :gap "8px"}}
       [:button.btn-mission.primary {:style {:background-color "#64b5f6" :color "#000" :border "none" :padding "6px 12px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}} "📋 BRIEF"]
       [:button.btn-mission {:style {:background-color "#424242" :color "#81c784" :border "1px solid #666" :padding "6px 12px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}} "✅ COMPLETE"]
       [:button.btn-mission {:style {:background-color "#424242" :color "#ffb74d" :border "1px solid #666" :padding "6px 12px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}} "⭐ RATE"]]]]))

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
  [:header.app-header {:style {:background-color "#1e1e1e" :border-bottom "2px solid #333" :padding "16px 0"}}
   [:div.container {:style {:max-width "1200px" :margin "0 auto" :padding "0 20px"}}
    [:div {:style {:display "flex" :justify-content "space-between" :align-items "center"}}
     [:h1.app-title {:style {:color "#ffffff" :margin "0" :font-size "1.5rem"}} "✈️ Aviation Mission Management"]
     [:div {:style {:display "flex" :gap "1rem" :align-items "center"}}
      (if (:admin? @app-state)
        [:span {:style {:color "#81c784" :font-weight "bold" :background-color "#2d2d2d" :padding "8px 12px" :border-radius "4px" :border "1px solid #555"}} "👨‍💼 ADMIN MODE"]
        [:button.btn.btn-secondary {:style {:background-color "#424242" :color "#64b5f6" :border "1px solid #666" :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! app-state assoc :login-dialog-open true)} 
         "🔐 Admin Login"])]]]])

(defn missions-page []
  [:div.missions-page {:style {:background-color "#1a1a1a" :min-height "100vh" :padding "20px 0"}}
   [:div.container {:style {:max-width "1200px" :margin "0 auto" :padding "0 20px"}}
    [:div.page-header {:style {:margin-bottom "24px"}}
     [:h1 {:style {:color "#ffffff" :margin "0 0 16px 0" :font-size "1.8rem"}} "🎯 Aviation Training Missions"]
     (when (:admin? @app-state)
       [:div
        [:button.btn.btn-primary {:style {:background-color "#64b5f6" :color "#000" :border "none" :padding "10px 20px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! app-state assoc :create-dialog-open true)} 
         "➕ Create Mission"]])]

    (if (:loading @app-state)
      [:div.loading {:style {:color "#e0e0e0" :text-align "center" :padding "40px" :font-size "1.2rem"}} "🔄 Loading missions..."]
      [:div.missions-grid {:style {:display "grid" :grid-template-columns "repeat(auto-fit, minmax(400px, 1fr))" :gap "20px"}}
       (for [mission (:missions @app-state)]
         ^{:key (:id mission)}
         [mission-card mission])])]])

(defn floating-action-button []
  (when (:admin? @app-state)
    [:button.fab {:on-click #(swap! app-state assoc :create-dialog-open true)}
     [:div.fab-icon "➕"]
     [:div.fab-label "CREATE MISSION"]]))

(defn app []
  [:div.app {:style {:background-color "#1a1a1a" :min-height "100vh" :color "#e0e0e0"}}
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