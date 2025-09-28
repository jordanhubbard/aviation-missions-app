(ns aviation-missions.simple-test
  "Immediate execution test for ClojureScript.")

(enable-console-print!)

(println "🧪 CLOJURESCRIPT EXECUTING: Simple test namespace loaded")

(.log js/console "🧪 CLOJURESCRIPT EXECUTING: Console log from ClojureScript")

;; Set a global flag that JS can detect
(set! (.-clojurescriptLoaded js/window) true)

;; Try to add to DOM when ready
(defn add-test-marker []
  (when (.-body js/document)
    (let [test-div (.createElement js/document "div")]
      (set! (.-innerHTML test-div) "🧪 CLOJURESCRIPT SUCCESS")
      (set! (.-id test-div) "clojurescript-success-marker")
      (set! (.-style test-div) "position: fixed; top: 50px; left: 10px; background: green; color: white; padding: 10px; z-index: 9999;")
      (.appendChild (.-body js/document) test-div))))

;; Try immediately
(add-test-marker)

;; Also try when DOM loads
(.addEventListener js/window "DOMContentLoaded" add-test-marker)