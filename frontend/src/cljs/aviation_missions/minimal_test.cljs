(ns aviation-missions.minimal-test
  "Ultra minimal test to verify ClojureScript execution.")

(enable-console-print!)

(println "🔬 MINIMAL TEST: ClojureScript is executing")

(.log js/console "🔬 MINIMAL TEST: Console from ClojureScript")

;; Create a simple DOM element without any React/Reagent
(let [div (.createElement js/document "div")]
  (set! (.-innerHTML div) "🔬 MINIMAL TEST SUCCESS!")
  (set! (.-id div) "minimal-test-success")
  (set! (.-style div) "position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);background:lime;color:black;padding:20px;font-size:24px;z-index:99999;border:5px solid red;")
  (.appendChild (.-body js/document) div))

;; Set multiple global flags for detection
(set! (.-minimalTestExecuted js/window) true)
(set! (.-clojurescriptWorking js/window) true)