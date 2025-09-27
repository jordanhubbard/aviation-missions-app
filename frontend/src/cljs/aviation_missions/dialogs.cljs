(ns aviation-missions.dialogs
  (:require [aviation-missions.theme :refer [current-colors]]
            [aviation-missions.state :as state]
            [aviation-missions.api :as api]))

(defn mission-brief-dialog []
  (let [mission (state/get-selected-mission)
        colors (current-colors)]
    [:div.modal {:class (when (state/is-mission-brief-open?) "modal-open")}
     [:div.modal-backdrop {:on-click #(state/set-mission-brief-open! false)}]
     [:div.modal-content {:style {:max-width "800px" :background-color (:bg-secondary colors) :color (:text-secondary colors) :border (str "1px solid " (:separator colors)) :border-radius "8px"}}
      [:div.modal-header {:style {:background-color (:bg-tertiary colors) :border-bottom (str "1px solid " (:separator colors)) :border-radius "8px 8px 0 0"}}
       [:h2 {:style {:color (:text-primary colors)}} (str "📋 Mission Brief: " (:title mission))]
       [:button.modal-close {:style {:color (:text-primary colors)} :on-click #(state/set-mission-brief-open! false)} "×"]]
      [:div.modal-body {:style {:padding "20px"}}
       [:div.brief-section
        [:h3 {:style {:color (:accent-blue colors) :margin-bottom "10px"}} "Mission Overview"]
        [:div {:style {:background-color (:bg-quaternary colors) :padding "15px" :border-radius "6px" :margin-bottom "15px" :border (str "1px solid " (:separator colors))}}
         [:p {:style {:margin "0 0 10px 0" :color (:text-primary colors)}} [:strong {:style {:color (:accent-green colors)}} "Objective: "] (:objective mission)]
         [:p {:style {:margin "0 0 10px 0" :color (:text-primary colors)}} [:strong {:style {:color (:accent-orange colors)}} "Difficulty: "] (str (:difficulty mission) "/10")]
         [:p {:style {:margin "0" :color (:text-primary colors)}} [:strong {:style {:color (:accent-purple colors)}} "Experience Level: "] (:pilot_experience mission)]]]

       [:div.brief-section
        [:h3 {:style {:color (:accent-green colors) :margin-bottom "10px"}} "Mission Description"]
        [:div {:style {:background-color (:bg-quaternary colors) :padding "15px" :border-radius "6px" :margin-bottom "15px" :border (str "1px solid " (:separator colors))}}
         [:p {:style {:margin "0" :line-height "1.5" :color (:text-primary colors)}} (:mission_description mission)]]]

       (when (:why_description mission)
         [:div.brief-section
          [:h3 {:style {:color (:accent-orange colors) :margin-bottom "10px"}} "Why This Mission"]
          [:div {:style {:background-color (:bg-quaternary colors) :padding "15px" :border-radius "6px" :margin-bottom "15px" :border (str "1px solid " (:separator colors))}}
           [:p {:style {:margin "0" :line-height "1.5" :color (:text-primary colors)}} (:why_description mission)]]])

       (when (:route mission)
         [:div.brief-section
          [:h3 {:style {:color (:accent-red colors) :margin-bottom "10px"}} "Route Information"]
          [:div {:style {:background-color (:bg-quaternary colors) :padding "15px" :border-radius "6px" :margin-bottom "15px" :border (str "1px solid " (:separator colors))}}
           [:p {:style {:margin "0 0 10px 0" :color (:text-primary colors)}} [:strong "Route: "] (:route mission)]
           (when (:suggested_route mission)
             [:p {:style {:margin "0" :color (:text-primary colors)}} [:strong "Suggested Route: "] (:suggested_route mission)])]])

       (when (:notes mission)
         [:div.brief-section
          [:h3 {:style {:color (:accent-purple colors) :margin-bottom "10px"}} "Additional Notes"]
          [:div {:style {:background-color (:bg-quaternary colors) :padding "15px" :border-radius "6px" :border (str "1px solid " (:separator colors))}}
           [:p {:style {:margin "0" :line-height "1.5" :color (:text-primary colors)}} (:notes mission)]]])]

      [:div.modal-footer {:style {:background-color (:bg-tertiary colors) :border-top (str "1px solid " (:separator colors)) :border-radius "0 0 8px 8px"}}
       [:button.btn.btn-secondary {:style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors))} :on-click #(state/set-mission-brief-open! false)} "Close Brief"]
       [:button.btn.btn-primary {:style {:background-color (:accent-blue colors) :color (:bg-primary colors) :border (str "2px solid " (:accent-blue colors))} :on-click #(do (api/complete-mission (:id mission)) (state/set-mission-brief-open! false))} "Mark Complete"]]]]))

(defn mission-rate-dialog []
  (let [mission (state/get-selected-mission)
        colors (current-colors)]
    [:div.modal {:class (when (state/is-mission-rate-open?) "modal-open")}
     [:div.modal-backdrop {:on-click #(state/set-mission-rate-open! false)}]
     [:div.modal-content {:style {:max-width "600px" :background-color (:bg-secondary colors) :color (:text-secondary colors) :border (str "1px solid " (:separator colors)) :border-radius "8px"}}
      [:div.modal-header {:style {:background-color (:bg-tertiary colors) :border-bottom (str "1px solid " (:separator colors)) :border-radius "8px 8px 0 0"}}
       [:h2 {:style {:color (:text-primary colors)}} (str "⭐ Rate Mission: " (:title mission))]
       [:button.modal-close {:style {:color (:text-primary colors)} :on-click #(state/set-mission-rate-open! false)} "×"]]
      [:div.modal-body {:style {:padding "20px" :text-align "center"}}
       [:p {:style {:margin-bottom "20px" :color (:text-primary colors)}} "How would you rate this mission?"]
       [:div.rating-buttons {:style {:display "flex" :justify-content "center" :gap "10px" :margin-bottom "20px"}}
        (for [i (range 1 6)]
          [:button.rating-btn {:key i
                              :style {:padding "10px 15px"
                                     :background-color (if (= i (:mission-complete-rating @state/app-state)) (:accent-blue colors) (:bg-quaternary colors))
                                     :color (:text-primary colors)
                                     :border (str "2px solid " (:separator colors))
                                     :border-radius "6px"
                                     :cursor "pointer"}
                              :on-click #(swap! state/app-state assoc :mission-complete-rating i)}
           (str i "⭐")])]]
      [:div.modal-footer {:style {:background-color (:bg-tertiary colors) :border-top (str "1px solid " (:separator colors)) :border-radius "0 0 8px 8px"}}
       [:button.btn.btn-secondary {:style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors))} :on-click #(state/set-mission-rate-open! false)} "Cancel"]
       [:button.btn.btn-primary {:style {:background-color (:accent-blue colors) :color (:bg-primary colors) :border (str "2px solid " (:accent-blue colors))}
                                :disabled (not (:mission-complete-rating @state/app-state))
                                :on-click #(do (api/rate-mission (:id mission) (:mission-complete-rating @state/app-state))
                                              (swap! state/app-state assoc :mission-complete-rating nil)
                                              (state/set-mission-rate-open! false))} "Submit Rating"]]]))