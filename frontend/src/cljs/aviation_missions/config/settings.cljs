(ns aviation-missions.config.settings
  "Core application configuration settings.")

(def debug?
  "Development mode flag based on Google Closure DEBUG flag"
  ^boolean goog.DEBUG)

(def api-base-url
  "Base URL for API calls - consistent for both dev and prod"
  "http://localhost:8080")

(def app-title
  "Application title displayed in header"
  "✈️ Aviation Mission Management")

(def version
  "Application version"
  "1.0.0")