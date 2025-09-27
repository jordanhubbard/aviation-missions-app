(ns aviation-missions.state
  (:require [reagent.core :as r]))

(defonce app-state
  (r/atom {:missions []
           :completed-missions #{}
           :current-page :missions
           :selected-mission nil
           :mission-brief-open false
           :mission-rate-open false
           :mission-complete-rating nil
           :difficulty-filter "All"
           :experience-filter "All"
           :pilot-name ""
           :experience-level "Beginner"
           :dark-mode? true
           :current-route {:from nil :to nil}
           :selected-waypoint nil
           :pilot-info {:name ""
                       :experience "Beginner"
                       :flight-hours 0
                       :preferred-aircraft "Cessna 172"
                       :certifications ["Private Pilot"]}}))

(defn get-current-page []
  (:current-page @app-state))

(defn set-current-page! [page]
  (swap! app-state assoc :current-page page))

(defn get-missions []
  (:missions @app-state))

(defn set-missions! [missions]
  (swap! app-state assoc :missions missions))

(defn get-selected-mission []
  (:selected-mission @app-state))

(defn set-selected-mission! [mission]
  (swap! app-state assoc :selected-mission mission))

(defn is-mission-brief-open? []
  (:mission-brief-open @app-state))

(defn set-mission-brief-open! [open?]
  (swap! app-state assoc :mission-brief-open open?))

(defn is-mission-rate-open? []
  (:mission-rate-open @app-state))

(defn set-mission-rate-open! [open?]
  (swap! app-state assoc :mission-rate-open open?))

(defn get-completed-missions []
  (:completed-missions @app-state))

(defn add-completed-mission! [mission-id]
  (swap! app-state update :completed-missions conj mission-id))

(defn is-mission-completed? [mission-id]
  (contains? (:completed-missions @app-state) mission-id))

(defn get-difficulty-filter []
  (:difficulty-filter @app-state))

(defn set-difficulty-filter! [filter]
  (swap! app-state assoc :difficulty-filter filter))

(defn get-experience-filter []
  (:experience-filter @app-state))

(defn set-experience-filter! [filter]
  (swap! app-state assoc :experience-filter filter))