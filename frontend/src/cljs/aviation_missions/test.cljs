(ns aviation-missions.test
  "Simple test to verify ClojureScript is working."
  (:require [aviation-missions.utils.logging :as log]))

(defn simple-test
  "Simple test function to verify ClojureScript execution"
  []
  (log/log "🧪 TEST: ClojureScript is executing!")
  (let [test-element (.createElement js/document "div")]
    (set! (.-innerHTML test-element) "ClojureScript Test Success!")
    (set! (.-id test-element) "cljs-test-success")
    (.appendChild (.-body js/document) test-element)
    (log/log-success "Test element added to DOM")))

;; Run the test immediately when this namespace loads
(simple-test)