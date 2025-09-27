(ns aviation-missions.state-test
  (:require [cljs.test :refer [deftest is testing run-tests]]
            [aviation-missions.state :as state]
            [reagent.core :as r]))

;; Test state initialization
(deftest test-app-state-initialization
  (testing "App state is properly initialized"
    (let [app-state @state/app-state]

      (testing "Contains all required keys"
        (is (contains? app-state :missions))
        (is (contains? app-state :completed-missions))
        (is (contains? app-state :current-page))
        (is (contains? app-state :selected-mission))
        (is (contains? app-state :mission-brief-open))
        (is (contains? app-state :mission-rate-open))
        (is (contains? app-state :difficulty-filter))
        (is (contains? app-state :experience-filter))
        (is (contains? app-state :pilot-name))
        (is (contains? app-state :dark-mode?))
        (is (contains? app-state :current-route))
        (is (contains? app-state :pilot-info)))

      (testing "Has correct default values"
        (is (vector? (:missions app-state)))
        (is (set? (:completed-missions app-state)))
        (is (= :missions (:current-page app-state)))
        (is (nil? (:selected-mission app-state)))
        (is (false? (:mission-brief-open app-state)))
        (is (false? (:mission-rate-open app-state)))
        (is (= "All" (:difficulty-filter app-state)))
        (is (= "All" (:experience-filter app-state)))
        (is (string? (:pilot-name app-state)))
        (is (boolean? (:dark-mode? app-state)))
        (is (map? (:current-route app-state)))
        (is (map? (:pilot-info app-state))))))

;; Test state modification functions
(deftest test-state-setters
  (testing "set-missions! function"
    (let [test-missions [{:id 1 :title "Test Mission 1"}
                        {:id 2 :title "Test Mission 2"}]]
      (state/set-missions! test-missions)
      (is (= test-missions (:missions @state/app-state)))))

  (testing "set-selected-mission! function"
    (let [test-mission {:id 1 :title "Selected Mission"}]
      (state/set-selected-mission! test-mission)
      (is (= test-mission (:selected-mission @state/app-state)))))

  (testing "get-selected-mission function"
    (let [test-mission {:id 1 :title "Selected Mission"}]
      (state/set-selected-mission! test-mission)
      (is (= test-mission (state/get-selected-mission)))))

  (testing "set-current-page! function"
    (state/set-current-page! :admin)
    (is (= :admin (:current-page @state/app-state)))

    (state/set-current-page! :missions)
    (is (= :missions (:current-page @state/app-state))))

  (testing "mission dialog state functions"
    ;; Test mission brief dialog
    (state/set-mission-brief-open! true)
    (is (true? (state/is-mission-brief-open?)))

    (state/set-mission-brief-open! false)
    (is (false? (state/is-mission-brief-open?)))

    ;; Test mission rate dialog
    (state/set-mission-rate-open! true)
    (is (true? (state/is-mission-rate-open?)))

    (state/set-mission-rate-open! false)
    (is (false? (state/is-mission-rate-open?)))))

;; Test filtering functions
(deftest test-filtering-functions
  (testing "set-difficulty-filter! function"
    (state/set-difficulty-filter! "Beginner")
    (is (= "Beginner" (:difficulty-filter @state/app-state)))

    (state/set-difficulty-filter! "All")
    (is (= "All" (:difficulty-filter @state/app-state))))

  (testing "set-experience-filter! function"
    (state/set-experience-filter! "Advanced")
    (is (= "Advanced" (:experience-filter @state/app-state)))

    (state/set-experience-filter! "All")
    (is (= "All" (:experience-filter @state/app-state)))))

;; Test pilot info functions
(deftest test-pilot-info-functions
  (testing "set-pilot-name! function"
    (state/set-pilot-name! "Test Pilot")
    (is (= "Test Pilot" (:pilot-name @state/app-state))))

  (testing "set-pilot-experience! function"
    (state/set-pilot-experience! "Intermediate")
    (is (= "Intermediate" (:experience-level @state/app-state))))

  (testing "pilot info state management"
    (swap! state/app-state assoc-in [:pilot-info :name] "John Doe")
    (swap! state/app-state assoc-in [:pilot-info :experience] "Advanced")
    (swap! state/app-state assoc-in [:pilot-info :hours] 750)

    (is (= "John Doe" (get-in @state/app-state [:pilot-info :name])))
    (is (= "Advanced" (get-in @state/app-state [:pilot-info :experience])))
    (is (= 750 (get-in @state/app-state [:pilot-info :hours])))))

;; Test admin state functions
(deftest test-admin-state-functions
  (testing "Admin mode state"
    (swap! state/app-state assoc :admin? true)
    (is (true? (:admin? @state/app-state)))

    (swap! state/app-state assoc :admin? false)
    (is (false? (:admin? @state/app-state))))

  (testing "Admin token state"
    (swap! state/app-state assoc :admin-token "test-token-123")
    (is (= "test-token-123" (:admin-token @state/app-state)))))

;; Test mission completion tracking
(deftest test-mission-completion-tracking
  (testing "Mission completion state"
    ;; Start with empty completed missions
    (swap! state/app-state assoc :completed-missions #{})
    (is (empty? (:completed-missions @state/app-state)))

    ;; Add completed missions
    (swap! state/app-state update :completed-missions conj 1)
    (swap! state/app-state update :completed-missions conj 2)
    (swap! state/app-state update :completed-missions conj 3)

    (is (= #{1 2 3} (:completed-missions @state/app-state)))
    (is (contains? (:completed-missions @state/app-state) 1))
    (is (contains? (:completed-missions @state/app-state) 2))
    (is (not (contains? (:completed-missions @state/app-state) 4)))))

;; Test route state management
(deftest test-route-state-management
  (testing "Current route state"
    (swap! state/app-state assoc :current-route {:from "KPAO" :to "KSQL"})

    (let [route (:current-route @state/app-state)]
      (is (= "KPAO" (:from route)))
      (is (= "KSQL" (:to route))))

    ;; Test waypoint selection
    (swap! state/app-state assoc :selected-waypoint "KNUQ")
    (is (= "KNUQ" (:selected-waypoint @state/app-state)))))

;; Test theme state
(deftest test-theme-state
  (testing "Dark mode toggle"
    ;; Set to light mode
    (swap! state/app-state assoc :dark-mode? false)
    (is (false? (:dark-mode? @state/app-state)))

    ;; Toggle to dark mode
    (swap! state/app-state update :dark-mode? not)
    (is (true? (:dark-mode? @state/app-state)))

    ;; Toggle back to light mode
    (swap! state/app-state update :dark-mode? not)
    (is (false? (:dark-mode? @state/app-state)))))

;; Test mission rating state
(deftest test-mission-rating-state
  (testing "Mission rating state management"
    ;; Test rating selection
    (swap! state/app-state assoc :mission-complete-rating 4)
    (is (= 4 (:mission-complete-rating @state/app-state)))

    ;; Test clearing rating
    (swap! state/app-state assoc :mission-complete-rating nil)
    (is (nil? (:mission-complete-rating @state/app-state)))))

;; Test state persistence and restoration
(deftest test-state-persistence
  (testing "State can be saved and restored"
    (let [original-state @state/app-state
          missions-data [{:id 1 :title "Test Mission"}]
          pilot-name "Test Pilot"]

      ;; Modify state
      (state/set-missions! missions-data)
      (state/set-pilot-name! pilot-name)
      (state/set-current-page! :admin)

      ;; Verify changes
      (is (= missions-data (:missions @state/app-state)))
      (is (= pilot-name (:pilot-name @state/app-state)))
      (is (= :admin (:current-page @state/app-state)))

      ;; Reset to original state (if needed for other tests)
      (reset! state/app-state original-state))))

;; Test complex state operations
(deftest test-complex-state-operations
  (testing "Multiple simultaneous state changes"
    (let [test-mission {:id 100 :title "Complex Test Mission"}]

      ;; Perform multiple state changes
      (state/set-selected-mission! test-mission)
      (state/set-mission-brief-open! true)
      (state/set-current-page! :mission-detail)
      (swap! state/app-state assoc :dark-mode? true)

      ;; Verify all changes took effect
      (is (= test-mission (:selected-mission @state/app-state)))
      (is (true? (state/is-mission-brief-open?)))
      (is (= :mission-detail (:current-page @state/app-state)))
      (is (true? (:dark-mode? @state/app-state)))))

  (testing "State consistency during rapid changes"
    ;; Simulate rapid UI interactions
    (dotimes [i 10]
      (state/set-mission-brief-open! (even? i))
      (state/set-mission-rate-open! (odd? i)))

    ;; State should be consistent
    (is (boolean? (state/is-mission-brief-open?)))
    (is (boolean? (state/is-mission-rate-open?)))))

;; Test state validation and edge cases
(deftest test-state-edge-cases
  (testing "Handling null and undefined values"
    ;; Test setting nil values
    (state/set-selected-mission! nil)
    (is (nil? (state/get-selected-mission)))

    (state/set-pilot-name! "")
    (is (= "" (:pilot-name @state/app-state))))

  (testing "State type consistency"
    ;; Missions should always be a vector
    (state/set-missions! [])
    (is (vector? (:missions @state/app-state)))

    ;; Completed missions should always be a set
    (swap! state/app-state assoc :completed-missions #{})
    (is (set? (:completed-missions @state/app-state))))

  (testing "Large dataset handling"
    ;; Test with many missions
    (let [many-missions (mapv (fn [i] {:id i :title (str "Mission " i)}) (range 1000))]
      (state/set-missions! many-missions)
      (is (= 1000 (count (:missions @state/app-state))))
      (is (= "Mission 500" (:title (nth (:missions @state/app-state) 500)))))))