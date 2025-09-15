(ns aviation-missions.components.navigation
  (:require
   [re-frame.core :as rf]))

(defn navigation []
  (let [current-page @(rf/subscribe [:current-page])]
    [:nav.navigation
     [:div.nav-container
      [:div.nav-tabs
       [:a.nav-tab
        {:class (when (= current-page :missions) "active")
         :on-click #(rf/dispatch [:set-active-page :missions {}])}
        [:span.nav-icon "✈️"]
        [:span.nav-label "Missions"]]
       
       [:a.nav-tab
        {:class (when (= current-page :admin) "active")
         :on-click #(rf/dispatch [:set-active-page :admin {}])}
        [:span.nav-icon "⚙️"]
        [:span.nav-label "Admin"]]
       
       [:a.nav-tab
        {:class (when (= current-page :challenges) "active")
         :on-click #(rf/dispatch [:set-active-page :challenges {}])}
        [:span.nav-icon "🎯"]
        [:span.nav-label "Challenges"]]]]]))
