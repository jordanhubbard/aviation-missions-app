(ns aviation-missions.utils
  (:require [clojure.string :as str]
            [aviation-missions.state :as state]))

(defn get-difficulty-class [difficulty]
  (cond
    (<= difficulty 2) "badge-difficulty-1"
    (<= difficulty 3) "badge-difficulty-2"
    (<= difficulty 5) "badge-difficulty-3"
    :else "badge-difficulty-6"))

(defn matches-difficulty-filter [mission difficulty-filter]
  (case difficulty-filter
    "All Difficulties" true
    "1-2 (Beginner)" (<= (:difficulty mission) 2)
    "3-4 (Easy)" (<= 3 (:difficulty mission) 4)
    "5-6 (Moderate)" (<= 5 (:difficulty mission) 6)
    "7-8 (Hard)" (<= 7 (:difficulty mission) 8)
    "9-10 (Expert)" (<= 9 (:difficulty mission) 10)
    true))

(defn matches-search-text [mission search-text]
  (if (str/blank? search-text)
    true
    (let [search-lower (str/lower-case search-text)
          searchable-text (str/lower-case
                          (str (:title mission) " "
                               (:objective mission) " "
                               (:mission_description mission) " "
                               (:notes mission) " "
                               (:route mission) " "
                               (:suggested_route mission)))]
      (str/includes? searchable-text search-lower))))

(defn filter-missions [missions filters]
  (let [{:keys [category difficulty experience search-text]} filters]
    (->> missions
         (filter #(or (= category "All Categories")
                      (= (:category %) category)))
         (filter #(matches-difficulty-filter % difficulty))
         (filter #(or (= experience "All Experience Levels")
                      (= (:pilot_experience %) experience)))
         (filter #(matches-search-text % search-text)))))

(defn update-filtered-missions []
  (let [missions (:missions @state/app-state)
        filters (:filters @state/app-state)
        filtered (filter-missions missions filters)]
    (swap! state/app-state assoc :filtered-missions filtered)))

(defn analyze-mission-challenges [mission]
  "Analyze mission content to identify flight challenges"
  (let [content (str (:objective mission) " " (:description mission) " " (:why_description mission))
        content-lower (str/lower-case content)
        challenges []]
    (cond-> challenges
      (re-find #"weather|wind|turbulence|fog|visibility|cloud" content-lower)
      (conj {:icon "🌤️" :label "Weather"})

      (re-find #"navigation|gps|vor|ils|approach|departure" content-lower)
      (conj {:icon "🧭" :label "Navigation"})

      (re-find #"radio|communication|atc|tower|ground|clearance" content-lower)
      (conj {:icon "📻" :label "Communications"})

      (re-find #"traffic|busy|crowded|multiple|aircraft|sequence" content-lower)
      (conj {:icon "✈️" :label "Traffic"})

      (re-find #"emergency|malfunction|failure|problem|issue" content-lower)
      (conj {:icon "🚨" :label "Emergency"})

      (re-find #"night|dark|lighting|beacon|strobe" content-lower)
      (conj {:icon "🌙" :label "Night Ops"})

      (re-find #"precision|accuracy|exact|careful|tight" content-lower)
      (conj {:icon "🎯" :label "Precision"})

      (re-find #"time|pressure|quick|fast|urgent|deadline" content-lower)
      (conj {:icon "⏱️" :label "Time Pressure"}))))