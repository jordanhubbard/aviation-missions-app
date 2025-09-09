(ns aviation-missions.db
  (:require [clojure.java.jdbc :as jdbc]
            [clj-time.core :as time]
            [clj-time.coerce :as coerce]))

(def db-spec
  {:classname "org.h2.Driver"
   :subprotocol "h2"
   :subname (or (System/getenv "DATABASE_URL") "./data/aviation-missions")
   :user "sa"
   :password ""})

(defn init-db! []
  "Initialize the database with required tables"
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS missions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        difficulty INTEGER NOT NULL,
        objective TEXT NOT NULL,
        mission_description TEXT NOT NULL,
        why_description TEXT NOT NULL,
        notes TEXT,
        route VARCHAR(500),
        suggested_route VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )"])
  
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS comments (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        mission_id BIGINT NOT NULL,
        author_name VARCHAR(100) NOT NULL,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
      )"])
  
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS mission_ratings (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        mission_id BIGINT NOT NULL,
        pilot_name VARCHAR(100) NOT NULL,
        rating VARCHAR(10) NOT NULL CHECK (rating IN ('up', 'down')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(mission_id, pilot_name),
        FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
      )"])
  
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS reviews (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        mission_id BIGINT NOT NULL,
        pilot_name VARCHAR(100) NOT NULL,
        review_text TEXT,
        flight_date DATE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
      )"])
  
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS mission_completions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        mission_id BIGINT NOT NULL,
        pilot_name VARCHAR(100) NOT NULL,
        completion_date DATE NOT NULL,
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
      )"])
  
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS submissions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        difficulty INTEGER NOT NULL,
        objective TEXT NOT NULL,
        mission_description TEXT NOT NULL,
        why_description TEXT NOT NULL,
        notes TEXT,
        route VARCHAR(500),
        submitter_name VARCHAR(100) NOT NULL,
        submitter_email VARCHAR(255),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reviewed_at TIMESTAMP
      )"])
  
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS mission_updates (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        mission_id BIGINT NOT NULL,
        title VARCHAR(255) NOT NULL,
        category VARCHAR(100) NOT NULL,
        difficulty INTEGER NOT NULL,
        objective TEXT NOT NULL,
        mission_description TEXT NOT NULL,
        why_description TEXT NOT NULL,
        notes TEXT,
        route VARCHAR(500),
        submitter_name VARCHAR(100) NOT NULL,
        submitter_email VARCHAR(255),
        status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
        admin_notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        reviewed_at TIMESTAMP,
        FOREIGN KEY (mission_id) REFERENCES missions(id) ON DELETE CASCADE
      )"])
  
  (jdbc/execute! db-spec
    ["CREATE TABLE IF NOT EXISTS admin_sessions (
        id BIGINT AUTO_INCREMENT PRIMARY KEY,
        session_token VARCHAR(255) NOT NULL UNIQUE,
        admin_name VARCHAR(100) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        expires_at TIMESTAMP NOT NULL
      )"])
  
  (println "Database initialized successfully"))

;; Mission CRUD operations
(defn get-all-missions []
  (jdbc/query db-spec
    ["SELECT m.*, 
             COUNT(DISTINCT c.id) as comment_count,
             COUNT(DISTINCT mc.id) as completion_count,
             COUNT(DISTINCT CASE WHEN mr.rating = 'up' THEN mr.id END) as thumbs_up,
             COUNT(DISTINCT CASE WHEN mr.rating = 'down' THEN mr.id END) as thumbs_down
      FROM missions m
      LEFT JOIN comments c ON m.id = c.mission_id
      LEFT JOIN mission_completions mc ON m.id = mc.mission_id
      LEFT JOIN mission_ratings mr ON m.id = mr.mission_id
      GROUP BY m.id
      ORDER BY m.difficulty, m.title"]))

(defn get-mission-by-id [id]
  (first (jdbc/query db-spec
    ["SELECT m.*,
             COUNT(DISTINCT c.id) as comment_count,
             COUNT(DISTINCT mc.id) as completion_count,
             COUNT(DISTINCT CASE WHEN mr.rating = 'up' THEN mr.id END) as thumbs_up,
             COUNT(DISTINCT CASE WHEN mr.rating = 'down' THEN mr.id END) as thumbs_down
      FROM missions m
      LEFT JOIN comments c ON m.id = c.mission_id
      LEFT JOIN mission_completions mc ON m.id = mc.mission_id
      LEFT JOIN mission_ratings mr ON m.id = mr.mission_id
      WHERE m.id = ?
      GROUP BY m.id" id])))

(defn create-mission! [mission-data]
  (let [result (jdbc/insert! db-spec :missions 
                 (assoc mission-data :created_at (coerce/to-timestamp (time/now))))
        new-id (-> result first :generated_key)]
    (get-mission-by-id new-id)))

(defn update-mission! [id mission-data]
  (jdbc/update! db-spec :missions 
    (assoc mission-data :updated_at (coerce/to-timestamp (time/now)))
    ["id = ?" id])
  (get-mission-by-id id))

(defn delete-mission! [id]
  (jdbc/delete! db-spec :missions ["id = ?" id]))

;; Comment operations
(defn get-comments-for-mission [mission-id]
  (jdbc/query db-spec
    ["SELECT * FROM comments WHERE mission_id = ? ORDER BY created_at DESC" mission-id]))

(defn add-comment! [mission-id comment-data]
  (jdbc/insert! db-spec :comments
    (assoc comment-data 
           :mission_id mission-id
           :created_at (coerce/to-timestamp (time/now)))))

;; Rating operations (thumbs up/down)
(defn add-or-update-rating! [mission-id rating-data]
  (let [existing (first (jdbc/query db-spec
                          ["SELECT id FROM mission_ratings WHERE mission_id = ? AND pilot_name = ?" 
                           mission-id (:pilot_name rating-data)]))]
    (if existing
      (jdbc/update! db-spec :mission_ratings 
        {:rating (:rating rating-data)}
        ["id = ?" (:id existing)])
      (jdbc/insert! db-spec :mission_ratings
        (assoc rating-data 
               :mission_id mission-id
               :created_at (coerce/to-timestamp (time/now)))))))

(defn get-user-rating [mission-id pilot-name]
  (first (jdbc/query db-spec
    ["SELECT rating FROM mission_ratings WHERE mission_id = ? AND pilot_name = ?" 
     mission-id pilot-name])))

;; Review operations
(defn get-reviews-for-mission [mission-id]
  (jdbc/query db-spec
    ["SELECT * FROM reviews WHERE mission_id = ? ORDER BY created_at DESC" mission-id]))

(defn add-review! [mission-id review-data]
  (jdbc/insert! db-spec :reviews
    (assoc review-data 
           :mission_id mission-id
           :created_at (coerce/to-timestamp (time/now)))))

;; Completion tracking
(defn get-completions-for-mission [mission-id]
  (jdbc/query db-spec
    ["SELECT * FROM mission_completions WHERE mission_id = ? ORDER BY created_at DESC" mission-id]))

(defn mark-mission-completed! [mission-id completion-data]
  (jdbc/insert! db-spec :mission_completions
    (assoc completion-data 
           :mission_id mission-id
           :created_at (coerce/to-timestamp (time/now)))))

;; Submission operations
(defn get-all-submissions []
  (jdbc/query db-spec
    ["SELECT * FROM submissions ORDER BY created_at DESC"]))

(defn create-submission! [submission-data]
  (jdbc/insert! db-spec :submissions
    (assoc submission-data :created_at (coerce/to-timestamp (time/now)))))

(defn approve-submission! [id]
  (let [submission (first (jdbc/query db-spec ["SELECT * FROM submissions WHERE id = ?" id]))]
    (when submission
      ;; Create mission from submission
      (create-mission! (select-keys submission [:title :category :difficulty :objective 
                                                :mission_description :why_description :notes :route]))
      ;; Update submission status
      (jdbc/update! db-spec :submissions 
        {:status "approved" :reviewed_at (coerce/to-timestamp (time/now))}
        ["id = ?" id]))))

(defn reject-submission! [id admin-notes]
  (jdbc/update! db-spec :submissions 
    {:status "rejected" 
     :admin_notes admin-notes
     :reviewed_at (coerce/to-timestamp (time/now))}
    ["id = ?" id]))

;; Mission update operations
(defn create-mission-update! [mission-id update-data]
  (jdbc/insert! db-spec :mission_updates
    (assoc update-data 
           :mission_id mission-id
           :created_at (coerce/to-timestamp (time/now)))))

(defn get-all-mission-updates []
  (jdbc/query db-spec
    ["SELECT mu.*, m.title as original_title 
      FROM mission_updates mu 
      JOIN missions m ON mu.mission_id = m.id 
      ORDER BY mu.created_at DESC"]))

(defn approve-mission-update! [id]
  (let [update (first (jdbc/query db-spec ["SELECT * FROM mission_updates WHERE id = ?" id]))]
    (when update
      ;; Apply the update to the original mission
      (jdbc/update! db-spec :missions
        (select-keys update [:title :category :difficulty :objective 
                            :mission_description :why_description :notes :route])
        ["id = ?" (:mission_id update)])
      ;; Mark update as approved
      (jdbc/update! db-spec :mission_updates 
        {:status "approved" :reviewed_at (coerce/to-timestamp (time/now))}
        ["id = ?" id]))))

(defn reject-mission-update! [id admin-notes]
  (jdbc/update! db-spec :mission_updates 
    {:status "rejected" 
     :admin_notes admin-notes
     :reviewed_at (coerce/to-timestamp (time/now))}
    ["id = ?" id]))

;; Admin session management
(defn create-admin-session! [admin-name]
  (let [token (str (java.util.UUID/randomUUID))
        expires-at (coerce/to-timestamp (.plusHours (time/now) 8))] ; 8 hour session
    (jdbc/insert! db-spec :admin_sessions
      {:session_token token
       :admin_name admin-name
       :created_at (coerce/to-timestamp (time/now))
       :expires_at expires-at})
    token))

(defn validate-admin-session [token]
  (first (jdbc/query db-spec
    ["SELECT admin_name FROM admin_sessions 
      WHERE session_token = ? AND expires_at > CURRENT_TIMESTAMP" token])))
