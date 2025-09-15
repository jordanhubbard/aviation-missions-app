(ns aviation-missions.db)

(def default-db
  {:current-page :missions
   :route-params {}
   :missions []
   :loading false
   :error nil
   :admin-token nil
   :admin-name nil
   :filters {:category nil
             :difficulty nil
             :pilot-experience nil}
   :show-submit-modal false
   :selected-mission nil
   :comments []
   :reviews []
   :completions []
   :ratings {}
   :show-comment-modal false
   :show-review-modal false
   :show-completion-modal false
   :show-print-modal false
   :active-tab "overview"
   :form-data {}})
