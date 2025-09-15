(ns aviation-missions.config)

(def debug?
  ^boolean goog.DEBUG)

(def api-base-url
  (if debug?
    "http://localhost:3000"
    "")) ; Empty string means same origin - should work for Railway deployment
