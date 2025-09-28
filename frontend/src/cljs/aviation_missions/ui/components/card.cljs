(ns aviation-missions.ui.components.card
  "Aviation-themed card components with comprehensive mission display."
  (:require [aviation-missions.config.colors :refer [colors]]
            [clojure.string :as str]))

(defn card
  "Base card component with optional header and footer"
  [{:keys [header footer children class]}]
  [:div {:class class
         :style {:background-color (:background colors)
                 :border (str "1px solid " (:border colors))
                 :border-radius "8px"
                 :box-shadow "0 1px 3px rgba(0, 0, 0, 0.1)"
                 :overflow "hidden"}}
   (when header
     [:div {:style {:padding "1rem 1.5rem"
                    :border-bottom (str "1px solid " (:border colors))
                    :background-color (:surface colors)}}
      header])
   [:div {:style {:padding "1.5rem"}}
    children]
   (when footer
     [:div {:style {:padding "1rem 1.5rem"
                    :border-top (str "1px solid " (:border colors))
                    :background-color (:surface colors)}}
      footer])])

(defn analyze-mission-challenges
  "Analyze mission data to determine applicable challenges"
  [mission]
  (let [description (str/lower-case (str (:mission_description mission) " " (:notes mission) " " (:objective mission)))
        route (str/lower-case (or (:route mission) ""))
        title (str/lower-case (:title mission))
        category (str/lower-case (or (:category mission) ""))
        all-text (str description " " route " " title " " category)]
    (cond-> #{}
      ;; High DA challenges
      (or (str/includes? all-text "density altitude")
          (str/includes? all-text "high altitude")
          (str/includes? all-text "mountain")
          (str/includes? all-text "sierra")
          (str/includes? all-text "truckee")
          (str/includes? all-text "tahoe"))
      (conj :high-da)

      ;; Mountain Flying
      (or (and (str/includes? all-text "mountain")
               (or (str/includes? all-text "flying")
                   (str/includes? all-text "terrain")))
          (str/includes? all-text "sierra"))
      (conj :mountain-flying)

      ;; Complex Airspace
      (or (str/includes? all-text "class b")
          (str/includes? all-text "class c")
          (str/includes? all-text "bravo")
          (str/includes? all-text "charlie")
          (str/includes? all-text "clearance")
          (str/includes? all-text "atc"))
      (conj :complex-airspace)

      ;; Short Runway
      (or (str/includes? all-text "short")
          (str/includes? all-text "0q5")
          (str/includes? all-text "shelter cove"))
      (conj :short-runway)

      ;; Soft Field
      (or (str/includes? all-text "soft field")
          (str/includes? all-text "grass")
          (str/includes? all-text "dirt"))
      (conj :soft-field)

      ;; Obstacles
      (or (str/includes? all-text "obstacle")
          (str/includes? all-text "terrain")
          (str/includes? all-text "wake turbulence"))
      (conj :obstacles)

      ;; Time Restrictions
      (or (str/includes? all-text "time")
          (str/includes? all-text "morning departure")
          (str/includes? all-text "afternoon")
          (str/includes? all-text "busy"))
      (conj :time-restrictions))))

(defn challenges-table
  "Display challenges as a compact table"
  [challenges]
  (when (seq challenges)
    (let [challenge-definitions {:short-runway "Short Runway"
                                :narrow-runway "Narrow Runway"
                                :high-da "High DA"
                                :mountain-flying "Mountain Flying"
                                :time-restrictions "Time Restrictions"
                                :soft-field "Soft Field"
                                :obstacles "Obstacles within 1 mile"
                                :complex-airspace "Complex Airspace"}]
      [:div {:class "challenges-section"}
       [:h4 "FLIGHT CHALLENGES"]
       [:div {:class "challenges-grid"}
        (for [challenge-key (sort challenges)]
          ^{:key challenge-key}
          [:div {:class "challenge-item"}
           [:span {:class "challenge-icon"} "⚠"]
           [:span {:class "challenge-label"} (get challenge-definitions challenge-key)]])]])))

(defn mission-card
  "Aviation-themed mission card with comprehensive functionality"
  [{:keys [mission on-click on-edit on-delete]}]
  (let [{:keys [id title description category difficulty pilot_experience route objective mission_description notes special_challenges created_at]} mission
        difficulty-level (or difficulty 1)
        category-name (or category "General")
        experience-level (or pilot_experience "Student Pilot")
        challenges (analyze-mission-challenges mission)]

    [:div {:class "mission-card"
           :on-click (when on-click #(on-click mission))}

     ;; Mission Header
     [:div {:class "mission-header"}
      [:h3 {:class "mission-title"} title]
      [:div {:class "mission-meta"}
       [:span {:class "category-badge"} category-name]
       [:span {:class (str "difficulty-badge badge-difficulty-" difficulty-level)}
        (case difficulty-level
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
       [:span {:class "experience-badge"}
        (cond
          (str/includes? (str/lower-case (str experience-level)) "beginner") "STUDENT"
          (str/includes? (str/lower-case (str experience-level)) "intermediate") "PRIVATE"
          (str/includes? (str/lower-case (str experience-level)) "advanced") "COMMERCIAL"
          :else "STUDENT")]]]

     ;; Mission Content
     [:div {:class "mission-content"}
      [:div {:class "mission-data-grid"}
       [:span {:class "mission-data-label"} "ROUTE:"]
       [:span {:class "mission-data-value"} (or route "See description")]

       [:span {:class "mission-data-label"} "OBJECTIVE:"]
       [:span {:class "mission-data-value"} (or objective description)]

       [:span {:class "mission-data-label"} "DESCRIPTION:"]
       [:span {:class "mission-data-value"} (or mission_description description)]]

      ;; Flight Challenges Section
      [challenges-table challenges]

      ;; Notes Section
      (when (and notes (not-empty notes))
        [:div {:class "mission-section"}
         [:h4 "Notes"]
         [:p notes]])

      ;; Special Challenges Section
      (when (and special_challenges (not-empty special_challenges))
        [:div {:class "mission-section"}
         [:h4 "Special Challenges"]
         [:p special_challenges]])]

     ;; Mission Footer
     [:div {:class "mission-footer"}
      [:div {:class "pilot-experience"}
       (str "MIN EXP: " experience-level)]

      [:div {:class "mission-stats"}
       [:div {:class "stat-item"}
        [:span {:class "stat-icon"} "💬"]
        [:span {:class "stat-count"} (or (:comment_count mission) 0)]
        [:span {:class "stat-label"} "Comments"]]

       [:div {:class "stat-item"}
        [:span {:class "stat-icon"} "✓"]
        [:span {:class "stat-count"} (or (:completion_count mission) 0)]
        [:span {:class "stat-label"} "Completed"]]

       (when on-click
         [:button {:class "btn-mission primary"
                   :on-click #(do (.stopPropagation %) (on-click mission))}
          "BRIEF"])]]]))