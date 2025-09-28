(ns aviation-missions.components
  (:require [clojure.string :as str]
            [aviation-missions.theme :refer [current-colors]]
            [aviation-missions.state :as state]
            [aviation-missions.utils :refer [analyze-mission-challenges]]
            [aviation-missions.api :as api]))

(def mission-field-config
  "Configuration for mission fields with display properties - dark theme"
  [{:key :objective :label "OBJECTIVE" :color "#81c784" :required true}
   {:key :route :label "ROUTE" :color "#64b5f6" :required false}
   {:key :suggested_route :label "SUGGESTED ROUTE" :color "#ba68c8" :required false}
   {:key :notes :label "NOTES" :color "#ffb74d" :required false}
   {:key :special_challenges :label "SPECIAL CHALLENGES" :color "#e57373" :required false}])

(defn render-mission-field [mission field-config]
  "Render a mission field only if it has content as a table row"
  (let [colors (current-colors)
        {:keys [key label color required]} field-config
        value (get mission key)]
    (when (and value (not (str/blank? (str value))))
      [:tr.mission-field {:key (name key)}
       [:td.mission-data-label {:style {:color color :font-weight "bold" :padding "6px 8px 6px 8px" :vertical-align "top" :white-space "nowrap"}} (str label ":")]
       [:td.mission-data-value {:style {:color (:text-primary colors) :padding "6px 8px" :word-wrap "break-word"}} value]])))

(defn mission-card [mission]
  (let [colors (current-colors)
        challenges (analyze-mission-challenges mission)
        difficulty (:difficulty mission)]
    [:div.mission-card {:style {:background-color (:bg-secondary colors) :border (str "1px solid " (:separator colors)) :border-radius "8px" :color (:text-secondary colors)}}
     [:div.mission-header {:style {:background-color (:bg-tertiary colors) :padding "12px" :border-radius "8px 8px 0 0" :border-bottom (str "1px solid " (:separator colors))}}
      [:div.mission-title {:style {:color (:text-primary colors) :font-size "1.1rem" :font-weight "bold" :margin-bottom "8px"}} (:title mission)]
      [:div.mission-meta {:style {:display "flex" :gap "8px" :flex-wrap "wrap"}}
       [:span.category-badge {:style {:background-color (:accent-blue colors) :color (:bg-primary colors) :padding "4px 8px" :border-radius "6px" :font-size "0.8rem" :font-weight "bold" :border (str "1px solid " (:separator colors))}} (:category mission)]
       [:span.difficulty-badge {:style {:background-color (cond
                                                             (<= difficulty 3) (:accent-green colors)
                                                             (<= difficulty 6) (:accent-orange colors)
                                                             :else (:accent-red colors))
                                         :color (:bg-primary colors) :padding "4px 8px" :border-radius "6px" :font-size "0.8rem" :font-weight "bold" :border (str "1px solid " (:separator colors))}}
        (str "DIFF: " difficulty "/10")]
       [:span.experience-badge {:style {:background-color (:accent-purple colors) :color (:bg-primary colors) :padding "4px 8px" :border-radius "6px" :font-size "0.8rem" :font-weight "bold" :border (str "1px solid " (:separator colors))}} (str "EXP: " (:pilot_experience mission))]]]

     [:div.mission-content {:style {:padding "12px"}}
      [:table.mission-data-table {:style {:width "100%" :border-collapse "collapse" :margin "8px 0" :background-color (:bg-primary colors) :border (str "1px solid " (:separator colors)) :border-radius "4px"}}
       [:tbody
        (for [field-config mission-field-config]
          ^{:key (:key field-config)}
          [render-mission-field mission field-config])]]

      [:div.mission-section
       [:h4 {:style {:color (:accent-blue colors) :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "DESCRIPTION"]
       [:p {:style {:color (:text-primary colors) :line-height "1.4" :margin "0" :border-left (str "3px solid " (:accent-blue colors)) :padding "8px" :border-radius "4px" :background-color (:bg-primary colors) :border (str "1px solid " (:separator colors))}}
        (:mission_description mission)]]

      (when (:why_description mission)
        [:div.mission-section
         [:h4 {:style {:color (:accent-green colors) :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "WHY THIS MISSION"]
         [:p {:style {:color (:text-primary colors) :line-height "1.4" :margin "0" :border-left (str "3px solid " (:accent-green colors)) :padding "8px" :border-radius "4px" :background-color (:bg-primary colors) :border (str "1px solid " (:separator colors))}}
          (:why_description mission)]])

      (when (seq challenges)
        [:div.challenges-section
         [:h4 {:style {:color (:accent-orange colors) :margin "12px 0 6px 0" :font-size "0.85rem" :font-weight "bold"}} "FLIGHT CHALLENGES"]
         [:div.challenges-grid {:style {:display "flex" :flex-wrap "wrap" :gap "8px" :margin-top "8px"}}
          (for [challenge challenges]
            ^{:key (:label challenge)}
            [:div.challenge-item {:style {:background-color (:accent-orange colors) :border (str "1px solid " (:separator colors)) :color (:bg-primary colors) :padding "6px 10px" :border-radius "6px" :display "flex" :align-items "center" :gap "6px" :font-weight "bold"}}
             [:span.challenge-icon (:icon challenge)]
             [:span.challenge-label (:label challenge)]])]])]

     [:div.mission-footer {:style {:background-color (:bg-tertiary colors) :padding "12px" :border-radius "0 0 8px 8px" :border-top (str "1px solid " (:separator colors)) :display "flex" :justify-content "space-between" :align-items "center"}}
      [:div.pilot-experience {:style {:color (:accent-purple colors) :font-weight "bold" :font-size "0.85rem"}}
       (str "PILOT LEVEL: " (:pilot_experience mission))]
      [:div.mission-actions {:style {:display "flex" :gap "8px"}}
       [:button.btn-mission.primary
        {:style {:background-color (:accent-blue colors) :color (:bg-primary colors) :border (str "2px solid " (:accent-blue colors)) :padding "6px 12px" :border-radius "6px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}
         :on-click #(do (state/set-selected-mission! mission) (state/set-mission-brief-open! true))}
        "📋 BRIEF"]
       [:button.btn-mission
        {:style {:background-color (:accent-green colors) :color (:bg-primary colors) :border (str "2px solid " (:accent-green colors)) :padding "6px 12px" :border-radius "6px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}
         :on-click #(api/complete-mission (:id mission))}
        "✅ COMPLETE"]
       [:button.btn-mission
        {:style {:background-color (:accent-purple colors) :color (:bg-primary colors) :border (str "2px solid " (:accent-purple colors)) :padding "6px 12px" :border-radius "6px" :font-size "0.8rem" :font-weight "bold" :cursor "pointer"}
         :on-click #(do (state/set-selected-mission! mission) (state/set-mission-rate-open! true) (swap! state/app-state assoc :user-rating 0))}
        "⭐ RATE"]]]]))