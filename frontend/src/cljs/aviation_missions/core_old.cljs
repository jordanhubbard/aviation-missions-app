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
                           :selected-mission-id nil
                           :mission-details nil
                           :loading false
                           :mission-details-loading false
                           :page-number 1
                           :missions-per-page 8
                           :create-dialog-open false
                           :login-dialog-open false
                           :admin-authenticated false
                           :admin-token nil
                           :admin-name nil
                           :submissions []
                           :pending-updates []
                           :edit-mission-id nil
                           :edit-dialog-open false
                           :new-mission {:title ""
                                        :category "Training"
                                        :difficulty 1
                                        :objective ""
                                        :mission_description ""
                                        :why_description ""}
                           :login-credentials {:admin_name ""
                                              :password ""}}))

;; Authentication functions
(defn admin-login [credentials]
  (go
    (let [response (<! (http/post (str config/api-base-url "/admin/login") {:json-params credentials}))]
      (if (= 200 (:status response))
        (let [body (:body response)
              token (:token body)
              admin-name (:admin_name body)]
          (js/console.log "Admin login successful")
          (swap! app-state assoc
                 :admin-authenticated true
                 :admin-token token
                 :admin-name admin-name
                 :login-dialog-open false
                 :current-page :admin
                 :login-credentials {:admin_name "" :password ""})
          (.setItem js/localStorage "admin-token" token)
          (.setItem js/localStorage "admin-name" admin-name))
        (do
          (js/console.error "Admin login failed:" (:body response))
          (js/alert "Login failed. Please check your credentials."))))))

(defn admin-logout []
  (swap! app-state assoc
         :admin-authenticated false
         :admin-token nil
         :admin-name nil
         :current-page :missions)
  (.removeItem js/localStorage "admin-token")
  (.removeItem js/localStorage "admin-name")
  (js/console.log "Admin logged out"))

(defn check-admin-status []
  "Check if user is authenticated on app load"
  (let [stored-token (.getItem js/localStorage "admin-token")
        stored-name (.getItem js/localStorage "admin-name")]
    (when (and stored-token stored-name)
      (go
        (let [response (<! (http/get (str config/api-base-url "/admin/status")
                                     {:headers {"Authorization" (str "Bearer " stored-token)}}))]
          (if (and (= 200 (:status response))
                   (:is_admin (:body response)))
            (do
              (js/console.log "Admin session restored")
              (swap! app-state assoc
                     :admin-authenticated true
                     :admin-token stored-token
                     :admin-name stored-name))
            (do
              (js/console.log "Admin session expired")
              (admin-logout))))))))

(defn fetch-submissions []
  "Fetch pending submissions (admin only)"
  (when (:admin-authenticated @app-state)
    (go
      (let [response (<! (http/get (str config/api-base-url "/submissions")
                                   {:headers {"Authorization" (str "Bearer " (:admin-token @app-state))}}))]
        (if (= 200 (:status response))
          (swap! app-state assoc :submissions (:submissions (:body response)))
          (js/console.error "Failed to fetch submissions:" (:body response)))))))

(defn fetch-pending-updates []
  "Fetch pending mission updates (admin only)"
  (when (:admin-authenticated @app-state)
    (go
      (let [response (<! (http/get (str config/api-base-url "/updates")
                                   {:headers {"Authorization" (str "Bearer " (:admin-token @app-state))}}))]
        (if (= 200 (:status response))
          (swap! app-state assoc :pending-updates (:updates (:body response)))
          (js/console.error "Failed to fetch pending updates:" (:body response)))))))

(defn approve-submission [submission-id]
  "Approve a mission submission"
  (when (:admin-authenticated @app-state)
    (go
      (let [response (<! (http/put (str config/api-base-url "/submissions/" submission-id "/approve")
                                   {:headers {"Authorization" (str "Bearer " (:admin-token @app-state))}}))]
        (if (= 200 (:status response))
          (do
            (js/console.log "Submission approved successfully")
            (fetch-submissions)
            (fetch-missions))
          (js/console.error "Failed to approve submission:" (:body response)))))))

(defn reject-submission [submission-id]
  "Reject a mission submission"
  (when (:admin-authenticated @app-state)
    (go
      (let [response (<! (http/put (str config/api-base-url "/submissions/" submission-id "/reject")
                                   {:headers {"Authorization" (str "Bearer " (:admin-token @app-state))}}))]
        (if (= 200 (:status response))
          (do
            (js/console.log "Submission rejected successfully")
            (fetch-submissions))
          (js/console.error "Failed to reject submission:" (:body response)))))))

(defn delete-mission [mission-id]
  "Delete a mission (admin only)"
  (when (and (:admin-authenticated @app-state)
             (js/confirm "Are you sure you want to delete this mission? This action cannot be undone."))
    (go
      (let [response (<! (http/delete (str config/api-base-url "/missions/" mission-id)
                                      {:headers {"Authorization" (str "Bearer " (:admin-token @app-state))}}))]
        (if (= 200 (:status response))
          (do
            (js/console.log "Mission deleted successfully")
            (fetch-missions))
          (js/console.error "Failed to delete mission:" (:body response)))))))

(defn update-mission [mission-id mission-data]
  "Update an existing mission (admin only)"
  (when (:admin-authenticated @app-state)
    (go
      (let [response (<! (http/put (str config/api-base-url "/missions/" mission-id)
                                   {:json-params mission-data
                                    :headers {"Authorization" (str "Bearer " (:admin-token @app-state))}}))]
        (if (= 200 (:status response))
          (do
            (js/console.log "Mission updated successfully")
            (swap! app-state assoc :edit-dialog-open false)
            (fetch-missions))
          (js/console.error "Failed to update mission:" (:body response)))))))

;; API functions
(defn fetch-missions []
  (js/console.log "Fetching missions from API...")
  (swap! app-state assoc :loading true)
  (go
    (let [url (str config/api-base-url "/missions")
          _ (js/console.log "Making request to:" url)
          response (<! (http/get url))]
      (js/console.log "Response received:" response)
      (if (= 200 (:status response))
        (do
          (js/console.log "Missions data:" (:missions (:body response)))
          (swap! app-state assoc :missions (:missions (:body response)) :loading false))
        (do
          (js/console.error "Failed to fetch missions. Status:" (:status response) "Body:" (:body response))
          (swap! app-state assoc :loading false))))))

(defn create-mission [mission]
  (go
    (let [headers (if (:admin-authenticated @app-state)
                    {"Authorization" (str "Bearer " (:admin-token @app-state))}
                    {})
          response (<! (http/post (str config/api-base-url "/missions")
                                  {:json-params mission
                                   :headers headers}))]
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
          (fetch-missions)
          (when (:admin-authenticated @app-state)
            (fetch-submissions)))
        (js/console.error "Failed to create mission:" (:body response))))))

(defn fetch-mission-details [mission-id]
  (swap! app-state assoc :mission-details-loading true)
  (go
    (let [response (<! (http/get (str config/api-base-url "/missions/" mission-id)))]
      (if (= 200 (:status response))
        (swap! app-state assoc
               :mission-details (:mission (:body response))
               :mission-details-loading false
               :selected-mission-id mission-id
               :current-page :mission-details)
        (do
          (js/console.error "Failed to fetch mission details:" (:body response))
          (swap! app-state assoc :mission-details-loading false))))))

;; Pagination helpers
(defn get-paginated-missions [missions page-number per-page]
  (let [start-idx (* (dec page-number) per-page)
        end-idx (+ start-idx per-page)]
    (->> missions
         (drop start-idx)
         (take per-page))))

(defn get-total-pages [missions per-page]
  (Math/ceil (/ (count missions) per-page)))

;; Challenge analysis functions
(def challenge-definitions
  {:short-runway "Short Runway"
   :narrow-runway "Narrow Runway" 
   :high-da "High DA"
   :mountain-flying "Mountain Flying"
   :time-restrictions "Time Restrictions"
   :soft-field "Soft Field"
   :obstacles "Obstacles within 1 mile of threshold"
   :complex-airspace "Complex Airspace"})

(defn analyze-mission-challenges [mission]
  "Analyze mission data to determine applicable challenges"
  (let [description (str/lower-case (str (:mission_description mission) " " (:notes mission) " " (:objective mission)))
        route (str/lower-case (or (:route mission) ""))
        title (str/lower-case (:title mission))
        category (str/lower-case (:category mission))
        all-text (str description " " route " " title " " category)]
    (cond-> #{}
      ;; High DA challenges
      (or (str/includes? all-text "density altitude")
          (str/includes? all-text "high altitude")
          (str/includes? all-text "mountain")
          (str/includes? all-text "sierra")
          (str/includes? all-text "truckee")
          (str/includes? all-text "tahoe")
          (str/includes? all-text "mammoth")
          (str/includes? all-text "reno")
          (str/includes? all-text "death valley")
          (str/includes? all-text "furnace creek"))
      (conj :high-da)
      
      ;; Mountain Flying - be more specific to avoid false positives
      (or (and (str/includes? all-text "mountain")
               (or (str/includes? all-text "flying")
                   (str/includes? all-text "terrain")
                   (str/includes? all-text "valley")
                   (str/includes? all-text "downdraft")
                   (str/includes? all-text "updraft")))
          (str/includes? all-text "sierra")
          (str/includes? all-text "ktrk") ; Truckee, mountain airport
          (str/includes? all-text "kmmh") ; Mammoth Lakes, mountain airport
          (str/includes? all-text "high altitude")
          (str/includes? all-text "density altitude")
          (str/includes? all-text "terrain clearance"))
      (conj :mountain-flying)
      
      ;; Complex Airspace
      (or (str/includes? all-text "class b")
          (str/includes? all-text "class c")
          (str/includes? all-text "bravo")
          (str/includes? all-text "charlie")
          (str/includes? all-text "clearance")
          (str/includes? all-text "atc")
          (str/includes? all-text "approach control")
          (str/includes? all-text "moa")
          (str/includes? all-text "airspace"))
      (conj :complex-airspace)
      
      ;; Short Runway
      (or (str/includes? all-text "short")
          (str/includes? all-text "0q5")
          (str/includes? all-text "shelter cove")
          (str/includes? all-text "1o2")
          (str/includes? all-text "lampson")
          (str/includes? all-text "o22")
          (str/includes? all-text "columbia")
          (str/includes? all-text "l06")
          (str/includes? all-text "furnace creek"))
      (conj :short-runway)
      
      ;; Soft Field
      (or (str/includes? all-text "soft field")
          (str/includes? all-text "grass")
          (str/includes? all-text "dirt")
          (str/includes? all-text "rough")
          (str/includes? all-text "gravel"))
      (conj :soft-field)
      
      ;; Obstacles
      (or (str/includes? all-text "obstacle")
          (str/includes? all-text "terrain")
          (str/includes? all-text "wake turbulence")
          (str/includes? all-text "downdraft")
          (str/includes? all-text "challenging winds"))
      (conj :obstacles)
      
      ;; Time Restrictions  
      (or (str/includes? all-text "time")
          (str/includes? all-text "morning departure")
          (str/includes? all-text "afternoon")
          (str/includes? all-text "peak hours")
          (str/includes? all-text "busy"))
      (conj :time-restrictions))))

;; Admin Panel Functions
(defn export-missions []
  "Export all missions as JSON file"
  (let [missions-data {:missions (:missions @app-state)
                       :exported-at (js/Date.)
                       :version "2.1"}
        json-str (js/JSON.stringify (clj->js missions-data) nil 2)
        blob (js/Blob. [json-str] #js {:type "application/json"})
        url (js/URL.createObjectURL blob)
        link (js/document.createElement "a")]
    (set! (.-href link) url)
    (set! (.-download link) (str "aviation-missions-" (.toISOString (js/Date.)) ".json"))
    (.click link)
    (js/URL.revokeObjectURL url)
    (js/console.log "Missions exported successfully")))

(defn import-missions [file]
  "Import missions from JSON file"
  (when file
    (let [reader (js/FileReader.)]
      (set! (.-onload reader)
            (fn [e]
              (try
                (let [json-data (js/JSON.parse (.-result e))
                      missions (js->clj (.-missions json-data) :keywordize-keys true)]
                  (swap! app-state assoc :missions missions)
                  (js/console.log "Missions imported successfully" (count missions) "missions")
                  (js/alert (str "Successfully imported " (count missions) " missions!")))
                (catch js/Error e
                  (js/console.error "Import error:" e)
                  (js/alert "Error importing missions. Please check the file format.")))))
      (.readAsText reader file))))

(defn refresh-missions []
  "Refresh missions from server"
  (swap! app-state assoc :loading true)
  (go
    (let [response (<! (http/get "/missions"))]
      (if (= (:status response) 200)
        (do
          (swap! app-state assoc :missions (:body response))
          (swap! app-state assoc :loading false)
          (js/console.log "Missions refreshed successfully"))
        (do
          (swap! app-state assoc :loading false)
          (js/console.error "Failed to refresh missions"))))))

(defn clear-mission-cache []
  "Clear mission cache and reload"
  (when (js/confirm "Are you sure you want to clear the mission cache?")
    (swap! app-state assoc :missions [])
    (refresh-missions)
    (js/console.log "Mission cache cleared")))

(defn validate-missions []
  "Validate mission data integrity"
  (let [missions (:missions @app-state)
        validation-errors (atom [])]
    (doseq [mission missions]
      (when (not (:title mission))
        (swap! validation-errors conj (str "Mission missing title: " (:id mission))))
      (when (not (:category mission))
        (swap! validation-errors conj (str "Mission missing category: " (:id mission))))
      (when (not (:difficulty mission))
        (swap! validation-errors conj (str "Mission missing difficulty: " (:id mission)))))
    
    (if (empty? @validation-errors)
      (js/alert "✅ All missions are valid!")
      (js/alert (str "❌ Found " (count @validation-errors) " validation errors:\n" 
                     (str/join "\n" @validation-errors))))))

(defn challenges-table [challenges]
  "Display challenges as a compact table"
  (when (seq challenges)
    [:div.challenges-section
     [:h4 "FLIGHT CHALLENGES"]
     [:div.challenges-grid
      (for [challenge-key (sort challenges)]
        ^{:key challenge-key}
        [:div.challenge-item
         [:span.challenge-icon "⚠"]
         [:span.challenge-label (get challenge-definitions challenge-key)]])]]))

;; Components
(defn page-navigation []
  (let [state @app-state
        total-missions (count (:missions state))
        per-page (:missions-per-page state)
        current-page (:page-number state)
        total-pages (get-total-pages (:missions state) per-page)
        start-mission (+ (* (dec current-page) per-page) 1)
        end-mission (min (* current-page per-page) total-missions)]
    [:div.page-navigation
     [:button.nav-button
      {:disabled (= current-page 1)
       :on-click #(swap! app-state assoc :page-number 1)}
      "⟪ FIRST"]
     [:button.nav-button
      {:disabled (= current-page 1)
       :on-click #(swap! app-state update :page-number dec)}
      "‹ PREV"]
     [:div.page-info
      (str "PAGE " current-page " OF " total-pages " • MISSIONS " start-mission "-" end-mission " OF " total-missions)]
     [:button.nav-button
      {:disabled (= current-page total-pages)
       :on-click #(swap! app-state update :page-number inc)}
      "NEXT ›"]
     [:button.nav-button
      {:disabled (= current-page total-pages)
       :on-click #(swap! app-state assoc :page-number total-pages)}
      "LAST ⟫"]]))

(defn mission-card [mission]
  (let [challenges (analyze-mission-challenges mission)]
    [:div.mission-card
     [:div.mission-header
      [:h3.mission-title (:title mission)]
      [:div.mission-meta
       [:span.category-badge (:category mission)]
       [:span.difficulty-badge {:class (str "badge-difficulty-" (:difficulty mission))}
        (case (:difficulty mission)
          1 "EASY"
          2 "MEDIUM" 
          3 "HARD"
          4 "HARD"
          5 "HARD"
          6 "EXPERT"
          7 "EXPERT"
          8 "EXPERT"
          9 "EXPERT"
          "UNK")]
       [:span.experience-badge (if (:pilot_experience mission)
                                (-> (:pilot_experience mission)
                                    (str/replace #"Beginner.*" "STUDENT")
                                    (str/replace #"Intermediate.*" "PRIVATE")
                                    (str/replace #"Advanced.*" "COMMERCIAL"))
                                "STUDENT")]]]
     
     [:div.mission-content
      [:div.mission-data-grid
       [:span.mission-data-label "ROUTE:"]
       [:span.mission-data-value (or (:route mission) (:suggested_route mission) "See description")]
       
       [:span.mission-data-label "OBJECTIVE:"]
       [:span.mission-data-value (:objective mission)]
       
       [:span.mission-data-label "DESCRIPTION:"]
       [:span.mission-data-value (:mission_description mission)]]
      
      [challenges-table challenges]
      
      (when (and (:notes mission) (not-empty (:notes mission)))
        [:div.mission-section
         [:h4 "Notes"]
         [:p (:notes mission)]])
      
      (when (and (:special_challenges mission) (not-empty (:special_challenges mission)))
        [:div.mission-section
         [:h4 "Special Challenges"]
         [:p (:special_challenges mission)]])]
     
     [:div.mission-footer
      [:div.pilot-experience 
       (str "MIN EXP: " (or (:pilot_experience mission) "Student Pilot"))]
      
      [:div.mission-stats
       [:div.stat-item
        [:span.stat-icon "💬"]
        [:span.stat-count (or (:comment_count mission) 0)]
        [:span.stat-label "Comments"]]
       
       [:div.stat-item
        [:span.stat-icon "✓"]
        [:span.stat-count (or (:completion_count mission) 0)]
        [:span.stat-label "Completed"]]
       
        [:button.btn-mission.primary {:on-click #(fetch-mission-details (:id mission))}
         "BRIEF"]]]

(defn create-mission-dialog []
  (let [new-mission (:new-mission @app-state)]
    (when (:create-dialog-open @app-state)
      [:div.modal.modal-open
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
          [:option {:value "3"} "3 - Advanced"]]
       
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
        "Create Mission"]

(defn missions-page []
  [:div.missions-page
   [:div.page-header
    [:h1 "✈️ Aviation Training Missions"]]
   
  (if (:loading @app-state)
    [:div.loading "Loading missions..."]
    
    [:div
     [page-navigation]
     
     [:div.missions-grid
      (if (empty? (:missions @app-state))
        [:div.empty-state
         [:p "No missions found. Create your first mission to get started!"]]
        
        (let [paginated-missions (get-paginated-missions 
                                   (:missions @app-state)
                                   (:page-number @app-state)
                                   (:missions-per-page @app-state))]
          (for [mission paginated-missions]
            ^{:key (:id mission)}
            [mission-card mission])))]
     
     [page-navigation]])
   
   ;; Floating Action Button for Create Mission
   [:button.fab {:on-click #(swap! app-state assoc :create-dialog-open true)
                 :title "Create New Mission"}
    [:span.fab-icon "✈️"]
    [:span.fab-label "Create Mission"]]
   
   [create-mission-dialog]
   [admin-login-dialog]
   [edit-mission-dialog]])

(defn mission-details-page []
  (let [state @app-state
        mission (:mission-details state)
        loading? (:mission-details-loading state)]
    [:div.mission-details-page
     [:div.page-header
      [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :current-page :missions)}
       "← Back to Missions"]
      (if mission
        [:h1.mission-title (:title mission)]
        [:h1 "Mission Details"])]
     
     (cond
       loading?
       [:div.loading "Loading mission details..."]
       
       (not mission)
       [:div.error "Mission not found or failed to load."]
       
       :else
       [:div.mission-details-content
        [:div.mission-details-main
         ;; Mission Overview
         [:div.detail-section
          [:h3 "Mission Overview"]
          [:div.mission-data-grid
           [:span.mission-data-label "CATEGORY:"]
           [:span.mission-data-value (:category mission)]
           
           [:span.mission-data-label "DIFFICULTY:"]
           [:span.mission-data-value (case (:difficulty mission)
                                       1 "EASY (1/9)"
                                       2 "MEDIUM (2/9)"
                                       3 "HARD (3/9)"
                                       4 "HARD (4/9)"
                                       5 "HARD (5/9)"
                                       6 "EXPERT (6/9)"
                                       7 "EXPERT (7/9)"
                                       8 "EXPERT (8/9)"
                                       9 "EXPERT (9/9)"
                                       (str "LEVEL " (:difficulty mission)))]
           
           [:span.mission-data-label "PILOT EXPERIENCE:"]
           [:span.mission-data-value (or (:pilot_experience mission) "Student Pilot")]
           
           [:span.mission-data-label "ROUTE:"]
           [:span.mission-data-value (or (:route mission) (:suggested_route mission) "See description")]]]
         
         ;; Mission Objective
         [:div.detail-section
          [:h3 "Mission Objective"]
          [:p (:objective mission)]]
         
         ;; Mission Description
         [:div.detail-section
          [:h3 "Mission Description"]
          [:p (:mission_description mission)]]
         
         ;; Why This Mission
         (when (and (:why_description mission) (not-empty (:why_description mission)))
           [:div.detail-section
            [:h3 "Why This Mission Matters"]
            [:p (:why_description mission)]])
         
         ;; Flight Challenges
         (let [challenges (analyze-mission-challenges mission)]
           (when (seq challenges)
             [:div.detail-section
              [:h3 "Flight Challenges"]
              [:div.challenges-grid
               (for [challenge-key (sort challenges)]
                 ^{:key challenge-key}
                 [:div.challenge-item
                  [:span.challenge-icon "⚠"]
                  [:span.challenge-label (get challenge-definitions challenge-key)]])]]))
         
         ;; Notes
         (when (and (:notes mission) (not-empty (:notes mission)))
           [:div.detail-section
            [:h3 "Important Notes"]
            [:p (:notes mission)]])
         
         ;; Special Challenges
         (when (and (:special_challenges mission) (not-empty (:special_challenges mission)))
           [:div.detail-section
            [:h3 "Special Challenges"]
            [:p (:special_challenges mission)]])]
        
        ;; Sidebar
        [:div.mission-details-sidebar
         ;; Mission Stats
         [:div.detail-card
          [:h3 "Mission Statistics"]
          [:div.detail-item
           [:span.detail-label "Comments"]
           [:span.detail-value (or (:comment_count mission) 0)]]
          [:div.detail-item
           [:span.detail-label "Completions"]
           [:span.detail-value (or (:completion_count mission) 0)]]
          [:div.detail-item
           [:span.detail-label "Thumbs Up"]
           [:span.detail-value (or (:thumbs_up mission) 0)]]
          [:div.detail-item
           [:span.detail-label "Thumbs Down"]
           [:span.detail-value (or (:thumbs_down mission) 0)]]]
         
         ;; Mission Metadata
         [:div.detail-card
          [:h3 "Mission Information"]
          [:div.detail-item
           [:span.detail-label "Created"]
           [:span.detail-value (if (:created_at mission)
                                 (-> (:created_at mission)
                                     (str/replace #"T.*" "")
                                     (str/replace #"-" "/"))
                                 "Unknown")]]
          [:div.detail-item
           [:span.detail-label "Last Updated"]
           [:span.detail-value (if (:updated_at mission)
                                 (-> (:updated_at mission)
                                     (str/replace #"T.*" "")
                                     (str/replace #"-" "/"))
                                 "Unknown")]]
          [:div.detail-item
           [:span.detail-label "Mission ID"]
           [:span.detail-value (str "#" (:id mission))]]]
         
         ;; Actions
         [:div.detail-card
          [:h3 "Actions"]
          [:button.btn.btn-primary {:style {:width "100%" :margin-bottom "10px"}}
           "📋 Print Mission Brief"]
          [:button.btn.btn-secondary {:style {:width "100%" :margin-bottom "10px"}}
           "✓ Mark as Completed"]
          [:button.btn.btn-outline {:style {:width "100%"}}
           "💬 Add Comment"]]]]])

(defn admin-login-dialog []
  (let [credentials (:login-credentials @app-state)]
    [:div.modal {:class (when (:login-dialog-open @app-state) "modal-open")}
     [:div.modal-backdrop {:on-click #(swap! app-state assoc :login-dialog-open false)}]
     [:div.modal-content
      [:div.modal-header
       [:h2 "🔐 Administrator Login"]
       [:button.modal-close {:on-click #(swap! app-state assoc :login-dialog-open false)} "×"]]

      [:div.modal-body
       [:div.form-group
        [:label "Admin Username"]
        [:input.form-input {:type "text"
                           :value (:admin_name credentials)
                           :placeholder "Enter admin username"
                           :on-change #(swap! app-state assoc-in [:login-credentials :admin_name] (.. % -target -value))}]]

       [:div.form-group
        [:label "Password"]
        [:input.form-input {:type "password"
                           :value (:password credentials)
                           :placeholder "Enter admin password"
                           :on-change #(swap! app-state assoc-in [:login-credentials :password] (.. % -target -value))
                           :on-key-press #(when (= (.-key %) "Enter")
                                            (admin-login credentials))}]]

       [:div.admin-info
        [:p "Default credentials for demo:"]
        [:p "Username: " [:code "admin"]]
        [:p "Password: " [:code "aviation123"]]]]

      [:div.modal-footer
       [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :login-dialog-open false)}
        "Cancel"]
       [:button.btn.btn-primary {:on-click #(admin-login credentials)
                                 :disabled (or (empty? (:admin_name credentials))
                                              (empty? (:password credentials)))}
        "🔓 Login"]]]]))

(defn edit-mission-dialog []
  (let [mission (:mission-details @app-state)
        edit-data (or (:edit-mission-data @app-state) mission)]
    [:div.modal {:class (when (:edit-dialog-open @app-state) "modal-open")}
     [:div.modal-backdrop {:on-click #(swap! app-state assoc :edit-dialog-open false)}]
     [:div.modal-content
      [:div.modal-header
       [:h2 "✏️ Edit Mission"]
       [:button.modal-close {:on-click #(swap! app-state assoc :edit-dialog-open false)} "×"]]

      [:div.modal-body
       [:div.form-group
        [:label "Mission Title *"]
        [:input.form-input {:type "text"
                           :value (:title edit-data)
                           :on-change #(swap! app-state assoc-in [:edit-mission-data :title] (.. % -target -value))}]]

       [:div.form-group
        [:label "Mission Description *"]
        [:textarea.form-textarea {:value (:mission_description edit-data)
                                 :rows 3
                                 :on-change #(swap! app-state assoc-in [:edit-mission-data :mission_description] (.. % -target -value))}]]

       [:div.form-group
        [:label "Why This Mission? *"]
        [:textarea.form-textarea {:value (:why_description edit-data)
                                 :rows 2
                                 :on-change #(swap! app-state assoc-in [:edit-mission-data :why_description] (.. % -target -value))}]]

       [:div.form-row
        [:div.form-group
         [:label "Category"]
         [:select.form-select {:value (:category edit-data)
                              :on-change #(swap! app-state assoc-in [:edit-mission-data :category] (.. % -target -value))}
          [:option {:value "Training"} "Training"]
          [:option {:value "Proficiency"} "Proficiency"]
          [:option {:value "Cross-Country"} "Cross-Country"]
          [:option {:value "Emergency"} "Emergency Procedures"]]]

        [:div.form-group
         [:label "Difficulty"]
         [:select.form-select {:value (:difficulty edit-data)
                              :on-change #(swap! app-state assoc-in [:edit-mission-data :difficulty] (js/parseInt (.. % -target -value)))}
          [:option {:value "1"} "1 - Beginner"]
          [:option {:value "2"} "2 - Intermediate"]
          [:option {:value "3"} "3 - Advanced"]]]]

       [:div.form-group
        [:label "Primary Objective *"]
        [:input.form-input {:type "text"
                           :value (:objective edit-data)
                           :on-change #(swap! app-state assoc-in [:edit-mission-data :objective] (.. % -target -value))}]]]

      [:div.modal-footer
       [:button.btn.btn-secondary {:on-click #(swap! app-state assoc :edit-dialog-open false)}
        "Cancel"]
       [:button.btn.btn-primary {:on-click (fn []
                                             (update-mission (:edit-mission-id @app-state) (:edit-mission-data @app-state))
                                             (swap! app-state dissoc :edit-mission-data))}
        "💾 Save Changes"]]]]))

(defn admin-panel []
  [:div.admin-panel
   [:div.page-header
    [:h1 "⚙️ Admin Panel"]
    [:p "Mission database management and system administration"]]
   
   [:div.admin-content
    [:div.admin-section
     [:h2 "📊 Database Management"]
     [:div.admin-cards
      [:div.admin-card
       [:h3 "Export Missions"]
       [:p "Download all missions as JSON file"]
       [:button.btn.btn-primary {:on-click #(export-missions)}
        "📥 Export JSON"]]
      
      [:div.admin-card
       [:h3 "Import Missions"]
       [:p "Upload missions from JSON file"]
       [:input {:type "file"
                :accept ".json"
                :on-change #(import-missions (-> % .-target .-files (aget 0)))}]
       [:button.btn.btn-secondary {:on-click #(document.querySelector "input[type=file]")}
        "📤 Choose File"]]]
    
    [:div.admin-section
     [:h2 "📈 System Statistics"]
     [:div.stats-grid
      [:div.stat-card
       [:h3 "Total Missions"]
       [:div.stat-value (count (:missions @app-state))]]
      [:div.stat-card
       [:h3 "Categories"]
       [:div.stat-value (count (set (map :category (:missions @app-state))))]]
      [:div.stat-card
       [:h3 "Avg Difficulty"]
       [:div.stat-value (if (seq (:missions @app-state))
                          (->> (:missions @app-state)
                               (map :difficulty)
                               (filter number?)
                               (reduce +)
                               (/ (count (filter number? (map :difficulty (:missions @app-state))))))
                          "N/A")]]]]
    
    [:div.admin-section
     [:h2 "🔧 Mission Management"]
     [:div.admin-actions
      [:button.btn.btn-warning {:on-click #(refresh-missions)}
       "🔄 Refresh Missions"]
      [:button.btn.btn-danger {:on-click #(clear-mission-cache)}
       "🗑️ Clear Cache"]
      [:button.btn.btn-info {:on-click #(validate-missions)}
       "✅ Validate Data"]]]]
    
    [:div.admin-section
     [:h2 "📋 Recent Activity"]
     [:div.activity-log
      [:p "System logs and recent changes will appear here."]
      [:div.log-entry
       [:span.log-time (str "Last updated: " (js/Date.))]
       [:span.log-message "Admin panel loaded successfully"]]]]]])

(defn navigation []
  [:nav.navigation
   [:div.nav-container
    [:div.nav-tabs
     [:a.nav-tab {:class (when (= (:current-page @app-state) :missions) "active")
                  :on-click #(swap! app-state assoc :current-page :missions)}
      [:span.nav-icon "✈️"]
      [:span.nav-label "Missions"]]

     ;; Admin tab - only show if authenticated, otherwise show login button
     (if (:admin-authenticated @app-state)
       [:a.nav-tab {:class (when (= (:current-page @app-state) :admin) "active")
                    :on-click #(do
                                 (fetch-submissions)
                                 (fetch-pending-updates)
                                 (swap! app-state assoc :current-page :admin))}
        [:span.nav-icon "⚙️"]
        [:span.nav-label "Admin Panel"]]
       [:a.nav-tab {:on-click #(swap! app-state assoc :login-dialog-open true)}
        [:span.nav-icon "🔐"]
        [:span.nav-label "Admin Login"]])

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
  (js/console.log "Aviation Missions app initializing...")
  (js/console.log "Debug mode:" config/debug?)
  (js/console.log "API base URL:" config/api-base-url)
  (dev-setup)
  (mount-root)
  (js/console.log "App mounted, checking admin status and fetching missions...")
  (check-admin-status)
  (fetch-missions))
