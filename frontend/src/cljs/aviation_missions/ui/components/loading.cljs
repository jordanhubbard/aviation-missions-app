(ns aviation-missions.ui.components.loading
  "Loading indicator components."
  (:require [aviation-missions.config.colors :refer [colors]]))

(defn spinner
  "Simple loading spinner component"
  []
  [:div {:style {:display "flex"
                 :justify-content "center"
                 :align-items "center"
                 :padding "2rem"}}
   [:div {:style {:width "40px"
                  :height "40px"
                  :border (str "4px solid " (:border colors))
                  :border-top (str "4px solid " (:primary colors))
                  :border-radius "50%"
                  :animation "spin 1s linear infinite"}}]])

(defn loading-message
  "Loading message with spinner"
  [message]
  [:div {:style {:text-align "center"
                 :color (:text-light colors)
                 :padding "2rem"}}
   [spinner]
   [:p {:style {:margin-top "1rem"
                :font-size "1rem"}}
    message]])