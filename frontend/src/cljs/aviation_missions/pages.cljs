(ns aviation-missions.pages
  (:require [aviation-missions.theme :refer [current-colors toggle-theme]]
            [aviation-missions.state :as state]
            [aviation-missions.utils :refer [update-filtered-missions]]
            [aviation-missions.api :as api]
            [aviation-missions.components :refer [mission-card]]))

(def category-options
  ["All Categories"
   "Airspace Operations"
   "Terrain & Environment"
   "Weather & Atmospheric"
   "Navigation & Diversions"
   "Airport Operations"
   "Endurance & Planning"
   "Advanced Adventures"
   "General Training"])

(def difficulty-options
  ["All Difficulties"
   "1-2 (Beginner)"
   "3-4 (Easy)"
   "5-6 (Moderate)"
   "7-8 (Hard)"
   "9-10 (Expert)"])

(def experience-options
  ["All Experience Levels"
   "Beginner (< 100 hours)"
   "Intermediate (100-500 hours)"
   "Advanced (500+ hours)"
   "Commercial/ATP"])

(defn filter-dropdown [label options current-value filter-key]
  (let [colors (current-colors)]
    [:div.filter-dropdown {:style {:display "flex" :flex-direction "column" :gap "4px"}}
     [:label {:style {:color (:text-secondary colors) :font-size "0.8rem" :font-weight "bold"}} label]
     [:select {:style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors)) :padding "6px 8px" :border-radius "4px" :font-size "0.85rem" :cursor "pointer"}
               :value current-value
               :on-change #(do
                            (swap! state/app-state assoc-in [:filters filter-key] (.. % -target -value))
                            (update-filtered-missions))}
      (for [option options]
        ^{:key option}
        [:option {:value option} option])]]))

(defn search-input []
  (let [colors (current-colors)]
    [:div.search-input {:style {:display "flex" :flex-direction "column" :gap "4px"}}
     [:label {:style {:color (:text-secondary colors) :font-size "0.8rem" :font-weight "bold"}} "Search Missions"]
     [:input {:type "text"
              :placeholder "Search by title, objective, description..."
              :style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors)) :padding "6px 8px" :border-radius "4px" :font-size "0.85rem"}
              :value (get-in @state/app-state [:filters :search-text])
              :on-change #(do
                           (swap! state/app-state assoc-in [:filters :search-text] (.. % -target -value))
                           (update-filtered-missions))}]]))

(defn mission-filters []
  (let [colors (current-colors)
        filters (:filters @state/app-state)]
    [:div.mission-filters {:style {:background-color (:bg-secondary colors) :border (str "1px solid " (:separator colors)) :border-radius "8px" :padding "16px" :margin-bottom "20px"}}
     [:div.filters-header {:style {:margin-bottom "12px"}}
      [:h3 {:style {:color (:text-primary colors) :margin "0" :font-size "1rem" :font-weight "bold"}} "🔍 Filter Missions"]]
     [:div.filters-grid {:style {:display "grid" :grid-template-columns "repeat(auto-fit, minmax(200px, 1fr))" :gap "16px" :align-items "end"}}
      [filter-dropdown "Category" category-options (:category filters) :category]
      [filter-dropdown "Difficulty" difficulty-options (:difficulty filters) :difficulty]
      [filter-dropdown "Experience Level" experience-options (:experience filters) :experience]
      [search-input]]
     [:div.filter-summary {:style {:margin-top "12px" :padding-top "12px" :border-top (str "1px solid " (:separator colors)) :display "flex" :justify-content "space-between" :align-items "center"}}
      [:span {:style {:color (:accent-green colors) :font-size "0.85rem" :font-weight "bold"}}
       (str "Showing " (count (:filtered-missions @state/app-state)) " of " (count (:missions @state/app-state)) " missions")]
      [:button {:style {:background-color (:bg-quaternary colors) :color (:accent-orange colors) :border (str "1px solid " (:separator colors)) :padding "4px 8px" :border-radius "4px" :font-size "0.8rem" :cursor "pointer"}
                :on-click #(do
                            (swap! state/app-state assoc :filters {:category "All Categories"
                                                                  :difficulty "All Difficulties"
                                                                  :experience "All Experience Levels"
                                                                  :search-text ""})
                            (update-filtered-missions))}
       "Clear Filters"]]]))

(defn navigation []
  (let [colors (current-colors)]
    [:header.app-header {:style {:background-color (:bg-tertiary colors) :border-bottom (str "1px solid " (:separator colors)) :padding "16px 0"}}
     [:div.container {:style {:max-width "1200px" :margin "0 auto" :padding "0 20px"}}
      [:div {:style {:display "flex" :justify-content "space-between" :align-items "center"}}
       [:h1.app-title {:style {:color (:text-primary colors) :margin "0" :font-size "1.5rem"}} "✈️ Aviation Mission Management"]
       [:div {:style {:display "flex" :gap "1rem" :align-items "center"}}
        [:button.theme-toggle {:style {:background-color (:bg-quaternary colors) :color (:text-primary colors) :border (str "1px solid " (:separator colors)) :padding "8px 12px" :border-radius "4px" :font-weight "bold" :cursor "pointer" :font-size "1.2rem"}
                               :on-click toggle-theme}
         (if (:dark-mode? @state/app-state) "☀️" "🌙")]

        (if (:admin? @state/app-state)
          [:span {:style {:color (:accent-green colors) :font-weight "bold" :background-color (:bg-quaternary colors) :padding "8px 12px" :border-radius "4px" :border (str "1px solid " (:separator colors))}} "👨‍💼 ADMIN MODE"]
          [:div {:style {:display "flex" :gap "1rem" :align-items "center"}}
           [:button.btn.btn-primary {:style {:background-color (:accent-green colors) :color (:text-primary colors) :border "none" :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! state/app-state assoc :submit-dialog-open true)}
            "📝 Submit Mission"]
           [:button.btn.btn-info {:style {:background-color (:accent-orange colors) :color (:text-primary colors) :border "none" :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(api/download-missions-yaml)}
            "📥 Download"]
           [:label {:style {:background-color (:accent-blue colors) :color (:text-primary colors) :border "none" :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer" :display "inline-block"}}
            "📤 Upload YAML"
            [:input {:type "file"
                     :accept ".yaml,.yml"
                     :style {:display "none"}
                     :on-change #(when-let [file (-> % .-target .-files (aget 0))]
                                  (api/upload-missions-yaml file))}]]
           [:button.btn.btn-secondary {:style {:background-color (:bg-quaternary colors) :color (:accent-blue colors) :border (str "1px solid " (:separator colors)) :padding "8px 16px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! state/app-state assoc :login-dialog-open true)}
            "🔐 Admin Login"]])]]]]))

(defn missions-page []
  (let [colors (current-colors)]
    [:div.missions-page {:style {:background-color (:bg-primary colors) :min-height "100vh" :padding "20px 0"}}
     [:div.container {:style {:max-width "1200px" :margin "0 auto" :padding "0 20px"}}
      [:div.page-header {:style {:margin-bottom "24px"}}
       [:h1 {:style {:color (:text-primary colors) :margin "0 0 16px 0" :font-size "1.8rem"}} "🎯 Aviation Training Missions"]
       (when (:admin? @state/app-state)
         [:div
          [:button.btn.btn-primary {:style {:background-color (:accent-blue colors) :color (:text-primary colors) :border "none" :padding "10px 20px" :border-radius "4px" :font-weight "bold" :cursor "pointer"} :on-click #(swap! state/app-state assoc :create-dialog-open true)}
           "➕ Create Mission"]])]

      [mission-filters]

      (if (:loading @state/app-state)
        [:div.loading {:style {:color (:text-secondary colors) :text-align "center" :padding "40px" :font-size "1.2rem"}} "🔄 Loading missions..."]
        (let [missions-to-show (:filtered-missions @state/app-state)]
          (if (empty? missions-to-show)
            [:div.no-missions {:style {:color (:text-secondary colors) :text-align "center" :padding "40px" :font-size "1.2rem"}}
             [:div {:style {:font-size "3rem" :margin-bottom "16px"}} "🔍"]
             [:div "No missions match your current filters"]
             [:div {:style {:font-size "0.9rem" :color (:text-muted colors) :margin-top "8px"}} "Try adjusting your filter criteria"]]
            [:div.missions-grid {:style {:display "grid" :grid-template-columns "repeat(auto-fit, minmax(400px, 1fr))" :gap "20px"}}
             (for [mission missions-to-show]
               ^{:key (:id mission)}
               [mission-card mission])])))]])))