(ns aviation-missions.utils.formatting
  "Text and data formatting utilities.")

(defn format-date
  "Format a date object or string for display"
  [date]
  (when date
    (try
      (let [d (if (string? date) (js/Date. date) date)]
        (.toLocaleDateString d "en-US"))
      (catch js/Error _
        "Invalid Date"))))

(defn format-datetime
  "Format a date object or string with time for display"
  [date]
  (when date
    (try
      (let [d (if (string? date) (js/Date. date) date)]
        (.toLocaleString d "en-US"))
      (catch js/Error _
        "Invalid Date"))))

(defn truncate
  "Truncate text to specified length with ellipsis"
  [text length]
  (if (and text (> (count text) length))
    (str (subs text 0 length) "...")
    text))

(defn capitalize-first
  "Capitalize the first letter of a string"
  [s]
  (if (empty? s)
    s
    (str (clojure.string/upper-case (first s))
         (subs s 1))))