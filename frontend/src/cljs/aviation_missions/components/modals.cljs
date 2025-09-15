(ns aviation-missions.components.modals
  (:require
   [re-frame.core :as rf]))

(defn submit-mission-modal []
  (let [show-modal @(rf/subscribe [:show-submit-modal])
        form-data @(rf/subscribe [:form-data])]
    (when show-modal
      [:div.modal-overlay
       {:on-click #(rf/dispatch [:hide-modal :show-submit-modal])}
       [:div.modal-content
        {:on-click #(.stopPropagation %)}
        [:div.modal-header
         [:h2 "Submit New Mission"]
         [:button.close-btn
          {:on-click #(rf/dispatch [:hide-modal :show-submit-modal])}
          "×"]]
        
        [:form
         {:on-submit (fn [e]
                       (.preventDefault e)
                       (rf/dispatch [:submit-mission form-data]))}
         
         [:div.form-group
          [:label "Title:"]
          [:input {:type "text"
                   :value (or (:title form-data) "")
                   :on-change #(rf/dispatch [:update-form-data :title (.. % -target -value)])
                   :required true}]]
         
         [:div.form-group
          [:label "Category:"]
          [:select {:value (or (:category form-data) "")
                    :on-change #(rf/dispatch [:update-form-data :category (.. % -target -value)])
                    :required true}
           [:option {:value ""} "Select Category"]
           [:option {:value "Airspace Operations"} "Airspace Operations"]
           [:option {:value "Terrain & Environment"} "Terrain & Environment"]
           [:option {:value "Weather & Atmospheric"} "Weather & Atmospheric"]
           [:option {:value "Navigation & Diversions"} "Navigation & Diversions"]
           [:option {:value "Airport Operations"} "Airport Operations"]
           [:option {:value "Endurance & Planning"} "Endurance & Planning"]
           [:option {:value "Advanced Adventures"} "Advanced Adventures"]
           [:option {:value "General Training"} "General Training"]]]
         
         [:div.form-group
          [:label "Difficulty (1-10):"]
          [:input {:type "number"
                   :min 1
                   :max 10
                   :value (or (:difficulty form-data) 5)
                   :on-change #(rf/dispatch [:update-form-data :difficulty (js/parseInt (.. % -target -value))])}]]
         
         [:div.form-group
          [:label "Objective:"]
          [:textarea {:value (or (:objective form-data) "")
                      :on-change #(rf/dispatch [:update-form-data :objective (.. % -target -value)])
                      :required true}]]
         
         [:div.form-group
          [:label "Mission Description:"]
          [:textarea {:value (or (:mission_description form-data) "")
                      :on-change #(rf/dispatch [:update-form-data :mission_description (.. % -target -value)])
                      :required true}]]
         
         [:div.form-group
          [:label "Why This Mission:"]
          [:textarea {:value (or (:why_description form-data) "")
                      :on-change #(rf/dispatch [:update-form-data :why_description (.. % -target -value)])
                      :required true}]]
         
         [:div.form-group
          [:label "Pilot Experience:"]
          [:select {:value (or (:pilot_experience form-data) "Beginner (< 100 hours)")
                    :on-change #(rf/dispatch [:update-form-data :pilot_experience (.. % -target -value)])}
           [:option {:value "Beginner (< 100 hours)"} "Beginner (< 100 hours)"]
           [:option {:value "Intermediate (500 - 1000 hours)"} "Intermediate (500 - 1000 hours)"]
           [:option {:value "Advanced (1000+ hours)"} "Advanced (1000+ hours)"]]]
         
         [:div.form-group
          [:label "Your Name:"]
          [:input {:type "text"
                   :value (or (:submitter_name form-data) "")
                   :on-change #(rf/dispatch [:update-form-data :submitter_name (.. % -target -value)])
                   :required true}]]
         
         [:div.form-group
          [:label "Your Email (optional):"]
          [:input {:type "email"
                   :value (or (:submitter_email form-data) "")
                   :on-change #(rf/dispatch [:update-form-data :submitter_email (.. % -target -value)])}]]
         
         [:div.form-actions
          [:button.btn.btn-primary {:type "submit"} "Submit Mission"]
          [:button.btn.btn-secondary 
           {:type "button" 
            :on-click #(rf/dispatch [:hide-modal :show-submit-modal])} 
           "Cancel"]]]]])))

(defn comment-modal []
  (let [show-modal @(rf/subscribe [:show-comment-modal])
        route-params @(rf/subscribe [:route-params])
        mission-id (:id route-params)]
    (when show-modal
      [:div.modal-overlay
       {:on-click #(rf/dispatch [:hide-modal :show-comment-modal])}
       [:div.modal-content
        {:on-click #(.stopPropagation %)}
        [:div.modal-header
         [:h2 "Add Comment"]
         [:button.close-btn
          {:on-click #(rf/dispatch [:hide-modal :show-comment-modal])}
          "×"]]
        
        [:form
         {:on-submit (fn [e]
                       (.preventDefault e)
                       (let [form-data (js/FormData. (.-target e))
                             author-name (.get form-data "author_name")
                             content (.get form-data "content")]
                         (rf/dispatch [:add-comment mission-id {:author_name author-name :content content}])))}
         
         [:div.form-group
          [:label "Your Name:"]
          [:input {:type "text" :name "author_name" :required true}]]
         
         [:div.form-group
          [:label "Comment:"]
          [:textarea {:name "content" :required true}]]
         
         [:div.form-actions
          [:button.btn.btn-primary {:type "submit"} "Add Comment"]
          [:button.btn.btn-secondary 
           {:type "button" 
            :on-click #(rf/dispatch [:hide-modal :show-comment-modal])} 
           "Cancel"]]]]])))

(defn completion-modal []
  (let [show-modal @(rf/subscribe [:show-completion-modal])
        route-params @(rf/subscribe [:route-params])
        mission-id (:id route-params)]
    (when show-modal
      [:div.modal-overlay
       {:on-click #(rf/dispatch [:hide-modal :show-completion-modal])}
       [:div.modal-content
        {:on-click #(.stopPropagation %)}
        [:div.modal-header
         [:h2 "Mark Mission Complete"]
         [:button.close-btn
          {:on-click #(rf/dispatch [:hide-modal :show-completion-modal])}
          "×"]]
        
        [:form
         {:on-submit (fn [e]
                       (.preventDefault e)
                       (let [form-data (js/FormData. (.-target e))
                             pilot-name (.get form-data "pilot_name")
                             notes (.get form-data "notes")]
                         (rf/dispatch [:mark-complete mission-id {:pilot_name pilot-name :notes notes}])))}
         
         [:div.form-group
          [:label "Your Name:"]
          [:input {:type "text" :name "pilot_name" :required true}]]
         
         [:div.form-group
          [:label "Notes (optional):"]
          [:textarea {:name "notes"}]]
         
         [:div.form-actions
          [:button.btn.btn-success {:type "submit"} "Mark Complete"]
          [:button.btn.btn-secondary 
           {:type "button" 
            :on-click #(rf/dispatch [:hide-modal :show-completion-modal])} 
           "Cancel"]]]]])))

(defn review-modal []
  (let [show-modal @(rf/subscribe [:show-review-modal])
        route-params @(rf/subscribe [:route-params])
        mission-id (:id route-params)]
    (when show-modal
      [:div.modal-overlay
       {:on-click #(rf/dispatch [:hide-modal :show-review-modal])}
       [:div.modal-content
        {:on-click #(.stopPropagation %)}
        [:div.modal-header
         [:h2 "Review Mission"]
         [:button.close-btn
          {:on-click #(rf/dispatch [:hide-modal :show-review-modal])}
          "×"]]
        
        [:form
         {:on-submit (fn [e]
                       (.preventDefault e)
                       (let [form-data (js/FormData. (.-target e))
                             pilot-name (.get form-data "pilot_name")
                             rating (js/parseInt (.get form-data "rating"))
                             review-text (.get form-data "review_text")]
                         (rf/dispatch [:add-review mission-id {:pilot_name pilot-name :rating rating :review_text review-text}])))}
         
         [:div.form-group
          [:label "Your Name:"]
          [:input {:type "text" :name "pilot_name" :required true}]]
         
         [:div.form-group
          [:label "Rating (1-5):"]
          [:select {:name "rating" :required true}
           [:option {:value ""} "Select Rating"]
           [:option {:value "1"} "1 - Poor"]
           [:option {:value "2"} "2 - Fair"]
           [:option {:value "3"} "3 - Good"]
           [:option {:value "4"} "4 - Very Good"]
           [:option {:value "5"} "5 - Excellent"]]]
         
         [:div.form-group
          [:label "Review (optional):"]
          [:textarea {:name "review_text"}]]
         
         [:div.form-actions
          [:button.btn.btn-info {:type "submit"} "Submit Review"]
          [:button.btn.btn-secondary 
           {:type "button" 
            :on-click #(rf/dispatch [:hide-modal :show-review-modal])} 
           "Cancel"]]]]]))))
