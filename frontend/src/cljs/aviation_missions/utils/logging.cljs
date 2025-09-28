(ns aviation-missions.utils.logging
  "Centralized logging utilities for consistent debug output."
  (:require [aviation-missions.config.settings :as settings]))

(defn log
  "Standard info logging"
  [& args]
  (when settings/debug?
    (.log js/console "📋" (clojure.string/join " " (map str args)))))

(defn log-error
  "Error logging"
  [& args]
  (.error js/console "❌" (clojure.string/join " " (map str args))))

(defn log-warn
  "Warning logging"
  [& args]
  (when settings/debug?
    (.warn js/console "⚠️" (clojure.string/join " " (map str args)))))

(defn log-success
  "Success logging"
  [& args]
  (when settings/debug?
    (.log js/console "✅" (clojure.string/join " " (map str args)))))

(defn log-step
  "Step-by-step process logging"
  [step & args]
  (when settings/debug?
    (.log js/console (str "🔄 Step " step ":") (clojure.string/join " " (map str args)))))