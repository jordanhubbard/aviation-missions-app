(ns aviation-missions.test-runner
  (:require [cljs.test :refer [run-tests]]
            [aviation-missions.state-test]
            [aviation-missions.api-test]))

;; Test runner for ClojureScript tests
(defn run-all-tests []
  (println "Running Aviation Missions Frontend Tests...")
  (run-tests 'aviation-missions.state-test
             'aviation-missions.api-test))

;; Entry point for test execution
(defn -main []
  (run-all-tests))