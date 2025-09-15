(ns aviation-missions.core
  (:require
   [reagent.core :as r]
   [reagent.dom :as rdom]
   [cljs.core.async :refer [go <!]]
   [cljs-http.client :as http]
   [aviation-missions.config :as config]))

;; Global state
(defonce app-state (r/atom {:current-page :missions
                           :missions []
                           :selected-mission-id nil
                           :mission-details nil
                           :loading false
                           :mission-details-loading false
                           :create-dialog-open false
                           :new-mission {:title ""
                                        :category "Training"
                                        :difficulty 1
                                        :objective ""
                                        :mission_description ""
                                        :why_description ""}}))

;; API functions
(defn fetch-missions []
  (swap! app-state assoc :loading true)
  (go
    (let [response (<! (http/get "/missions"))]
      (if (= 200 (:status response))
        (swap! app-state assoc :missions (:missions (:body response)) :loading false)
        (do
          (js/console.error "Failed to fetch missions:" (:body response))
          (swap! app-state assoc :loading false))))))

(defn create-mission [mission]
  (go
    (let [response (<! (http/post "/missions" {:json-params mission}))]
      (if (or (= 200 (:status response)) (= 201 (:status response)))
        (do
          (js/console.log "Mission created successfully!")
          (swap! app-state assoc :create-dialog-open false)
          (swap! app-state assoc :new-mission {:title ""
                                              :category "Training"
                                              :difficulty 1
                                              :objective ""
                                              :mission_description ""
                                              :why_description ""})
          (fetch-missions))
        (js/console.error "Failed to create mission:" (:body response))))))

(defn fetch-mission-details [mission-id]
  (swap! app-state assoc :mission-details-loading true)
  (go
    (let [response (<! (http/get (str "/missions/" mission-id)))]
      (if (= 200 (:status response))
        (swap! app-state assoc 
               :mission-details (:mission (:body response))
               :mission-details-loading false
               :selected-mission-id mission-id
               :current-page :mission-details)
        (do
          (js/console.error "Failed to fetch mission details:" (:body response))
          (swap! app-state assoc :mission-details-loading false))))))

;; Components
(defn mission-card [mission]
  [:div.mission-card
   [:div.card-header
    [:h3.mission-title (:title mission)]
    [:div.mission-badges
     [:span.badge {:class (str "badge-difficulty-" (:difficulty mission))}
      (case (:difficulty mission)
        1 "Beginner"
        2 "Intermediate" 
        3 "Advanced"
        "Unknown")]
     [:span.badge.badge-outline (:category mission)]]]
   
   [:div.card-body
    [:p.mission-description (:mission_description mission)]
    [:div.mission-details
     [:div.detail-item
      [:strong "Objective: "] (:objective mission)]
     [:div.detail-item
      [:strong "Pilot Experience: "] (:pilot_experience mission)]
     [:div.detail-item
      [:strong "Comments: "] (:comment_count mission) " | Completions: " (:completion_count mission)]]]
   
   [:div.card-actions
    [:button.btn.btn-secondary {:on-click #(fetch-mission-details (:id mission))}
     "View Details"]]])

(defn create-mission-dialog []
  (let [new-mission (:new-mission @app-state)]
    [:div.modal {:class (when (:create-dialog-open @app-state) "modal-open")}
     [:div.modal-backdrop {:on-click #(swap! app-state assoc :create-dialog-open false)}]
     [:div.modal-content
      [:div.modal-header
       [:h2 "Create New Mission"]
       [:button.modal-close {:on-click #(swap! app-state assoc :create-dialog-open false)} "×"]]
      
      [:div.modal-body
       [:div.form-group
        [:label "Mission Title *"]
        [:input.form-input {:type "text"
                           :value (:title new-mission)
                           :on-change #(swap! app-state assoc-in [:new-mission :title] (.. % -target -value))}]]
       
       [:div.form-group
        [:label "Mission Description *"]
        [:textarea.form-textarea {:value (:mission_description new-mission)
                                 :rows 3
                                 :placeholder "Describe what the pilot will do in this mission"
                                 :on-change #(swap! app-state assoc-in [:new-mission :mission_description] (.. % -target -value))}]]
       
       [:div.form-group
        [:label "Why This Mission? *"]
        [:textarea.form-textarea {:value (:why_description new-mission)
                                 :rows 2
                                 :placeholder "Explain the educational value and purpose"
                                 :on-change #(swap! app-state assoc-in [:new-mission :why_description] (.. % -target -value))}]]
       
       [:div.form-row
        [:div.form-group
         [:label "Category"]
         [:select.form-select {:value (:category new-mission)
                              :on-change #(swap! app-state assoc-in [:new-mission :category] (.. % -target -value))}
          [:option {:value "Training"} "Training"]
          [:option {:value "Proficiency"} "Proficiency"]
          [:option {:value "Cross-Country"} "Cross-Country"]
          [:option {:value "Emergency"} "Emergency Procedures"]]]
        
        [:div.form-group
         [:label "Difficulty"]
         [:select.form-select {:value (:difficulty new-mission)
                              :on-change #(swap! app-state assoc-in [:new-mission :difficulty] (js/parseInt (.. % -target -value)))}
          [:option {:value "1"} "1 - Beginner"]
          [:option {:value "2"} "2 - Intermediate"]
          [:option {:value "3"} "3 - Advanced"]]]]
       
       [:div.form-group
        [:label "Primary Objective *"]
        [:input.form-input {:type "text"
                           :placeholder "e.g., Practice standard rate turns"
                           :value (:objective new-mission)
                           :on-change #(swap! app-state assoc-in [:new-mission :objective] (.. % -target -value))}]]]
      
      [:div.modal-footer
       [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :create-dialog-open false)}
        "Cancel"]
       [:button.btn.btn-primary {:on-click (fn []
                                                      (when (and (not-empty (:title new-mission))
                                                                (not-empty (:mission_description new-mission))
                                                                (not-empty (:why_description new-mission))
                                                                (not-empty (:objective new-mission)))
                                                        (create-mission new-mission)))}
        "Create Mission"]]]]))

(defn missions-page []
  [:div.missions-page
   [:div.page-header
    [:h1 "✈️ Aviation Training Missions"]
    [:button.btn.btn-primary {:on-click #(swap! app-state assoc :create-dialog-open true)}
     "Create Mission"]]
   
   (if (:loading @app-state)
     [:div.loading "Loading missions..."]
     
     [:div.missions-grid
      (if (empty? (:missions @app-state))
        [:div.empty-state
         [:p "No missions found. Create your first mission to get started!"]]
        
        (for [mission (:missions @app-state)]
          ^{:key (:id mission)}
          [mission-card mission]))])
   
   [create-mission-dialog]])

(defn mission-details-page []
  [:div.mission-details-page
   [:div.page-header
    [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :current-page :missions)}
     "← Back to Missions"]
    [:h1 "Mission Details"]
    [:p "Mission details functionality coming soon..."]]
   [:div.placeholder-content
    [:p "This page will show detailed information about the selected mission."]]])

(defn admin-panel []
  [:div.admin-panel
   [:div.page-header
    [:h1 "Admin Panel"]
    [:p "Administrative functionality coming soon..."]]
   [:div.placeholder-content
    [:p "This page will allow admins to manage missions, review submissions, and configure the system."]]])

(defn navigation []
  [:nav.navigation
   [:div.nav-container
    [:div.nav-tabs
     [:a.nav-tab {:class (when (= (:current-page @app-state) :missions) "active")
                  :on-click #(swap! app-state assoc :current-page :missions)}
      [:span.nav-icon "✈️"]
      [:span.nav-label "Missions"]]
     [:a.nav-tab {:class (when (= (:current-page @app-state) :admin) "active")
                  :on-click #(swap! app-state assoc :current-page :admin)}
      [:span.nav-icon "⚙️"]
      [:span.nav-label "Admin"]]
     [:a.nav-tab {:class (when (= (:current-page @app-state) :challenges) "active")
                  :on-click #(swap! app-state assoc :current-page :challenges)}
      [:span.nav-icon "🎯"]
      [:span.nav-label "Challenges"]]]]])

(defn app []
  [:div.app
   [:header.app-header
    [:div.container
     [:h1.app-title "✈️ Aviation Mission Management v2.1"]]]
   
   [navigation]
   
   [:main.main-content
    [:div.container
     (case (:current-page @app-state)
       :missions [missions-page]
       :mission-details [mission-details-page]
       :admin [admin-panel]
       :challenges [:div "Challenges page coming soon..."]
       [missions-page])]]])

(defn dev-setup []
  (when config/debug?
    (println "dev mode")))

(defn ^:dev/after-load mount-root []
  (let [root-el (.getElementById js/document "app")]
    (rdom/unmount-component-at-node root-el)
    (rdom/render [app] root-el)))

(defn init! []
  (dev-setup)
  (mount-root)
  (fetch-missions))
