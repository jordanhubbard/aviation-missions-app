(ns aviation-missions.ui.components.button
  "Button component variants."
  (:require [aviation-missions.config.colors :refer [colors]]))

(defn button
  "Base button component"
  [{:keys [type variant size disabled? on-click children class]
    :or {type :button
         variant :primary
         size :medium
         disabled? false}}]
  (let [base-styles {:border "none"
                     :border-radius "6px"
                     :cursor (if disabled? "not-allowed" "pointer")
                     :font-weight "500"
                     :transition "all 0.2s ease"
                     :opacity (if disabled? 0.6 1)}

        size-styles (case size
                      :small {:padding "0.5rem 1rem"
                              :font-size "0.875rem"}
                      :medium {:padding "0.75rem 1.5rem"
                               :font-size "1rem"}
                      :large {:padding "1rem 2rem"
                              :font-size "1.125rem"})

        variant-styles (case variant
                         :primary {:background-color (:primary colors)
                                   :color "white"}
                         :secondary {:background-color (:secondary colors)
                                     :color "white"}
                         :success {:background-color (:success colors)
                                   :color "white"}
                         :warning {:background-color (:warning colors)
                                   :color "white"}
                         :error {:background-color (:error colors)
                                 :color "white"}
                         :ghost {:background-color "transparent"
                                 :color (:primary colors)
                                 :border (str "2px solid " (:primary colors))})

        styles (merge base-styles size-styles variant-styles)]

    [:button {:type (name type)
              :class class
              :style styles
              :disabled disabled?
              :on-click (when (and on-click (not disabled?)) on-click)}
     children]))

(defn primary-button
  "Primary button shorthand"
  [props children]
  [button (assoc props :variant :primary) children])

(defn secondary-button
  "Secondary button shorthand"
  [props children]
  [button (assoc props :variant :secondary) children])

(defn ghost-button
  "Ghost button shorthand"
  [props children]
  [button (assoc props :variant :ghost) children])