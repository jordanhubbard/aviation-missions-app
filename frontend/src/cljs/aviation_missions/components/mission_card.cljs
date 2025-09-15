(ns aviation-missions.components.mission-card
  (:require
   [re-frame.core :as rf]))

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

(defn mission-card [mission]
  [:div.mission-card
   {:on-click #(rf/dispatch [:set-active-page :mission-detail {:id (:id mission)}])}
   
   [:div.mission-header
    [:h3.mission-title (:title mission)]
    [:div.mission-meta
     [:span.category-badge (:category mission)]
     [:span.difficulty-badge
      {:style {:background-color (get-difficulty-color (:difficulty mission))}}
      (str "Difficulty: " (:difficulty mission))]]]
   
   [:div.mission-content
    [:div.mission-section
     [:h4 "Objective"]
     [:p (:objective mission)]]
    
    [:div.mission-section
     [:h4 "Description"]
     [:p.scrollable-content (:mission_description mission)]]
    
    (when (:why_description mission)
      [:div.mission-section
       [:h4 "Why This Mission"]
       [:p.scrollable-content (:why_description mission)]])
    
    (when (:notes mission)
      [:div.mission-section
       [:h4 "Notes"]
       [:p.scrollable-content (:notes mission)]])
    
    (when (:route mission)
      [:div.mission-section
       [:h4 "Route"]
       [:p (:route mission)]])]
   
   [:div.mission-footer
    [:div.pilot-experience
     [:span.experience-badge
      {:style {:background-color (get-pilot-experience-color (:pilot_experience mission))}}
      (:pilot_experience mission)]]
    
    [:div.mission-stats
     [:div.stat-item
      {:on-click (fn [e]
                   (.stopPropagation e)
                   (rf/dispatch [:set-active-page :mission-detail {:id (:id mission)}])
                   (rf/dispatch [:show-modal :show-comment-modal]))}
      [:span.stat-icon "💬"]
      [:span.stat-label "Comments"]
      [:span.stat-count "0"]]
     
     [:div.stat-item
      {:on-click (fn [e]
                   (.stopPropagation e)
                   (rf/dispatch [:set-active-page :mission-detail {:id (:id mission)}])
                   (rf/dispatch [:show-modal :show-completion-modal]))}
      [:span.stat-icon "✅"]
      [:span.stat-label "Completed"]
      [:span.stat-count "0"]]
     
     [:div.stat-item
      {:on-click (fn [e]
                   (.stopPropagation e)
                   (rf/dispatch [:set-active-page :mission-detail {:id (:id mission)}])
                   (rf/dispatch [:show-modal :show-review-modal]))}
      [:span.stat-icon "👍"]
      [:span.stat-label "Likes"]
      [:span.stat-count "0"]]
     
     [:div.stat-item
      {:on-click (fn [e]
                   (.stopPropagation e)
                   (rf/dispatch [:set-active-page :mission-detail {:id (:id mission)}])
                   (rf/dispatch [:show-modal :show-review-modal]))}
      [:span.stat-icon "👎"]
      [:span.stat-label "Dislikes"]
      [:span.stat-count "0"]]]]])
