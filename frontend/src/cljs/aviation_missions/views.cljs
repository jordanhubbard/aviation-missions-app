(ns aviation-missions.views
  (:require
   [re-frame.core :as rf]
   [aviation-missions.components.navigation :as nav]
   [aviation-missions.components.mission-card :as mission-card]
   [aviation-missions.components.modals :as modals]))

;; Utility functions
(defn get-difficulty-color [difficulty]
  (cond
    (<= difficulty 3) "#28a745"  ; green
    (<= difficulty 6) "#ffc107"  ; yellow
    (<= difficulty 8) "#fd7e14"  ; orange
    :else "#dc3545"))            ; red

(defn get-pilot-experience-color [experience]
  (case experience
    "Beginner (< 100 hours)" "#28a745"
    "Intermediate (500 - 1000 hours)" "#ffc107"
    "Advanced (1000+ hours)" "#dc3545"
    "#6c757d"))

;; Filter components
(defn category-filter []
  (let [categories ["All" "Airspace Operations" "Terrain & Environment" 
                    "Weather & Atmospheric" "Navigation & Diversions"
                    "Airport Operations" "Endurance & Planning" 
                    "Advanced Adventures" "General Training"]
        current-filter @(rf/subscribe [:filter :category])]
    [:div.filter-group
     [:label "Category:"]
     [:select
      {:value (or current-filter "All")
       :on-change (fn [e]
                    (let [value (.. e -target -value)]
                      (rf/dispatch [:set-filter :category (when (not= value "All") value)])
                      (rf/dispatch [:apply-filters])))}
      (for [category categories]
        [:option {:key category :value category} category])]]))

(defn difficulty-filter []
  (let [current-filter @(rf/subscribe [:filter :difficulty])]
    [:div.filter-group
     [:label "Difficulty:"]
     [:select
      {:value (or current-filter "All")
       :on-change (fn [e]
                    (let [value (.. e -target -value)]
                      (rf/dispatch [:set-filter :difficulty (when (not= value "All") (js/parseInt value))])
                      (rf/dispatch [:apply-filters])))}
      [:option {:value "All"} "All"]
      (for [i (range 1 11)]
        [:option {:key i :value i} (str i)])]]))

(defn pilot-experience-filter []
  (let [experiences ["All" "Beginner (< 100 hours)" 
                     "Intermediate (500 - 1000 hours)" 
                     "Advanced (1000+ hours)"]
        current-filter @(rf/subscribe [:filter :pilot-experience])]
    [:div.filter-group
     [:label "Pilot Experience:"]
     [:select
      {:value (or current-filter "All")
       :on-change (fn [e]
                    (let [value (.. e -target -value)]
                      (rf/dispatch [:set-filter :pilot-experience (when (not= value "All") value)])
                      (rf/dispatch [:apply-filters])))}
      (for [experience experiences]
        [:option {:key experience :value experience} experience])]]))

;; Missions page
(defn missions-page []
  (let [missions @(rf/subscribe [:missions])
        loading @(rf/subscribe [:loading])
        error @(rf/subscribe [:error])]
    
    ;; Load missions on mount
    (when (empty? missions)
      (rf/dispatch [:fetch-missions {}]))
    
    [:div.missions-page
     [:div.page-header
      [:h1 "Aviation Training Missions"]
      [:button.btn.btn-primary
       {:on-click #(rf/dispatch [:show-modal :show-submit-modal])}
       "Submit New Mission"]]
     
     [:div.filters
      [category-filter]
      [difficulty-filter]
      [pilot-experience-filter]]
     
     (cond
       loading [:div.loading "Loading missions..."]
       error [:div.error error]
       :else
       [:div.missions-grid
        (for [mission missions]
          ^{:key (:id mission)}
          [mission-card/mission-card mission])])
     
     [modals/submit-mission-modal]]))

;; Mission detail page
(defn mission-detail-page []
  (let [mission @(rf/subscribe [:selected-mission])
        loading @(rf/subscribe [:loading])
        error @(rf/subscribe [:error])
        route-params @(rf/subscribe [:route-params])
        mission-id (:id route-params)]
    
    ;; Load mission on mount
    (when (and mission-id (not mission))
      (rf/dispatch [:fetch-mission mission-id]))
    
    [:div.mission-detail-page
     (cond
       loading [:div.loading "Loading mission..."]
       error [:div.error error]
       mission
       [:div
        [:div.page-header
         [:button.btn.btn-secondary
          {:on-click #(rf/dispatch [:set-active-page :missions {}])}
          "← Back to Missions"]
         [:h1 (:title mission)]]
        
        [:div.mission-content
         [:div.mission-meta
          [:span.category-badge (:category mission)]
          [:span.difficulty-badge
           {:style {:background-color (get-difficulty-color (:difficulty mission))}}
           (str "Difficulty: " (:difficulty mission))]
          [:span.experience-badge
           {:style {:background-color (get-pilot-experience-color (:pilot_experience mission))}}
           (:pilot_experience mission)]]
         
         [:div.mission-sections
          [:div.mission-section
           [:h3 "Objective"]
           [:p (:objective mission)]]
          
          [:div.mission-section
           [:h3 "Description"]
           [:p (:mission_description mission)]]
          
          (when (:why_description mission)
            [:div.mission-section
             [:h3 "Why This Mission"]
             [:p (:why_description mission)]])
          
          (when (:notes mission)
            [:div.mission-section
             [:h3 "Notes"]
             [:p (:notes mission)]])
          
          (when (:route mission)
            [:div.mission-section
             [:h3 "Route"]
             [:p (:route mission)]])]
         
         [:div.mission-actions
          [:button.btn.btn-primary
           {:on-click #(rf/dispatch [:show-modal :show-comment-modal])}
           "Comment"]
          [:button.btn.btn-success
           {:on-click #(rf/dispatch [:show-modal :show-completion-modal])}
           "I did this"]
          [:button.btn.btn-info
           {:on-click #(rf/dispatch [:show-modal :show-review-modal])}
           "Review"]]]
       
       :else [:div.loading "Mission not found"])
     
     [modals/comment-modal]
     [modals/completion-modal]
     [modals/review-modal]]))

;; Admin page
(defn admin-page []
  (let [is-admin @(rf/subscribe [:is-admin])
        admin-name @(rf/subscribe [:admin-name])
        loading @(rf/subscribe [:loading])
        error @(rf/subscribe [:error])]
    
    [:div.admin-page
     [:div.page-header
      [:h1 "Admin Panel"]
      (if is-admin
        [:div
         [:span (str "Welcome, " admin-name)]
         [:button.btn.btn-secondary
          {:on-click #(rf/dispatch [:admin-logout])}
          "Logout"]]
        [:div "Not logged in as admin"])]
     
     (if is-admin
       [:div.admin-content
        [:h2 "Admin Functions"]
        [:p "Admin functionality will be implemented here."]]
       
       [:div.login-form
        [:h2 "Admin Login"]
        [:form
         {:on-submit (fn [e]
                       (.preventDefault e)
                       (let [form-data (js/FormData. (.-target e))
                             admin-name (.get form-data "admin_name")
                             password (.get form-data "password")]
                         (rf/dispatch [:admin-login {:admin_name admin-name :password password}])))}
         [:div.form-group
          [:label "Admin Name:"]
          [:input {:type "text" :name "admin_name" :required true}]]
         [:div.form-group
          [:label "Password:"]
          [:input {:type "password" :name "password" :required true}]]
         [:button.btn.btn-primary {:type "submit"} "Login"]]
        
        (when error
          [:div.error error])])]))

;; Challenges page
(defn challenges-page []
  (let [challenges [{:id 1
                     :title "Crosswind Landing Mastery"
                     :description "Master the art of landing in challenging crosswind conditions"
                     :difficulty 7
                     :category "Airport Operations"}
                    {:id 2
                     :title "Mountain Flying Operations"
                     :description "Navigate the unique challenges of high-altitude mountain flying"
                     :difficulty 9
                     :category "Terrain & Environment"}
                    {:id 3
                     :title "Complex Airspace Navigation"
                     :description "Successfully navigate through complex controlled airspace"
                     :difficulty 6
                     :category "Airspace Operations"}
                    {:id 4
                     :title "Weather Decision Making"
                     :description "Make critical go/no-go decisions based on weather conditions"
                     :difficulty 8
                     :category "Weather & Atmospheric"}
                    {:id 5
                     :title "Night Flight Operations"
                     :description "Safely conduct night flying operations"
                     :difficulty 7
                     :category "Advanced Adventures"}
                    {:id 6
                     :title "Emergency Procedures"
                     :description "Handle various emergency scenarios with confidence"
                     :difficulty 9
                     :category "General Training"}]]
    
    [:div.challenges-page
     [:div.page-header
      [:h1 "Flight Training Challenges"]]
     
     [:div.challenges-grid
      (for [challenge challenges]
        ^{:key (:id challenge)}
        [:div.challenge-card
         [:div.challenge-header
          [:h3 (:title challenge)]
          [:span.difficulty-badge
           {:style {:background-color (get-difficulty-color (:difficulty challenge))}}
           (str "Difficulty: " (:difficulty challenge))]]
         [:div.challenge-content
          [:p (:description challenge)]
          [:span.category-badge (:category challenge)]]])]]))

;; Main panel
(defn main-panel []
  (let [current-page @(rf/subscribe [:current-page])]
    [:div.app
     [:header.app-header
      [:div.container
       [:h1.app-title "✈️ Aviation Mission Management v2.1"]]]
     
     [nav/navigation]
     
     [:main.main-content
      [:div.container
       (case current-page
         :missions [missions-page]
         :mission-detail [mission-detail-page]
         :admin [admin-page]
         :challenges [challenges-page]
         [missions-page])]]]))  ; default to missions page
