(ns aviation-missions.events
  (:require
   [re-frame.core :as rf]
   [day8.re-frame.http-fx]
   [ajax.core :as ajax]
   [aviation-missions.db :as db]
   [aviation-missions.config :as config]))

;; Initialize DB
(rf/reg-event-db
 :initialize-db
 (fn [_ _]
   db/default-db))

;; Navigation
(rf/reg-event-db
 :set-active-page
 (fn [db [_ page params]]
   (assoc db :current-page page :route-params params)))

;; Loading states
(rf/reg-event-db
 :set-loading
 (fn [db [_ loading?]]
   (assoc db :loading loading?)))

(rf/reg-event-db
 :set-error
 (fn [db [_ error]]
   (assoc db :error error)))

;; Missions
(rf/reg-event-fx
 :fetch-missions
 (fn [{:keys [db]} [_ filters]]
   {:http-xhrio {:method          :get
                 :uri             (str config/api-base-url "/missions")
                 :params          filters
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:fetch-missions-success]
                 :on-failure      [:fetch-missions-failure]}
    :db (assoc db :loading true :error nil)}))

(rf/reg-event-db
 :fetch-missions-success
 (fn [db [_ response]]
   (assoc db 
          :missions (:missions response)
          :loading false)))

(rf/reg-event-db
 :fetch-missions-failure
 (fn [db [_ error]]
   (assoc db 
          :loading false
          :error "Failed to load missions")))

;; Mission detail
(rf/reg-event-fx
 :fetch-mission
 (fn [{:keys [db]} [_ mission-id]]
   {:http-xhrio {:method          :get
                 :uri             (str config/api-base-url "/missions/" mission-id)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:fetch-mission-success]
                 :on-failure      [:fetch-mission-failure]}
    :db (assoc db :loading true :error nil)}))

(rf/reg-event-db
 :fetch-mission-success
 (fn [db [_ response]]
   (assoc db 
          :selected-mission (:mission response)
          :loading false)))

(rf/reg-event-db
 :fetch-mission-failure
 (fn [db [_ error]]
   (assoc db 
          :loading false
          :error "Failed to load mission")))

;; Filters
(rf/reg-event-db
 :set-filter
 (fn [db [_ filter-key value]]
   (assoc-in db [:filters filter-key] value)))

(rf/reg-event-fx
 :apply-filters
 (fn [{:keys [db]} _]
   {:dispatch [:fetch-missions (:filters db)]}))

;; Modals
(rf/reg-event-db
 :show-modal
 (fn [db [_ modal-key]]
   (assoc db modal-key true)))

(rf/reg-event-db
 :hide-modal
 (fn [db [_ modal-key]]
   (assoc db modal-key false)))

;; Form data
(rf/reg-event-db
 :update-form-data
 (fn [db [_ field value]]
   (assoc-in db [:form-data field] value)))

(rf/reg-event-db
 :clear-form-data
 (fn [db _]
   (assoc db :form-data {})))

;; Submit mission
(rf/reg-event-fx
 :submit-mission
 (fn [{:keys [db]} [_ mission-data]]
   {:http-xhrio {:method          :post
                 :uri             (str config/api-base-url "/missions")
                 :params          mission-data
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:submit-mission-success]
                 :on-failure      [:submit-mission-failure]}
    :db (assoc db :loading true :error nil)}))

(rf/reg-event-fx
 :submit-mission-success
 (fn [{:keys [db]} [_ response]]
   {:db (assoc db :loading false :show-submit-modal false)
    :dispatch-n [[:clear-form-data]
                 [:fetch-missions (:filters db)]]}))

(rf/reg-event-db
 :submit-mission-failure
 (fn [db [_ error]]
   (assoc db 
          :loading false
          :error "Failed to submit mission")))

;; Comments
(rf/reg-event-fx
 :fetch-comments
 (fn [{:keys [db]} [_ mission-id]]
   {:http-xhrio {:method          :get
                 :uri             (str config/api-base-url "/missions/" mission-id "/comments")
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:fetch-comments-success]
                 :on-failure      [:fetch-comments-failure]}}))

(rf/reg-event-db
 :fetch-comments-success
 (fn [db [_ response]]
   (assoc db :comments (:comments response))))

(rf/reg-event-db
 :fetch-comments-failure
 (fn [db [_ error]]
   (assoc db :error "Failed to load comments")))

;; Add comment
(rf/reg-event-fx
 :add-comment
 (fn [{:keys [db]} [_ mission-id comment-data]]
   {:http-xhrio {:method          :post
                 :uri             (str config/api-base-url "/missions/" mission-id "/comments")
                 :params          comment-data
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:add-comment-success mission-id]
                 :on-failure      [:add-comment-failure]}
    :db (assoc db :loading true)}))

(rf/reg-event-fx
 :add-comment-success
 (fn [{:keys [db]} [_ mission-id response]]
   {:db (assoc db :loading false :show-comment-modal false)
    :dispatch [:fetch-comments mission-id]}))

(rf/reg-event-db
 :add-comment-failure
 (fn [db [_ error]]
   (assoc db 
          :loading false
          :error "Failed to add comment")))

;; Admin authentication
(rf/reg-event-fx
 :admin-login
 (fn [{:keys [db]} [_ credentials]]
   {:http-xhrio {:method          :post
                 :uri             (str config/api-base-url "/admin/login")
                 :params          credentials
                 :format          (ajax/json-request-format)
                 :response-format (ajax/json-response-format {:keywords? true})
                 :on-success      [:admin-login-success]
                 :on-failure      [:admin-login-failure]}
    :db (assoc db :loading true :error nil)}))

(rf/reg-event-db
 :admin-login-success
 (fn [db [_ response]]
   (assoc db 
          :loading false
          :admin-token (:token response)
          :admin-name (:admin_name response))))

(rf/reg-event-db
 :admin-login-failure
 (fn [db [_ error]]
   (assoc db 
          :loading false
          :error "Invalid admin credentials")))

(rf/reg-event-db
 :admin-logout
 (fn [db _]
   (assoc db 
          :admin-token nil
          :admin-name nil)))
