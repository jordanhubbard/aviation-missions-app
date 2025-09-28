(ns aviation-missions.ui.pages.dashboard
  "Main dashboard page component."
  (:require [reagent.core :as r]
            [aviation-missions.data.state :as state]
            [aviation-missions.data.operations :as ops]
            [aviation-missions.ui.components.loading :refer [loading-message]]
            [aviation-missions.ui.components.input :refer [search-input select]]
            [aviation-missions.ui.components.button :refer [primary-button]]
            [aviation-missions.ui.components.card :refer [mission-card]]
            [aviation-missions.config.colors :refer [colors]]))

(defn filters-panel
  "Comprehensive filters panel for missions"
  []
  (let [state (state/get-state)
        filters (or (:filters state) {:search "" :category "all" :difficulty "all" :pilot_experience "all"})
        missions (:missions state)]
    [:div {:class "filters-panel"
           :style {:display "flex"
                   :gap "1rem"
                   :margin-bottom "2rem"
                   :padding "1.5rem"
                   :background-color (:surface colors)
                   :border-radius "8px"
                   :flex-wrap "wrap"}}

     ;; Search Input
     [:div {:style {:flex 1 :min-width "250px"}}
      [search-input {:value (:search filters)
                     :placeholder "Search missions by title, description, or route..."
                     :on-change #(ops/filter-missions! (assoc filters :search %))}]]

     ;; Category Filter
     [:div {:style {:min-width "150px"}}
      [:label {:style {:display "block" :margin-bottom "0.5rem" :font-weight "500" :color (:text colors)}} "Category"]
      [select {:value (:category filters)
               :options (concat [{:value "all" :label "All Categories"}]
                               (->> missions
                                    (map :category)
                                    (filter some?)
                                    distinct
                                    sort
                                    (map (fn [cat] {:value cat :label cat}))))
               :on-change #(ops/filter-missions! (assoc filters :category %))}]]

     ;; Difficulty Filter
     [:div {:style {:min-width "150px"}}
      [:label {:style {:display "block" :margin-bottom "0.5rem" :font-weight "500" :color (:text colors)}} "Difficulty"]
      [select {:value (:difficulty filters)
               :options [{:value "all" :label "All Difficulties"}
                         {:value "1" :label "1 - Easy"}
                         {:value "2" :label "2 - Medium"}
                         {:value "3" :label "3 - Hard"}
                         {:value "4" :label "4 - Hard"}
                         {:value "5" :label "5 - Hard"}
                         {:value "6" :label "6 - Expert"}
                         {:value "7" :label "7 - Expert"}
                         {:value "8" :label "8 - Expert"}
                         {:value "9" :label "9 - Expert"}]
               :on-change #(ops/filter-missions! (assoc filters :difficulty %))}]]

     ;; Pilot Experience Filter
     [:div {:style {:min-width "180px"}}
      [:label {:style {:display "block" :margin-bottom "0.5rem" :font-weight "500" :color (:text colors)}} "Pilot Experience"]
      [select {:value (:pilot_experience filters)
               :options (concat [{:value "all" :label "All Experience Levels"}]
                               (->> missions
                                    (map :pilot_experience)
                                    (filter some?)
                                    distinct
                                    sort
                                    (map (fn [exp] {:value exp :label exp}))))
               :on-change #(ops/filter-missions! (assoc filters :pilot_experience %))}]]]))

(defn missions-grid
  "Grid layout for mission cards"
  []
  (let [state (state/get-state)
        missions (:filtered-missions state)]
    (if (empty? missions)
      [:div {:style {:text-align "center"
                     :padding "3rem"
                     :color (:text-light colors)}}
       [:p "No missions found matching your criteria."]]
      [:div {:class "missions-grid"}
       (for [mission missions]
         ^{:key (:id mission)}
         [mission-card {:mission mission
                        :on-click (fn [mission]
                                    (js/console.log "Mission clicked:" mission))
                        :on-edit (fn [mission]
                                   (js/console.log "Edit mission:" mission))
                        :on-delete (fn [mission]
                                     (when (js/confirm "Are you sure you want to delete this mission?")
                                       (ops/delete-mission! (:id mission))))}])])))

(defn dashboard-header
  "Dashboard page header"
  []
  [:div {:style {:display "flex"
                 :justify-content "space-between"
                 :align-items "center"
                 :margin-bottom "2rem"}}
   [:div
    [:h1 {:style {:margin 0
                  :color (:text colors)
                  :font-size "2rem"}}
     "✈️ Mission Dashboard"]
    [:p {:style {:margin "0.5rem 0 0 0"
                 :color (:text-light colors)}}
     "Manage and track aviation missions"]]
   [primary-button {:on-click #(js/console.log "Create new mission")}
    "New Mission"]])

(defn error-display
  "Error message display"
  [error]
  [:div {:style {:background-color (:error colors)
                 :color "white"
                 :padding "1rem"
                 :border-radius "8px"
                 :margin-bottom "2rem"}}
   [:h3 {:style {:margin "0 0 0.5rem 0"}}
    "Error"]
   [:p {:style {:margin 0}}
    error]
   [:button {:style {:margin-top "1rem"
                     :padding "0.5rem 1rem"
                     :border "2px solid white"
                     :border-radius "4px"
                     :background "transparent"
                     :color "white"
                     :cursor "pointer"}
             :on-click state/reset-error!}
    "Dismiss"]])

(defn dashboard
  "Main dashboard page component"
  []
  (let [state (state/get-state)
        {:keys [loading? error missions]} state]
    [:div {:style {:max-width "1200px"
                   :margin "0 auto"
                   :padding "2rem"}}
     [dashboard-header]

     (when error
       [error-display error])

     (cond
       loading?
       [loading-message "Loading missions..."]

       (and (not loading?) (empty? missions))
       [:div {:style {:text-align "center"
                      :padding "3rem"
                      :color (:text-light colors)}}
        [:p "No missions available. Create your first mission to get started."]]

       :else
       [:div
        [filters-panel]
        [missions-grid]

        ;; Floating Action Button for Create Mission
        [:button {:class "fab"
                  :title "Create New Mission"
                  :on-click #(js/console.log "Create new mission")}
         [:span {:class "fab-icon"} "✈️"]
         [:span {:class "fab-label"} "Create Mission"]]])

     ;; Sentinel element - only shows when app is fully loaded and not in loading state
     (when (and (not loading?) (seq missions))
       [:div#app-loaded-sentinel {:style {:position "fixed"
                                          :top "-1000px"
                                          :left "-1000px"
                                          :opacity 0
                                          :pointer-events "none"}}
        "<!-- AVIATION_MISSIONS_APP_FULLY_LOADED -->"])]))

(defn init-dashboard!
  "Initialize dashboard by loading missions"
  []
  (ops/load-missions!))