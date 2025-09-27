(ns aviation-missions.theme
  (:require [aviation-missions.state :as state]))

(def dark-colors
  {:bg-primary "#0F172A"
   :bg-secondary "#1E293B"
   :bg-tertiary "#334155"
   :bg-quaternary "#475569"
   :text-primary "#F8FAFC"
   :text-secondary "#E2E8F0"
   :text-muted "#94A3B8"
   :accent-blue "#3B82F6"
   :accent-green "#10B981"
   :accent-orange "#F59E0B"
   :accent-red "#EF4444"
   :accent-purple "#8B5CF6"
   :separator "#475569"
   :hover-bg "#374151"
   :active-bg "#4B5563"})

(def light-colors
  {:bg-primary "#FFFFFF"
   :bg-secondary "#F8FAFC"
   :bg-tertiary "#F1F5F9"
   :bg-quaternary "#E2E8F0"
   :text-primary "#0F172A"
   :text-secondary "#334155"
   :text-muted "#64748B"
   :accent-blue "#2563EB"
   :accent-green "#059669"
   :accent-orange "#D97706"
   :accent-red "#DC2626"
   :accent-purple "#7C3AED"
   :separator "#E2E8F0"
   :hover-bg "#F1F5F9"
   :active-bg "#E2E8F0"})

(defn current-colors []
  (if (:dark-mode? @state/app-state)
    dark-colors
    light-colors))

(defn toggle-theme []
  (swap! state/app-state update :dark-mode? not))