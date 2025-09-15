(ns aviation-missions.subs
  (:require
   [re-frame.core :as rf]))

;; Basic subscriptions
(rf/reg-sub
 :current-page
 (fn [db]
   (:current-page db)))

(rf/reg-sub
 :route-params
 (fn [db]
   (:route-params db)))

(rf/reg-sub
 :loading
 (fn [db]
   (:loading db)))

(rf/reg-sub
 :error
 (fn [db]
   (:error db)))

;; Missions
(rf/reg-sub
 :missions
 (fn [db]
   (:missions db)))

(rf/reg-sub
 :selected-mission
 (fn [db]
   (:selected-mission db)))

(rf/reg-sub
 :filters
 (fn [db]
   (:filters db)))

(rf/reg-sub
 :filter
 (fn [db [_ filter-key]]
   (get-in db [:filters filter-key])))

;; Modals
(rf/reg-sub
 :show-submit-modal
 (fn [db]
   (:show-submit-modal db)))

(rf/reg-sub
 :show-comment-modal
 (fn [db]
   (:show-comment-modal db)))

(rf/reg-sub
 :show-review-modal
 (fn [db]
   (:show-review-modal db)))

(rf/reg-sub
 :show-completion-modal
 (fn [db]
   (:show-completion-modal db)))

(rf/reg-sub
 :show-print-modal
 (fn [db]
   (:show-print-modal db)))

;; Form data
(rf/reg-sub
 :form-data
 (fn [db]
   (:form-data db)))

(rf/reg-sub
 :form-field
 (fn [db [_ field]]
   (get-in db [:form-data field])))

;; Comments, reviews, completions
(rf/reg-sub
 :comments
 (fn [db]
   (:comments db)))

(rf/reg-sub
 :reviews
 (fn [db]
   (:reviews db)))

(rf/reg-sub
 :completions
 (fn [db]
   (:completions db)))

;; Admin
(rf/reg-sub
 :admin-token
 (fn [db]
   (:admin-token db)))

(rf/reg-sub
 :admin-name
 (fn [db]
   (:admin-name db)))

(rf/reg-sub
 :is-admin
 (fn [db]
   (boolean (:admin-token db))))

;; Active tab
(rf/reg-sub
 :active-tab
 (fn [db]
   (:active-tab db)))
