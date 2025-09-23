(ns aviation-missions.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [cljs.core.async :refer [go <!]]
   [cljs-http.client :as http]
   [clojure.string :as str]
   [aviation-missions.config :as config]))

;; Dark mode color palette - consistent and subtle
(def dark-colors
  {:bg-primary "#1a1a1a"      ; Main background
   :bg-secondary "#222222"    ; Card backgrounds
   :bg-tertiary "#2a2a2a"     ; Headers, footers
   :bg-quaternary "#333333"   ; Elevated elements
   :separator "#000000"       ; All borders and separators
   :text-primary "#ffffff"    ; Main text
   :text-secondary "#e0e0e0"  ; Secondary text
   :text-muted "#b0b0b0"      ; Muted text
   :accent-blue "#4a9eff"     ; Primary actions
   :accent-green "#4caf50"    ; Success/complete
   :accent-orange "#ff9800"   ; Warning/rate
   :accent-red "#f44336"      ; Error/danger
   :accent-purple "#9c27b0"   ; Special
   :accent-cyan "#00bcd4"})   ; Info

;; Light mode color palette - clean and professional
(def light-colors
  {:bg-primary "#ffffff"      ; Main background
   :bg-secondary "#f8f9fa"    ; Card backgrounds
   :bg-tertiary "#e9ecef"     ; Headers, footers
   :bg-quaternary "#dee2e6"   ; Elevated elements
   :separator "#ced4da"       ; All borders and separators
   :text-primary "#212529"    ; Main text
   :text-secondary "#495057"  ; Secondary text
   :text-muted "#6c757d"      ; Muted text
   :accent-blue "#0d6efd"     ; Primary actions
   :accent-green "#198754"    ; Success/complete
   :accent-orange "#fd7e14"   ; Warning/rate
   :accent-red "#dc3545"      ; Error/danger
   :accent-purple "#6f42c1"   ; Special
   :accent-cyan "#0dcaf0"})   ; Info

;; Get current color scheme
(defn current-colors []
  (if (:dark-mode? @app-state) dark-colors light-colors))

;; Toggle dark/light mode
(defn toggle-theme []
  (swap! app-state update :dark-mode? not))

;; Global state
(defonce app-state (r/atom {:current-page :missions
                           :missions []
                           :filtered-missions []
                           :loading false
                           :admin? false
                           :login-dialog-open false
                           :create-dialog-open false
                           :submit-dialog-open false
                           :mission-details nil
                           :mission-brief-open false
                           :mission-rate-open false
                           :selected-mission nil
                           :user-rating 0
                           :dark-mode? true
                           :login-credentials {:username "" :password ""}
                           :submission-form {:title ""
                                           :category "General Training"
                                           :difficulty 5
                                           :objective ""
                                           :mission_description ""
                                           :why_description ""
                                           :notes ""
                                           :route ""
                                           :suggested_route ""
                                           :pilot_experience "Intermediate (100-500 hours)"
                                           :special_challenges ""}
                           :filters {:category "All Categories"
                                    :difficulty "All Difficulties"
                                    :experience "All Experience Levels"
                                    :search-text ""}}))

;; Filter options
(def category-options
  ["All Categories"
   "Airspace Operations"
   "Terrain & Environment"
   "Weather & Atmospheric"
   "Navigation & Diversions"
   "Airport Operations"
   "Endurance & Planning"
   "Advanced Adventures"
   "General Training"])

(def difficulty-options
  ["All Difficulties"
   "1-2 (Beginner)"
   "3-4 (Easy)"
   "5-6 (Moderate)"
   "7-8 (Hard)"
   "9-10 (Expert)"])

(def experience-options
  ["All Experience Levels"
   "Beginner (< 100 hours)"
   "Intermediate (100-500 hours)"
   "Advanced (500+ hours)"
   "Commercial/ATP"])

;; Utility functions
(defn get-difficulty-class [difficulty]
  (cond
    (<= difficulty 2) "badge-difficulty-1"
    (<= difficulty 3) "badge-difficulty-2"
    (<= difficulty 5) "badge-difficulty-3"
    :else "badge-difficulty-6"))

(defn matches-difficulty-filter [mission difficulty-filter]
  (case difficulty-filter
    "All Difficulties" true
    "1-2 (Beginner)" (<= (:difficulty mission) 2)
    "3-4 (Easy)" (<= 3 (:difficulty mission) 4)
    "5-6 (Moderate)" (<= 5 (:difficulty mission) 6)
    "7-8 (Hard)" (<= 7 (:difficulty mission) 8)
    "9-10 (Expert)" (<= 9 (:difficulty mission) 10)
    true))

(defn matches-search-text [mission search-text]
  (if (str/blank? search-text)
    true
    (let [search-lower (str/lower-case search-text)
          searchable-text (str/lower-case 
                          (str (:title mission) " "
                               (:objective mission) " "
                               (:mission_description mission) " "
                               (:notes mission) " "
                               (:route mission) " "
                               (:suggested_route mission)))]
      (str/includes? searchable-text search-lower))))

(defn filter-missions [missions filters]
  (let [{:keys [category difficulty experience search-text]} filters]
    (->> missions
         (filter #(or (= category "All Categories")
                      (= (:category %) category)))
         (filter #(matches-difficulty-filter % difficulty))
         (filter #(or (= experience "All Experience Levels")
                      (= (:pilot_experience %) experience)))
         (filter #(matches-search-text % search-text)))))

(defn update-filtered-missions []
  (let [missions (:missions @app-state)
        filters (:filters @app-state)
        filtered (filter-missions missions filters)]
    (swap! app-state assoc :filtered-missions filtered)))

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
          (swap! app-state assoc :missions (:missions (:body response)) :loading false)
          (update-filtered-missions))
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

(defn complete-mission [mission-id]
  (go
    (let [response (<! (http/post (str config/api-base-url "/missions/" mission-id "/complete")))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission completed successfully!")
          (fetch-missions)) ; Refresh missions list
        (js/alert "Failed to complete mission")))))

(defn rate-mission [mission-id rating]
  (go
    (let [response (<! (http/post (str config/api-base-url "/missions/" mission-id "/rate")
                                  {:json-params {:rating rating}}))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission rated successfully!")
          (swap! app-state assoc :mission-rate-open false :user-rating 0)
          (fetch-missions)) ; Refresh missions list
        (js/alert "Failed to rate mission")))))

(defn submit-mission [mission-data]
  (go
    (let [response (<! (http/post (str config/api-base-url "/missions/submit")
                                  {:json-params mission-data}))]
      (if (= 200 (:status response))
        (do
          (js/alert "Mission submitted successfully! It will be reviewed by administrators.")
          (swap! app-state assoc :submit-dialog-open false)
          (swap! app-state assoc-in [:submission-form] {:title ""
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
          (fetch-missions)) ; Refresh missions list
        (js/alert (str "Failed to upload missions: " (get-in response [:body :error])))))))

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
  (let [colors (current-colors)
        {:keys [key label color required]} field-config
        value (get mission key)]
    (when (and value (not (str/blank? (str value))))
      [:tr.mission-field {:key (name key)}
       [:td.mission-data-label {:style {:color color :font-weight "bold" :padding "6px 8px 6px 8px" :vertical-align "top" :white-space "nowrap"}} (str label ":")]
       [:td.mission-data-value {:style {:color (:text-primary colors) :padding "6px 8px" :word-wrap "break-word"}} value]])))

;; UI Components
(defn mission-card [mission]
  (let [colors (current-colors)
        challenges (analyze-mission-challenges mission)
        difficulty (:difficulty mission)]
    [:div.mission-card {:style {:background-color (:bg-secondary colors) :border (str "1px solid " (:separator colors)) :border-radius "8px" :color (:text-secondary colors)}}
     [:div.mission-header {:style {:background-color (:bg-tertiary colors) :padding "12px" :border-radius "8px 8px 0 0" :border-bottom (str "1px solid " (:separator colors))}}
      [:div.mission-title {:style {:color (:text-primary colors) :font-size "1.1rem" :font-weight "bold" :margin-bottom "8px"}} (:title mission)]
      [:div.mission-meta {:style {:display "flex" :gap "8px" :flex-wrap "wrap"}}
       [:span.category-badge {:style {:background-color (:bg-quaternary colors) :color (:accent-green colors) :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold"}} (:category mission)]
       [:span.difficulty-badge {:style {:background-color (:bg-quaternary colors) :color (:accent-orange colors) :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold"}}
        (str "DIFF: " difficulty "/10")]
       [:span.experience-badge {:style {:background-color (:bg-quaternary colors) :color (:accent-blue colors) :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold"}} (str "EXP: " (:pilot_experience mission))]]]
     
     [:div.mission-content {:style {:padding "12px"}}
      ;; Schema-driven field rendering - only shows fields that exist
      [:table.mission-data-table {:style {:width "100%" :border-collapse "collapse" :margin "8px 0" :background-color (:bg-primary colors) :border (str "1px solid " (:separator colors)) :border-radius "4px"}}
       [:tbody
        (for [field-config mission-field-config]
          ^{:key (:key field-config)}
          [render-mission-field mission field-config])]]
      
      ;; Mission description section
      [:div.mission-section
       [:h4 {:style {:color (:accent-blue colors) :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "DESCRIPTION"]
       [:p {:style {:color (:text-primary colors) :line-height "1.4" :margin "0" :border-left (str "3px solid " (:accent-blue colors)) :padding "8px" :border-radius "4px" :background-color (:bg-primary colors) :border (str "1px solid " (:separator colors))}} 
        (:mission_description mission)]]
      
      ;; Why section
      (when (:why_description mission)
        [:div.mission-section
         [:h4 {:style {:color (:accent-green colors) :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "WHY THIS MISSION"]
         [:p {:style {:color (:text-primary colors) :line-height "1.4" :margin "0" :border-left (str "3px solid " (:accent-green colors)) :padding "8px" :border-radius "4px" :background-color (:bg-primary colors) :border (str "1px solid " (:separator colors))}} 
          (:why_description mission)]])
      
      ;; Flight challenges
      (when (seq challenges)
        [:div.challenges-section
         [:h4 {:style {:color (:accent-orange colors) :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "FLIGHT CHALLENGES"]
         [:div.challenges-grid {:style {:display "flex" :flex-wrap "wrap" :gap "8px" :margin-top "8px"}}
          (for [challenge challenges]
            ^{:key (:label challenge)}
            [:div.challenge-item {:style {:background-color (:bg-quaternary colors) :border (str "1px solid " (:separator colors)) :color (:accent-orange colors) :padding "6px 10px" :border-radius "4px" :display "flex" :align-items "center" :gap "6px"}}
             [:span.challenge-icon (:icon challenge)]
             [:span.challenge-label (:label challenge)]])]])]
     
     [:div.mission-footer {:style {:background-color (:bg-tertiary colors) :padding "12px" :border-radius "0 0 8px 8px" :border-top (str "1px solid " (:separator colors)) :display "flex" :justify-content "space-between" :align-items "center"}}
      [:div.pilot-experience {:style {:color (:accent-purple colors) :font-weight "bold" :font-size "0.85rem"}} 
       (str "PILOT LEVEL: " (:pilot_experience mission))]
      [:div.mission-actions {:style {:display "flex" :gap "8px"}}
       [:button.btn-mission.primary 
        {:style {:background-color (:accent-blue colors) :color (:text-primary colors) :border "none" :padding "6px 12px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}
         :on-click #(do (swap! app-state assoc :selected-mission mission :mission-brief-open true))} 
        "📋 BRIEF"]
       [:button.btn-mission 
        {:style {:background-color (:bg-quaternary colors) :color (:accent-green colors) :border (str "1px solid " (:separator colors)) :padding "6px 12px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}
         :on-click #(complete-mission (:id mission))} 
        "✅ COMPLETE"]
       [:button.btn-mission 
        {:style {:background-color (:bg-quaternary colors) :color (:accent-orange colors) :border (str "1px solid " (:separator colors)) :padding "6px 12px" :border-radius "4px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}
         :on-click #(do (swap! app-state assoc :selected-mission mission :mission-rate-open true :user-rating 0))} 
        "⭐ RATE"]]

(defn admin-login-dialog []
  [:div.modal {:class (when (:login-dialog-open @app-state) "modal-open")}
   [:div.modal-backdrop {:on-click #(swap! app-state assoc :login-dialog-open false)}]
   [:div.modal-content {:style {:background-color "#2d2d2d" :color "#e0e0e0"}}
    [:div.modal-header {:style {:background-color "#3d3d3d" :border-bottom "1px solid #555"}}
     [:h2 {:style {:color "#ffffff"}} "🔐 Admin Login"]
     [:button.modal-close {:style {:color "#ffffff"} :on-click #(swap! app-state assoc :login-dialog-open false)} "×"]]
    [:div.modal-body {:style {:padding "20px"}}
     ;; Admin credentials info
     [:div.admin-info {:style {:background-color "#1e3a5f" :border "1px solid #3d5a80" :border-radius "4px" :padding "15px" :margin-bottom "20px"}}
      [:h3 {:style {:color "#64b5f6" :margin "0 0 10px 0" :font-size "1rem"}} "🔑 Admin Credentials (Open Access)"]
      [:p {:style {:margin "5px 0" :font-size "0.9rem"}} [:strong {:style {:color "#81c784"}} "Username:"] " admin"]
      [:p {:style {:margin "5px 0" :font-size "0.9rem"}} [:strong {:style {:color "#81c784"}} "Password:"] " aviation123"]
      [:p {:style {:margin "10px 0 0 0" :font-size "0.8rem" :color "#b0b0b0"}} "Note: This is a temporary open access system. Proper authentication will be implemented later."]]
     
     [:div.form-group {:style {:margin-bottom "20px"}}
      [:label {:style {:display "block" :color "#81c784" :font-weight "bold" :margin-bottom "5px"}} "Username:"]
      [:input {:type "text"
               :value (get-in @app-state [:login-credentials :username])
               :placeholder "admin"
               :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
               :on-change #(swap! app-state assoc-in [:login-credentials :username] (.. % -target -value))}]]
     [:div.form-group {:style {:margin-bottom "20px"}}
      [:label {:style {:display "block" :color "#81c784" :font-weight "bold" :margin-bottom "5px"}} "Password:"]
      [:input {:type "password"
               :value (get-in @app-state [:login-credentials :password])
               :placeholder "aviation123"
               :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
               :on-change #(swap! app-state assoc-in [:login-credentials :password] (.. % -target -value))}]]]
    [:div.modal-footer {:style {:background-color "#3d3d3d" :border-top "1px solid #555"}}
     [:button.btn.btn-secondary {:style {:background-color "#666" :color "#fff"} :on-click #(swap! app-state assoc :login-dialog-open false)} "Cancel"]
     [:button.btn.btn-primary {:style {:background-color "#4caf50" :color "#000"} :on-click #(admin-login (:login-credentials @app-state))} "Login"]]]

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
     [:button.btn.btn-primary "Create Mission"]]]

(defn mission-brief-dialog []
  (let [mission (:selected-mission @app-state)]
    [:div.modal {:class (when (:mission-brief-open @app-state) "modal-open")}
     [:div.modal-backdrop {:on-click #(swap! app-state assoc :mission-brief-open false)}]
     [:div.modal-content {:style {:max-width "800px" :background-color "#2d2d2d" :color "#e0e0e0"}}
      [:div.modal-header {:style {:background-color "#3d3d3d" :border-bottom "1px solid #555"}}
       [:h2 {:style {:color "#ffffff"}} (str "📋 Mission Brief: " (:title mission))]
       [:button.modal-close {:style {:color "#ffffff"} :on-click #(swap! app-state assoc :mission-brief-open false)} "×"]]
      [:div.modal-body {:style {:padding "20px"}}
       [:div.brief-section
        [:h3 {:style {:color "#64b5f6" :margin-bottom "10px"}} "Mission Overview"]
        [:div {:style {:background-color "#333" :padding "15px" :border-radius "4px" :margin-bottom "15px"}}
         [:p {:style {:margin "0 0 10px 0"}} [:strong {:style {:color "#81c784"}} "Objective: "] (:objective mission)]
         [:p {:style {:margin "0 0 10px 0"}} [:strong {:style {:color "#ffb74d"}} "Difficulty: "] (str (:difficulty mission) "/10")]
         [:p {:style {:margin "0"}} [:strong {:style {:color "#ba68c8"}} "Experience Level: "] (:pilot_experience mission)]]]
       
       [:div.brief-section
        [:h3 {:style {:color "#81c784" :margin-bottom "10px"}} "Mission Description"]
        [:div {:style {:background-color "#333" :padding "15px" :border-radius "4px" :margin-bottom "15px"}}
         [:p {:style {:margin "0" :line-height "1.5"}} (:mission_description mission)]]]
       
       (when (:why_description mission)
         [:div.brief-section
          [:h3 {:style {:color "#ffb74d" :margin-bottom "10px"}} "Why This Mission"]
          [:div {:style {:background-color "#333" :padding "15px" :border-radius "4px" :margin-bottom "15px"}}
           [:p {:style {:margin "0" :line-height "1.5"}} (:why_description mission)]]
       
       (when (:route mission)
         [:div.brief-section
          [:h3 {:style {:color "#e57373" :margin-bottom "10px"}} "Route Information"]
          [:div {:style {:background-color "#333" :padding "15px" :border-radius "4px" :margin-bottom "15px"}}
           [:p {:style {:margin "0 0 10px 0"}} [:strong "Route: "] (:route mission)]
           (when (:suggested_route mission)
             [:p {:style {:margin "0"}} [:strong "Suggested Route: "] (:suggested_route mission)])]])
       
       (when (:notes mission)
         [:div.brief-section
          [:h3 {:style {:color "#ba68c8" :margin-bottom "10px"}} "Additional Notes"]
          [:div {:style {:background-color "#333" :padding "15px" :border-radius "4px"}}
           [:p {:style {:margin "0" :line-height "1.5"}} (:notes mission)]]]
      
      [:div.modal-footer {:style {:background-color "#3d3d3d" :border-top "1px solid #555"}}
       [:button.btn.btn-secondary {:style {:background-color "#424242" :color "#e0e0e0" :border "1px solid #666"} :on-click #(swap! app-state assoc :mission-brief-open false)} "Close Brief"]
       [:button.btn.btn-primary {:style {:background-color "#64b5f6" :color "#000"} :on-click #(do (complete-mission (:id mission)) (swap! app-state assoc :mission-brief-open false))} "Mark Complete"]]

(defn mission-rate-dialog []
  (let [mission (:selected-mission @app-state)
        current-rating (:user-rating @app-state)]
    [:div.modal {:class (when (:mission-rate-open @app-state) "modal-open")}
     [:div.modal-backdrop {:on-click #(swap! app-state assoc :mission-rate-open false)}]
     [:div.modal-content {:style {:background-color "#2d2d2d" :color "#e0e0e0"}}
      [:div.modal-header {:style {:background-color "#3d3d3d" :border-bottom "1px solid #555"}}
       [:h2 {:style {:color "#ffffff"}} (str "⭐ Rate Mission: " (:title mission))]
       [:button.modal-close {:style {:color "#ffffff"} :on-click #(swap! app-state assoc :mission-rate-open false)} "×"]]
      [:div.modal-body {:style {:padding "20px" :text-align "center"}}
       [:p {:style {:margin-bottom "20px"}} "How would you rate this mission?"]
       [:div.rating-stars {:style {:margin "20px 0"}}
        (for [i (range 1 6)]
          ^{:key i}
          [:button.star-button 
           {:style {:background "none" :border "none" :font-size "2rem" :margin "0 5px" :cursor "pointer"
                    :color (if (<= i current-rating) "#ffb74d" "#666")}
            :on-click #(swap! app-state assoc :user-rating i)}
           "⭐"])]
       [:p {:style {:color "#999" :font-size "0.9rem"}} (str "Selected rating: " current-rating "/5")]]
      [:div.modal-footer {:style {:background-color "#3d3d3d" :border-top "1px solid #555"}}
       [:button.btn.btn-secondary {:style {:background-color "#424242" :color "#e0e0e0" :border "1px solid #666"} :on-click #(swap! app-state assoc :mission-rate-open false :user-rating 0)} "Cancel"]
       [:button.btn.btn-primary {:style {:background-color "#ffb74d" :color "#000"} :on-click #(rate-mission (:id mission) current-rating)} "Submit Rating"]]

(defn mission-submit-dialog []
  (let [form (:submission-form @app-state)]
    [:div.modal {:class (when (:submit-dialog-open @app-state) "modal-open")}
     [:div.modal-backdrop {:on-click #(swap! app-state assoc :submit-dialog-open false)}]
     [:div.modal-content {:style {:max-width "800px" :background-color "#2d2d2d" :color "#e0e0e0" :max-height "90vh" :overflow-y "auto"}}
      [:div.modal-header {:style {:background-color "#3d3d3d" :border-bottom "1px solid #555"}}
       [:h2 {:style {:color "#ffffff"}} "📝 Submit New Mission"]
       [:button.modal-close {:style {:color "#ffffff"} :on-click #(swap! app-state assoc :submit-dialog-open false)} "×"]]
      [:div.modal-body {:style {:padding "20px"}}
       [:form {:on-submit (fn [e] 
                           (.preventDefault e)
                           (submit-mission form))}
        
        ;; Title (Required)
        [:div.form-group {:style {:margin-bottom "20px"}}
         [:label {:style {:display "block" :color "#81c784" :font-weight "bold" :margin-bottom "5px"}} "Mission Title *"]
         [:input {:type "text"
                 :value (:title form)
                 :placeholder "e.g., Class B Ops: LAX Bravo Transition"
                 :required true
                 :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
                 :on-change #(swap! app-state assoc-in [:submission-form :title] (-> % .-target .-value))}]]
        
        ;; Category and Difficulty Row
        [:div {:style {:display "flex" :gap "20px" :margin-bottom "20px"}}
         [:div.form-group {:style {:flex "1"}}
          [:label {:style {:display "block" :color "#64b5f6" :font-weight "bold" :margin-bottom "5px"}} "Category *"]
          [:select {:value (:category form)
                   :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
                   :on-change #(swap! app-state assoc-in [:submission-form :category] (-> % .-target .-value))}
           (for [category (rest category-options)]
             [:option {:key category :value category} category])]]
         [:div.form-group {:style {:flex "1"}}
          [:label {:style {:display "block" :color "#ffb74d" :font-weight "bold" :margin-bottom "5px"}} "Difficulty (1-10) *"]
          [:input {:type "number"
                  :min "1" :max "10"
                  :value (:difficulty form)
                  :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
                  :on-change #(swap! app-state assoc-in [:submission-form :difficulty] (js/parseInt (-> % .-target .-value)))}]]]
        
        ;; Objective (Required)
        [:div.form-group {:style {:margin-bottom "20px"}}
         [:label {:style {:display "block" :color "#81c784" :font-weight "bold" :margin-bottom "5px"}} "Learning Objective *"]
         [:textarea {:value (:objective form)
                    :placeholder "What should pilots learn from this mission?"
                    :required true
                    :rows "2"
                    :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px" :resize "vertical"}
                    :on-change #(swap! app-state assoc-in [:submission-form :objective] (-> % .-target .-value))}]]
        
        ;; Mission Description (Required)
        [:div.form-group {:style {:margin-bottom "20px"}}
         [:label {:style {:display "block" :color "#81c784" :font-weight "bold" :margin-bottom "5px"}} "Mission Description *"]
         [:textarea {:value (:mission_description form)
                    :placeholder "Detailed description of the mission, including procedures, airports, and key activities..."
                    :required true
                    :rows "4"
                    :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px" :resize "vertical"}
                    :on-change #(swap! app-state assoc-in [:submission-form :mission_description] (-> % .-target .-value))}]]
        
        ;; Why Description (Required)
        [:div.form-group {:style {:margin-bottom "20px"}}
         [:label {:style {:display "block" :color "#81c784" :font-weight "bold" :margin-bottom "5px"}} "Educational Rationale *"]
         [:textarea {:value (:why_description form)
                    :placeholder "Why is this mission valuable for pilot training?"
                    :required true
                    :rows "2"
                    :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px" :resize "vertical"}
                    :on-change #(swap! app-state assoc-in [:submission-form :why_description] (-> % .-target .-value))}]]
        
        ;; Route and Suggested Route Row
        [:div {:style {:display "flex" :gap "20px" :margin-bottom "20px"}}
         [:div.form-group {:style {:flex "1"}}
          [:label {:style {:display "block" :color "#64b5f6" :font-weight "bold" :margin-bottom "5px"}} "Route Description"]
          [:input {:type "text"
                  :value (:route form)
                  :placeholder "e.g., KPAO → coastal route south → LAX Bravo → KTOA"
                  :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
                  :on-change #(swap! app-state assoc-in [:submission-form :route] (-> % .-target .-value))}]]
         [:div.form-group {:style {:flex "1"}}
          [:label {:style {:display "block" :color "#64b5f6" :font-weight "bold" :margin-bottom "5px"}} "Suggested Waypoints"]
          [:input {:type "text"
                  :value (:suggested_route form)
                  :placeholder "e.g., KPAO KWVI KHHR KTOA"
                  :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
                  :on-change #(swap! app-state assoc-in [:submission-form :suggested_route] (-> % .-target .-value))}]]]
        
        ;; Pilot Experience
        [:div.form-group {:style {:margin-bottom "20px"}}
         [:label {:style {:display "block" :color "#ba68c8" :font-weight "bold" :margin-bottom "5px"}} "Target Pilot Experience"]
         [:select {:value (:pilot_experience form)
                  :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
                  :on-change #(swap! app-state assoc-in [:submission-form :pilot_experience] (-> % .-target .-value))}
          (for [exp (rest experience-options)]
            [:option {:key exp :value exp} exp])]]
        
        ;; Special Challenges
        [:div.form-group {:style {:margin-bottom "20px"}}
         [:label {:style {:display "block" :color "#f48fb1" :font-weight "bold" :margin-bottom "5px"}} "Special Challenges"]
         [:input {:type "text"
                 :value (:special_challenges form)
                 :placeholder "e.g., Mountain Flying, High Altitude, Weather"
                 :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px"}
                 :on-change #(swap! app-state assoc-in [:submission-form :special_challenges] (-> % .-target .-value))}]]
        
        ;; Notes
        [:div.form-group {:style {:margin-bottom "20px"}}
         [:label {:style {:display "block" :color "#90a4ae" :font-weight "bold" :margin-bottom "5px"}} "Additional Notes"]
         [:textarea {:value (:notes form)
                    :placeholder "Tips, considerations, or additional information for pilots..."
                    :rows "3"
                    :style {:width "100%" :padding "10px" :background-color "#333" :color "#fff" :border "1px solid #555" :border-radius "4px" :resize "vertical"}
                    :on-change #(swap! app-state assoc-in [:submission-form :notes] (-> % .-target .-value))}]]]]]
      
      [:div.modal-footer {:style {:background-color "#3d3d3d" :border-top "1px solid #555"}}
       [:button.btn.btn-secondary {:type "button" :style {:background-color "#666" :color "#fff"} :on-click #(swap! app-state assoc :submit-dialog-open false)} "Cancel"]
       [:button.btn.btn-primary {:type "button" 
                                :style {:background-color "#81c784" :color "#000"}
                                :disabled (or (str/blank? (:title form))
                                            (str/blank? (:objective form))
                                            (str/blank? (:mission_description form))
                                            (str/blank? (:why_description form)))
                                :on-click #(submit-mission form)} "Submit Mission"]]

(defn filter-dropdown [label options current-value filter-key]
  (let [colors (current-colors)]
    [:div.filter-dropdown {:style {:display "flex" :flex-direction "column" :gap "4px"}}
     [:label {:style {:color (:text-secondary colors) :font-size "0.8rem" :font-weight "bold"}} label]
     [:select {:style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors)) :padding "6px 8px" :border-radius "4px" :font-size "0.85rem" :cursor "pointer"}
               :value current-value
               :on-change #(do
                            (swap! app-state assoc-in [:filters filter-key] (.. % -target -value))
                            (update-filtered-missions))}
      (for [option options]
        ^{:key option}
        [:option {:value option} option])]]))

(defn search-input []
  (let [colors (current-colors)]
    [:div.search-input {:style {:display "flex" :flex-direction "column" :gap "4px"}}
     [:label {:style {:color (:text-secondary colors) :font-size "0.8rem" :font-weight "bold"}} "Search Missions"]
     [:input {:type "text"
              :placeholder "Search by title, objective, description..."
              :style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors)) :padding "6px 8px" :border-radius "4px" :font-size "0.85rem"}
              :value (get-in @app-state [:filters :search-text])
              :on-change #(do
                           (swap! app-state assoc-in [:filters :search-text] (.. % -target -value))
                           (update-filtered-missions))}]]))

(defn mission-filters []
  (let [colors (current-colors)
        filters (:filters @app-state)]
    [:div.mission-filters {:style {:background-color (:bg-secondary colors) :border (str "1px solid " (:separator colors)) :border-radius "8px" :padding "16px" :margin-bottom "20px"}}
     [:div.filters-header {:style {:margin-bottom "12px"}}
      [:h3 {:style {:color (:text-primary colors) :margin "0" :font-size "1rem" :font-weight "bold"}} "🔍 Filter Missions"]]
     [:div.filters-grid {:style {:display "grid" :grid-template-columns "repeat(auto-fit, minmax(200px, 1fr))" :gap "16px" :align-items "end"}}
      [filter-dropdown "Category" category-options (:category filters) :category]
      [filter-dropdown "Difficulty" difficulty-options (:difficulty filters) :difficulty]
      [filter-dropdown "Experience Level" experience-options (:experience filters) :experience]
      [search-input]]
     [:div.filter-summary {:style {:margin-top "12px" :padding-top "12px" :border-top (str "1px solid " (:separator colors)) :display "flex" :justify-content "space-between" :align-items "center"}}
      [:span {:style {:color (:accent-green colors) :font-size "0.85rem" :font-weight "bold"}}
       (str "Showing " (count (:filtered-missions @app-state)) " of " (count (:missions @app-state)) " missions")]
      [:button {:style {:background-color (:bg-quaternary colors) :color (:accent-orange colors) :border (str "1px solid " (:separator colors)) :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :cursor "pointer"}
                :on-click #(do
                            (swap! app-state assoc :filters {:category "All Categories"
                                                             :difficulty "All Difficulties"
                                                             :experience "All Experience Levels"
                                                             :search-text ""})
                            (update-filtered-missions))}
       "Clear Filters"]]

(defn navigation []
  (let [colors (current-colors)]
    [:header.app-header {:style {:background-color (:bg-tertiary colors) :border-bottom (str "1px solid " (:separator colors)) :padding "16px 0"}}
     [:div.container {:style {:max-width "1200px" :margin "0 auto" :padding "0 20px"}}
      [:div {:style {:display "flex" :justify-content "space-between" :align-items "center"}}
       [:h1.app-title {:style {:color (:text-primary colors) :margin "0" :font-size "1.5rem"}} "✈️ Aviation Mission Management"]
       [:div {:style {:display "flex" :gap "1rem" :align-items "center"}}
        ;; Theme toggle button
        [:button.theme-toggle {:style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors)) :padding "8px 12px" :border-radius "4px" :font-weight "bold" :cursor "pointer" :font-size "1.2rem"}
                               :on-click toggle-theme}
         (if (:dark-mode? @app-state) "☀️" "🌙")]
        
        (if (:admin? @app-state)
          [:span {:style {:color (:accent-green colors) :font-weight "bold" :background-color (:bg-quaternary colors) :padding "8px 12px" :border-radius "4px" :border (str "1px solid " (:separator colors))}} "👨‍💼 ADMIN MODE"]
          [:div {:style {:display "flex" :gap "1rem" :align-items "center"}}
           [:button.btn.btn-primary {:style {:background-color (:accent-green colors) :color (:text-primary colors) :border "none" :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! app-state assoc :submit-dialog-open true)} 
            "📝 Submit Mission"]
           [:button.btn.btn-info {:style {:background-color (:accent-orange colors) :color (:text-primary colors) :border "none" :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(download-missions-yaml)} 
            "📥 Download"]
           [:label {:style {:background-color (:accent-blue colors) :color (:text-primary colors) :border "none" :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer" :display "inline-block"}}
            "📤 Upload YAML"
            [:input {:type "file"
                     :accept ".yaml,.yml"
                     :style {:display "none"}
                     :on-change #(when-let [file (-> % .-target .-files (aget 0))]
                                  (upload-missions-yaml file))}]]
           [:button.btn.btn-secondary {:style {:background-color (:bg-quaternary colors) :color (:accent-blue colors) :border (str "1px solid " (:separator colors)) :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! app-state assoc :login-dialog-open true)} 
            "🔐 Admin Login"]]

(defn missions-page []
  (let [colors (current-colors)]
    [:div.missions-page {:style {:background-color (:bg-primary colors) :min-height "100vh" :padding "20px 0"}}
     [:div.container {:style {:max-width "1200px" :margin "0 auto" :padding "0 20px"}}
      [:div.page-header {:style {:margin-bottom "24px"}}
       [:h1 {:style {:color (:text-primary colors) :margin "0 0 16px 0" :font-size "1.8rem"}} "🎯 Aviation Training Missions"]
       (when (:admin? @app-state)
         [:div
          [:button.btn.btn-primary {:style {:background-color (:accent-blue colors) :color (:text-primary colors) :border "none" :padding "10px 20px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! app-state assoc :create-dialog-open true)} 
           "➕ Create Mission"]])]

      [mission-filters]

      (if (:loading @app-state)
        [:div.loading {:style {:color (:text-secondary colors) :text-align "center" :padding "40px" :font-size "1.2rem"}} "🔄 Loading missions..."]
        (let [missions-to-show (:filtered-missions @app-state)]
          (if (empty? missions-to-show)
            [:div.no-missions {:style {:color (:text-secondary colors) :text-align "center" :padding "40px" :font-size "1.2rem"}}
             [:div {:style {:font-size "3rem" :margin-bottom "16px"}} "🔍"]
             [:div "No missions match your current filters"]
             [:div {:style {:font-size "0.9rem" :color (:text-muted colors) :margin-top "8px"}} "Try adjusting your filter criteria"]]
            [:div.missions-grid {:style {:display "grid" :grid-template-columns "repeat(auto-fit, minmax(400px, 1fr))" :gap "20px"}}
             (for [mission missions-to-show]
               ^{:key (:id mission)}
               [mission-card mission])])))]
     [:div.fab-icon "➕"]
     [:div.fab-label "CREATE MISSION"]]))

(defn app []
  (let [colors (current-colors)]
    [:div.app {:style {:background-color (:bg-primary colors) :min-height "100vh" :color (:text-primary colors)}}
     [navigation]
     [:main.main-content
      [missions-page]]
     [admin-login-dialog]
     [create-mission-dialog]
     [mission-brief-dialog]
     [mission-rate-dialog]
     [mission-submit-dialog]
     [floating-action-button]]))

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
