(ns aviation-missions.ui.components.input
  "Input field components."
  (:require [aviation-missions.config.colors :refer [colors]]
            [aviation-missions.utils.validation :as validation]))

(defn text-input
  "Basic text input component"
  [{:keys [value placeholder disabled? error? on-change on-blur class]
    :or {disabled? false
         error? false}}]
  (let [styles {:width "100%"
                :padding "0.75rem"
                :border (str "2px solid " (if error? (:error colors) (:border colors)))
                :border-radius "6px"
                :font-size "1rem"
                :background-color (if disabled? (:surface colors) (:background colors))
                :color (:text colors)
                :transition "border-color 0.2s ease"
                :outline "none"}]

    [:input {:type "text"
             :class class
             :style styles
             :value (or value "")
             :placeholder placeholder
             :disabled disabled?
             :on-change (fn [e] (when on-change (on-change (.. e -target -value))))
             :on-blur (fn [e]
                        (when on-blur (on-blur (.. e -target -value)))
                        (set! (.. e -target -style -borderColor)
                              (if error? (:error colors) (:border colors))))
             :on-focus (fn [e]
                         (set! (.. e -target -style -borderColor) (:primary colors)))}]))

(defn search-input
  "Search input with icon"
  [{:keys [value placeholder on-change]
    :or {placeholder "Search..."}}]
  [:div {:style {:position "relative"
                 :width "100%"}}
   [:input {:type "text"
            :style {:width "100%"
                    :padding "0.75rem 0.75rem 0.75rem 2.5rem"
                    :border (str "2px solid " (:border colors))
                    :border-radius "6px"
                    :font-size "1rem"
                    :background-color (:background colors)
                    :color (:text colors)
                    :outline "none"}
            :value (or value "")
            :placeholder placeholder
            :on-change (fn [e] (when on-change (on-change (.. e -target -value))))}]
   [:div {:style {:position "absolute"
                  :left "0.75rem"
                  :top "50%"
                  :transform "translateY(-50%)"
                  :color (:text-light colors)}}
    "🔍"]])

(defn select
  "Select dropdown component"
  [{:keys [value options on-change disabled? class]
    :or {disabled? false}}]
  (let [styles {:width "100%"
                :padding "0.75rem"
                :border (str "2px solid " (:border colors))
                :border-radius "6px"
                :font-size "1rem"
                :background-color (if disabled? (:surface colors) (:background colors))
                :color (:text colors)
                :outline "none"}]

    [:select {:class class
              :style styles
              :value (or value "")
              :disabled disabled?
              :on-change (fn [e] (when on-change (on-change (.. e -target -value))))}
     (for [option options]
       ^{:key (:value option)}
       [:option {:value (:value option)} (:label option)])]))

(defn form-field
  "Form field wrapper with label and error display"
  [{:keys [label required? error children]}]
  [:div {:style {:margin-bottom "1.5rem"}}
   (when label
     [:label {:style {:display "block"
                      :margin-bottom "0.5rem"
                      :font-weight "500"
                      :color (:text colors)}}
      label
      (when required?
        [:span {:style {:color (:error colors)
                        :margin-left "0.25rem"}}
         "*"])])
   children
   (when error
     [:p {:style {:margin-top "0.5rem"
                  :font-size "0.875rem"
                  :color (:error colors)}}
      error])])