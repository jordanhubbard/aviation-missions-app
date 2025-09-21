(ns aviation-missions.handlers
  (:require [ring.util.response :refer [response status]]
            [aviation-missions.db :as db]
            [clojure.string :as str]
            [clojure.spec.alpha :as s]
            [clojure.tools.logging :as log]
            [clj-yaml.core :as yaml]))

;; Data validation specs
(s/def ::non-empty-string (s/and string? #(not (str/blank? %))))
(s/def ::title ::non-empty-string)
(s/def ::category #{"Training" "Proficiency" "Cross-Country" "Emergency"})
(s/def ::difficulty (s/int-in 1 11))
(s/def ::objective ::non-empty-string)
(s/def ::mission_description ::non-empty-string)
(s/def ::why_description ::non-empty-string)
(s/def ::notes (s/nilable string?))
(s/def ::route (s/nilable string?))
(s/def ::pilot_experience (s/nilable string?))

(s/def ::mission-data
  (s/keys :req-un [::title ::category ::difficulty ::objective
                   ::mission_description ::why_description]
          :opt-un [::notes ::route ::pilot_experience]))

;; Utility functions
(defn- extract-auth-token
  "Extract bearer token from authorization header"
  [headers]
  (when-let [auth-header (or (get headers "authorization")
                             (get headers "Authorization"))]
    (when (.startsWith auth-header "Bearer ")
      (subs auth-header 7))))

(defn- validate-mission-data
  "Validate mission data against spec"
  [mission-data]
  (when-not (s/valid? ::mission-data mission-data)
    (s/explain-str ::mission-data mission-data)))

(defn- handle-error
  "Standard error response handler"
  [status-code error-message & [details]]
  (log/error error-message details)
  (-> (response (cond-> {:error error-message}
                  details (assoc :details details)))
      (status status-code)))

(defn- handle-success
  "Standard success response handler"
  [data & [status-code]]
  (-> (response data)
      (status (or status-code 200))))

;; Admin authentication middleware
(defn admin-required [handler]
  (fn [request]
    (let [token (extract-auth-token (:headers request))]
      (if (and token (db/validate-admin-session token))
        (handler request)
        (handle-error 401 "Admin authentication required")))))

(defn get-missions [request]
  "Get all missions with filtering and sorting options"
  (try
    (let [params (:params request)
          {:keys [category difficulty pilot_experience sort]} params
          missions (db/get-all-missions)
          filtered-missions (cond->> missions
                              category (filter #(= (:category %) category))
                              difficulty (filter #(= (:difficulty %) (Integer/parseInt difficulty)))
                              pilot_experience (filter #(= (:pilot_experience %) pilot_experience)))]
      (log/info "Retrieved" (count filtered-missions) "missions with filters:" params)
      (handle-success {:missions filtered-missions}))
    (catch NumberFormatException e
      (handle-error 400 "Invalid difficulty parameter" (.getMessage e)))
    (catch Exception e
      (handle-error 500 "Failed to fetch missions" (.getMessage e)))))

(defn get-mission [id]
  "Get a specific mission by ID"
  (try
    (let [mission-id (Integer/parseInt id)]
      (if-let [mission (db/get-mission-by-id mission-id)]
        (response {:mission mission})
        (-> (response {:error "Mission not found"})
            (status 404))))
    (catch NumberFormatException e
      (-> (response {:error "Invalid mission ID"})
          (status 400)))
    (catch Exception e
      (-> (response {:error "Failed to fetch mission" :details (.getMessage e)})
          (status 500)))))

(defn create-mission [request]
  "Create a new mission (admin) or submit for approval (user)"
  (try
    (let [mission-data (:body request)
          token (extract-auth-token (:headers request))
          is-admin (and token (db/validate-admin-session token))
          validation-error (validate-mission-data mission-data)]

      (if validation-error
        (handle-error 400 "Invalid mission data" validation-error)
        (if is-admin
          ;; Admin can create directly
          (let [new-mission (db/create-mission! mission-data)]
            (log/info "Admin created mission:" (:title mission-data))
            (handle-success {:mission new-mission} 201))
          ;; Non-admin submits for approval
          (let [submission-data (assoc mission-data
                                       :submitter_name (or (:submitter_name mission-data) "Anonymous")
                                       :submitter_email (:submitter_email mission-data))]
            (db/create-submission! submission-data)
            (log/info "User submitted mission for approval:" (:title mission-data))
            (handle-success {:message "Mission submitted for approval"} 201)))))
    (catch Exception e
      (handle-error 500 "Failed to create mission" (.getMessage e)))))

(defn update-mission [id request]
  "Update an existing mission (admin) or submit update for approval (user)"
  (try
    (let [mission-id (Integer/parseInt id)
          mission-data (:body request)
          headers (:headers request)
          auth-header (or (get headers "authorization") (get headers "Authorization"))
          token (when auth-header (str/replace auth-header #"Bearer " ""))
          is-admin (and token (db/validate-admin-session token))]
      (if (db/get-mission-by-id mission-id)
        (if is-admin
          ;; Admin can update directly
          (let [updated-mission (db/update-mission! mission-id mission-data)]
            (response {:mission updated-mission}))
          ;; Non-admin submits update for approval
          (do
            (db/create-mission-update! mission-id (assoc mission-data 
                                                         :submitter_name (or (:submitter_name mission-data) "Anonymous")
                                                         :submitter_email (:submitter_email mission-data)))
            (-> (response {:message "Mission update submitted for approval"})
                (status 201))))
        (-> (response {:error "Mission not found"})
            (status 404))))
    (catch NumberFormatException e
      (-> (response {:error "Invalid mission ID"})
          (status 400)))
    (catch Exception e
      (-> (response {:error "Failed to update mission" :details (.getMessage e)})
          (status 500)))))

(defn delete-mission [id]
  "Delete a mission"
  (try
    (let [mission-id (Integer/parseInt id)]
      (if (db/get-mission-by-id mission-id)
        (do
          (db/delete-mission! mission-id)
          (response {:message "Mission deleted successfully"}))
        (-> (response {:error "Mission not found"})
            (status 404))))
    (catch NumberFormatException e
      (-> (response {:error "Invalid mission ID"})
          (status 400)))
    (catch Exception e
      (-> (response {:error "Failed to delete mission" :details (.getMessage e)})
          (status 500)))))

(defn get-comments [id]
  "Get comments for a mission"
  (try
    (let [mission-id (Integer/parseInt id)]
      (if (db/get-mission-by-id mission-id)
        (let [comments (db/get-comments-for-mission mission-id)]
          (response {:comments comments}))
        (-> (response {:error "Mission not found"})
            (status 404))))
    (catch Exception e
      (-> (response {:error "Failed to fetch comments" :details (.getMessage e)})
          (status 500)))))

(defn add-comment [id request]
  "Add a comment to a mission"
  (try
    (let [mission-id (Integer/parseInt id)
          comment-data (:body request)]
      (if (and (db/get-mission-by-id mission-id)
               (:author_name comment-data)
               (:content comment-data))
        (do
          (db/add-comment! mission-id comment-data)
          (-> (response {:message "Comment added successfully"})
              (status 201)))
        (-> (response {:error "Mission not found or missing required fields"})
            (status 400))))
    (catch Exception e
      (-> (response {:error "Failed to add comment" :details (.getMessage e)})
          (status 500)))))

(defn get-reviews [id]
  "Get reviews for a mission"
  (try
    (let [mission-id (Integer/parseInt id)]
      (if (db/get-mission-by-id mission-id)
        (let [reviews (db/get-reviews-for-mission mission-id)]
          (response {:reviews reviews}))
        (-> (response {:error "Mission not found"})
            (status 404))))
    (catch Exception e
      (-> (response {:error "Failed to fetch reviews" :details (.getMessage e)})
          (status 500)))))

(defn add-review [id request]
  "Add a review to a mission"
  (try
    (let [mission-id (Integer/parseInt id)
          review-data (:body request)]
      (if (and (db/get-mission-by-id mission-id)
               (:pilot_name review-data))
        (do
          (db/add-review! mission-id review-data)
          (-> (response {:message "Review added successfully"})
              (status 201)))
        (-> (response {:error "Mission not found or invalid review data"})
            (status 400))))
    (catch Exception e
      (-> (response {:error "Failed to add review" :details (.getMessage e)})
          (status 500)))))

(defn add-rating [id request]
  "Add or update a thumbs up/down rating for a mission"
  (try
    (let [mission-id (Integer/parseInt id)
          rating-data (:body request)]
      (if (and (db/get-mission-by-id mission-id)
               (:pilot_name rating-data)
               (:rating rating-data)
               (contains? #{"up" "down"} (:rating rating-data)))
        (do
          (db/add-or-update-rating! mission-id rating-data)
          (-> (response {:message "Rating updated successfully"})
              (status 201)))
        (-> (response {:error "Mission not found or invalid rating data"})
            (status 400))))
    (catch Exception e
      (-> (response {:error "Failed to add rating" :details (.getMessage e)})
          (status 500)))))

(defn get-user-rating [id pilot-name]
  "Get a user's rating for a mission"
  (try
    (let [mission-id (Integer/parseInt id)]
      (if-let [rating (db/get-user-rating mission-id pilot-name)]
        (response {:rating (:rating rating)})
        (response {:rating nil})))
    (catch Exception e
      (-> (response {:error "Failed to get rating" :details (.getMessage e)})
          (status 500)))))

(defn get-completions [id]
  "Get all completions for a mission"
  (try
    (let [mission-id (Integer/parseInt id)]
      (if (db/get-mission-by-id mission-id)
        (let [completions (db/get-completions-for-mission mission-id)]
          (response {:completions completions}))
        (-> (response {:error "Mission not found"})
            (status 404))))
    (catch Exception e
      (-> (response {:error "Failed to fetch completions" :details (.getMessage e)})
          (status 500)))))

(defn mark-completed [id request]
  "Mark a mission as completed by a pilot"
  (try
    (let [mission-id (Integer/parseInt id)
          completion-data (:body request)]
      (if (and (db/get-mission-by-id mission-id)
               (:pilot_name completion-data)
               (:completion_date completion-data))
        (do
          (db/mark-mission-completed! mission-id completion-data)
          (-> (response {:message "Mission marked as completed"})
              (status 201)))
        (-> (response {:error "Mission not found or missing required fields"})
            (status 400))))
    (catch Exception e
      (-> (response {:error "Failed to mark mission as completed" :details (.getMessage e)})
          (status 500)))))

(defn get-submissions [request]
  "Get all mission submissions"
  (try
    (let [submissions (db/get-all-submissions)]
      (response {:submissions submissions}))
    (catch Exception e
      (-> (response {:error "Failed to fetch submissions" :details (.getMessage e)})
          (status 500)))))

(defn create-submission [request]
  "Create a new mission submission"
  (try
    (let [submission-data (:body request)]
      (if (and (:title submission-data)
               (:category submission-data)
               (:difficulty submission-data)
               (:objective submission-data)
               (:mission_description submission-data)
               (:why_description submission-data)
               (:submitter_name submission-data))
        (do
          (db/create-submission! submission-data)
          (-> (response {:message "Mission submission created successfully"})
              (status 201)))
        (-> (response {:error "Missing required fields"})
            (status 400))))
    (catch Exception e
      (-> (response {:error "Failed to create submission" :details (.getMessage e)})
          (status 500)))))

(defn approve-submission [id]
  "Approve a mission submission"
  (try
    (let [submission-id (Integer/parseInt id)]
      (db/approve-submission! submission-id)
      (response {:message "Submission approved and mission created"}))
    (catch Exception e
      (-> (response {:error "Failed to approve submission" :details (.getMessage e)})
          (status 500)))))

(defn reject-submission [id]
  "Reject a mission submission"
  (try
    (let [submission-id (Integer/parseInt id)]
      (db/reject-submission! submission-id "Rejected by admin")
      (response {:message "Submission rejected"}))
    (catch Exception e
      (-> (response {:error "Failed to reject submission" :details (.getMessage e)})
          (status 500)))))

;; Admin authentication
(defn admin-login [request]
  "Simple admin login (in production, use proper authentication)"
  (try
    (let [credentials (:body request)
          admin-name (:admin_name credentials)
          password (:password credentials)]
      ;; Simple hardcoded check - in production, use proper auth
      (if (and (= admin-name "admin") (= password "aviation123"))
        (let [token (db/create-admin-session! admin-name)]
          (response {:token token :admin_name admin-name}))
        (-> (response {:error "Invalid credentials"})
            (status 401))))
    (catch Exception e
      (-> (response {:error "Login failed" :details (.getMessage e)})
          (status 500)))))

(defn check-admin-status [request]
  "Check if current user is admin"
  (try
    (let [headers (:headers request)
          auth-header (or (get headers "authorization") (get headers "Authorization"))
          token (when auth-header 
                  (if (.startsWith auth-header "Bearer ")
                    (subs auth-header 7)
                    auth-header))
          is-admin (and token (not (empty? token)) (db/validate-admin-session token))]
      (if is-admin
        (response {:is_admin true :admin_name (:admin_name is-admin)})
        (response {:is_admin false})))
    (catch Exception e
      (-> (response {:error "Failed to check admin status" :details (.getMessage e)})
          (status 500)))))

;; Mission update approval handlers
(defn get-mission-updates [request]
  "Get all pending mission updates"
  (try
    (let [updates (db/get-all-mission-updates)]
      (response {:updates updates}))
    (catch Exception e
      (-> (response {:error "Failed to fetch updates" :details (.getMessage e)})
          (status 500)))))

(defn approve-mission-update [id]
  "Approve a mission update"
  (try
    (let [update-id (Integer/parseInt id)]
      (db/approve-mission-update! update-id)
      (response {:message "Mission update approved"}))
    (catch Exception e
      (-> (response {:error "Failed to approve update" :details (.getMessage e)})
          (status 500)))))

(defn reject-mission-update [id]
  "Reject a mission update"
  (try
    (let [update-id (Integer/parseInt id)]
      (db/reject-mission-update! update-id "Rejected by admin")
      (response {:message "Mission update rejected"}))
    (catch Exception e
      (-> (response {:error "Failed to reject update" :details (.getMessage e)})
          (status 500)))))

;; JSON Import/Export handlers
(defn export-missions [request]
  "Export all missions as JSON"
  (try
    (let [missions (db/export-all-missions)]
      (response {:missions missions}))
    (catch Exception e
      (-> (response {:error "Failed to export missions" :details (.getMessage e)})
          (status 500)))))

(defn export-missions-yaml [request]
  "Export all missions as YAML"
  (try
    (let [missions (db/export-all-missions)
          yaml-content (yaml/generate-string {:missions missions})]
      (-> (response yaml-content)
          (assoc-in [:headers "Content-Type"] "application/x-yaml")
          (assoc-in [:headers "Content-Disposition"] "attachment; filename=\"aviation-missions.yaml\"")))
    (catch Exception e
      (log/error e "Failed to export missions as YAML")
      (-> (response {:error "Failed to export missions as YAML" :details (.getMessage e)})
          (status 500)))))

(defn import-missions [request]
  "Import missions from JSON"
  (try
    (let [import-data (:body request)
          missions (:missions import-data)]
      (if (and missions (vector? missions))
        (let [imported-count (db/import-missions! missions)]
          (response {:message (str "Successfully imported " imported-count " missions")
                    :imported_count imported-count}))
        (-> (response {:error "Invalid format. Expected {\"missions\": [...]}"})
            (status 400))))
    (catch Exception e
      (-> (response {:error "Failed to import missions" :details (.getMessage e)})
          (status 500)))))
