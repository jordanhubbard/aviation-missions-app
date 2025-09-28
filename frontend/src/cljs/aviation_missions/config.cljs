(ns aviation-missions.config)

(def debug?
  ^boolean goog.DEBUG)

(def api-base-url
  (if debug?
    "http://localhost:8080"
    "http://localhost:8080")) ; Use localhost for both debug and production
