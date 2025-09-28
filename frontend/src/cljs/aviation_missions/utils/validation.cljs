(ns aviation-missions.utils.validation
  "Input validation utilities for forms and data integrity.")

(defn required?
  "Check if a value is present and not empty"
  [value]
  (and value
       (not (clojure.string/blank? (str value)))))

(defn valid-email?
  "Basic email validation"
  [email]
  (when email
    (re-matches #"[^@]+@[^@]+\.[^@]+" email)))

(defn valid-phone?
  "Basic phone number validation"
  [phone]
  (when phone
    (re-matches #"[\d\s\-\(\)\+]+" phone)))

(defn valid-date?
  "Check if date string is valid"
  [date-str]
  (when date-str
    (try
      (js/Date. date-str)
      true
      (catch js/Error _
        false))))