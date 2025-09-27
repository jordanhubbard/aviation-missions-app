(ns aviation-missions.api-test
  (:require [cljs.test :refer [deftest is testing run-tests async]]
            [aviation-missions.api :as api]
            [aviation-missions.state :as state]
            [cljs.core.async :refer [<! >! chan timeout]]
            [cljs-http.client :as http])
  (:require-macros [cljs.core.async.macros :refer [go]]))

;; Mock HTTP client for testing
(def mock-responses (atom {}))

(defn mock-http-request [method url & args]
  (let [response (get @mock-responses [method url])]
    (go response)))

;; Helper functions for setting up mocks
(defn setup-mock-response [method url response]
  (swap! mock-responses assoc [method url] response))

(defn clear-mocks []
  (reset! mock-responses {}))

;; Test API configuration
(deftest test-api-config
  (testing "API base URL is configured"
    (is (string? api/api-base-url))
    (is (> (count api/api-base-url) 0)))

  (testing "API endpoints are properly constructed"
    ;; Test endpoint construction with base URL
    (let [missions-url (str api/api-base-url "/missions")]
      (is (.includes missions-url "/missions")))))

;; Test HTTP request helpers
(deftest test-http-helpers
  (testing "GET request helper"
    (async done
      (setup-mock-response :get "/api/test" {:status 200 :body {:success true}})

      (with-redefs [http/get mock-http-request]
        (go
          (let [response (<! (api/api-get "/api/test"))]
            (is (= 200 (:status response)))
            (is (= {:success true} (:body response)))
            (done))))))

  (testing "POST request helper"
    (async done
      (setup-mock-response :post "/api/test" {:status 201 :body {:created true}})

      (with-redefs [http/post mock-http-request]
        (go
          (let [response (<! (api/api-post "/api/test" {:data "test"}))]
            (is (= 201 (:status response)))
            (is (= {:created true} (:body response)))
            (done))))))

  (testing "Error handling in HTTP requests"
    (async done
      (setup-mock-response :get "/api/error" {:status 500 :body {:error "Server error"}})

      (with-redefs [http/get mock-http-request]
        (go
          (let [response (<! (api/api-get "/api/error"))]
            (is (= 500 (:status response)))
            (is (contains? (:body response) :error))
            (done)))))))

;; Test mission API functions
(deftest test-mission-api-functions
  (testing "fetch-missions function"
    (async done
      (let [mock-missions [{:id 1 :title "Test Mission 1"}
                          {:id 2 :title "Test Mission 2"}]]
        (setup-mock-response :get (str api/api-base-url "/missions")
                           {:status 200 :body {:missions mock-missions}})

        (with-redefs [http/get mock-http-request]
          (go
            (api/fetch-missions)
            ;; Wait a bit for state to update
            (<! (timeout 100))
            (let [state-missions (:missions @state/app-state)]
              (is (= mock-missions state-missions))
              (done)))))))

  (testing "fetch-mission-by-id function"
    (async done
      (let [mock-mission {:id 1 :title "Specific Mission"}]
        (setup-mock-response :get (str api/api-base-url "/missions/1")
                           {:status 200 :body {:mission mock-mission}})

        (with-redefs [http/get mock-http-request]
          (go
            (let [mission (<! (api/fetch-mission-by-id 1))]
              (is (= mock-mission mission))
              (done)))))))

  (testing "create-mission function with admin token"
    (async done
      (let [mission-data {:title "New Mission" :category "Training" :difficulty 5}
            created-mission {:id 100 :title "New Mission" :category "Training"}]

        ;; Set admin token in state
        (swap! state/app-state assoc :admin-token "test-admin-token")

        (setup-mock-response :post (str api/api-base-url "/missions")
                           {:status 201 :body {:mission created-mission}})

        (with-redefs [http/post mock-http-request]
          (go
            (let [result (<! (api/create-mission mission-data))]
              (is (= created-mission (:mission result)))
              (done)))))))

  (testing "update-mission function"
    (async done
      (let [mission-id 1
            update-data {:title "Updated Mission"}
            updated-mission {:id 1 :title "Updated Mission"}]

        (swap! state/app-state assoc :admin-token "test-admin-token")

        (setup-mock-response :put (str api/api-base-url "/missions/" mission-id)
                           {:status 200 :body {:mission updated-mission}})

        (with-redefs [http/put mock-http-request]
          (go
            (let [result (<! (api/update-mission mission-id update-data))]
              (is (= updated-mission (:mission result)))
              (done)))))))

  (testing "delete-mission function"
    (async done
      (let [mission-id 1]

        (swap! state/app-state assoc :admin-token "test-admin-token")

        (setup-mock-response :delete (str api/api-base-url "/missions/" mission-id)
                           {:status 200 :body {:success true}})

        (with-redefs [http/delete mock-http-request]
          (go
            (let [result (<! (api/delete-mission mission-id))]
              (is (true? (:success result)))
              (done))))))))

;; Test mission interaction API functions
(deftest test-mission-interaction-api
  (testing "add-comment function"
    (async done
      (let [mission-id 1
            comment-data {:author_name "Test User" :content "Great mission!"}
            created-comment {:id 10 :mission_id 1 :author_name "Test User" :content "Great mission!"}]

        (setup-mock-response :post (str api/api-base-url "/missions/" mission-id "/comments")
                           {:status 201 :body {:comment created-comment}})

        (with-redefs [http/post mock-http-request]
          (go
            (let [result (<! (api/add-comment mission-id comment-data))]
              (is (= created-comment (:comment result)))
              (done)))))))

  (testing "fetch-comments function"
    (async done
      (let [mission-id 1
            mock-comments [{:id 1 :content "Comment 1"} {:id 2 :content "Comment 2"}]]

        (setup-mock-response :get (str api/api-base-url "/missions/" mission-id "/comments")
                           {:status 200 :body {:comments mock-comments}})

        (with-redefs [http/get mock-http-request]
          (go
            (let [result (<! (api/fetch-comments mission-id))]
              (is (= mock-comments (:comments result)))
              (done)))))))

  (testing "rate-mission function"
    (async done
      (let [mission-id 1
            pilot-name "Test Pilot"
            rating "up"
            rating-response {:id 5 :mission_id 1 :pilot_name "Test Pilot" :rating "up"}]

        (setup-mock-response :post (str api/api-base-url "/missions/" mission-id "/rating")
                           {:status 201 :body {:rating rating-response}})

        (with-redefs [http/post mock-http-request]
          (go
            (let [result (<! (api/rate-mission mission-id rating))]
              (is (= rating-response (:rating result)))
              (done)))))))

  (testing "complete-mission function"
    (async done
      (let [mission-id 1
            pilot-name "Test Pilot"
            completion-data {:id 7 :mission_id 1 :pilot_name "Test Pilot"}]

        ;; Set pilot name in state
        (swap! state/app-state assoc :pilot-name pilot-name)

        (setup-mock-response :post (str api/api-base-url "/missions/" mission-id "/completed")
                           {:status 201 :body {:completion completion-data}})

        (with-redefs [http/post mock-http-request]
          (go
            (api/complete-mission mission-id)
            ;; Wait for state update
            (<! (timeout 100))
            (let [completed-missions (:completed-missions @state/app-state)]
              (is (contains? completed-missions mission-id))
              (done))))))))

;; Test admin API functions
(deftest test-admin-api-functions
  (testing "admin-login function"
    (async done
      (let [credentials {:admin_name "admin" :password "aviation123"}
            login-response {:token "admin-token-123" :expires_at "2024-12-31T23:59:59Z"}]

        (setup-mock-response :post (str api/api-base-url "/admin/login")
                           {:status 200 :body login-response})

        (with-redefs [http/post mock-http-request]
          (go
            (api/admin-login "admin" "aviation123")
            ;; Wait for state update
            (<! (timeout 100))
            (let [state-token (:admin-token @state/app-state)
                  state-admin (:admin? @state/app-state)]
              (is (= "admin-token-123" state-token))
              (is (true? state-admin))
              (done)))))))

  (testing "admin-login with invalid credentials"
    (async done
      (setup-mock-response :post (str api/api-base-url "/admin/login")
                         {:status 401 :body {:error "Invalid credentials"}})

      (with-redefs [http/post mock-http-request]
        (go
          (api/admin-login "wrong" "credentials")
          (<! (timeout 100))
          (let [state-admin (:admin? @state/app-state)]
            (is (false? state-admin))
            (done))))))

  (testing "check-admin-status function"
    (async done
      (setup-mock-response :get (str api/api-base-url "/admin/status")
                         {:status 200 :body {:is_admin true}})

      (with-redefs [http/get mock-http-request]
        (go
          (api/check-admin-status)
          (<! (timeout 100))
          (let [state-admin (:admin? @state/app-state)]
            (is (true? state-admin))
            (done)))))))

;; Test submission API functions
(deftest test-submission-api-functions
  (testing "submit-mission function"
    (async done
      (let [submission-data {:title "Submitted Mission"
                            :category "Training"
                            :difficulty 5
                            :objective "Test submission"
                            :mission_description "Test description"
                            :why_description "Test why"
                            :submitter_name "Test User"}
            submission-response {:id 50 :title "Submitted Mission" :status "pending"}]

        (setup-mock-response :post (str api/api-base-url "/submissions")
                           {:status 201 :body submission-response})

        (with-redefs [http/post mock-http-request]
          (go
            (let [result (<! (api/submit-mission submission-data))]
              (is (= "Submitted Mission" (:title result)))
              (done)))))))

  (testing "fetch-submissions function (admin only)"
    (async done
      (let [mock-submissions [{:id 1 :title "Submission 1" :status "pending"}
                             {:id 2 :title "Submission 2" :status "approved"}]]

        (swap! state/app-state assoc :admin-token "test-admin-token")

        (setup-mock-response :get (str api/api-base-url "/submissions")
                           {:status 200 :body {:submissions mock-submissions}})

        (with-redefs [http/get mock-http-request]
          (go
            (let [result (<! (api/fetch-submissions))]
              (is (= mock-submissions (:submissions result)))
              (done)))))))

  (testing "approve-submission function"
    (async done
      (let [submission-id 1]

        (swap! state/app-state assoc :admin-token "test-admin-token")

        (setup-mock-response :put (str api/api-base-url "/submissions/" submission-id "/approve")
                           {:status 200 :body {:success true :message "Submission approved"}})

        (with-redefs [http/put mock-http-request]
          (go
            (let [result (<! (api/approve-submission submission-id))]
              (is (true? (:success result)))
              (done))))))))

;; Test error handling and edge cases
(deftest test-api-error-handling
  (testing "Network error handling"
    (async done
      (with-redefs [http/get (fn [& args] (go {:status 0 :error "Network error"}))]
        (go
          (let [response (<! (api/api-get "/test"))]
            (is (= 0 (:status response)))
            (is (contains? response :error))
            (done))))))

  (testing "Server error handling"
    (async done
      (setup-mock-response :get "/test" {:status 500 :body {:error "Internal server error"}})

      (with-redefs [http/get mock-http-request]
        (go
          (let [response (<! (api/api-get "/test"))]
            (is (= 500 (:status response)))
            (is (contains? (:body response) :error))
            (done))))))

  (testing "Invalid JSON response handling"
    (async done
      (setup-mock-response :get "/test" {:status 200 :body "invalid json"})

      (with-redefs [http/get mock-http-request]
        (go
          (let [response (<! (api/api-get "/test"))]
            ;; Should handle gracefully
            (is (some? response))
            (done))))))

  (testing "Missing authentication token"
    (async done
      ;; Clear admin token
      (swap! state/app-state assoc :admin-token nil)

      (setup-mock-response :post "/admin-endpoint" {:status 401 :body {:error "Unauthorized"}})

      (with-redefs [http/post mock-http-request]
        (go
          (let [response (<! (api/api-post "/admin-endpoint" {} true))]
            (is (= 401 (:status response)))
            (done)))))))

;; Test request headers and authentication
(deftest test-request-authentication
  (testing "Admin requests include authorization header"
    (async done
      (swap! state/app-state assoc :admin-token "test-token-123")

      ;; Mock the HTTP function to capture the request
      (with-redefs [http/post (fn [url opts]
                               (go {:status 200
                                   :body {:success true}
                                   :request-headers (:headers opts)}))]
        (go
          (let [response (<! (api/api-post "/test" {} true))
                headers (:request-headers response)]
            (is (contains? headers "Authorization"))
            (is (= "Bearer test-token-123" (get headers "Authorization")))
            (done))))))

  (testing "Non-admin requests don't include authorization header"
    (async done
      (with-redefs [http/get (fn [url opts]
                              (go {:status 200
                                  :body {:success true}
                                  :request-headers (:headers opts)}))]
        (go
          (let [response (<! (api/api-get "/test"))
                headers (:request-headers response)]
            (is (not (contains? headers "Authorization")))
            (done)))))))

;; Test API response processing
(deftest test-api-response-processing
  (testing "Successful response processing"
    (async done
      (setup-mock-response :get "/test" {:status 200 :body {:data "success"}})

      (with-redefs [http/get mock-http-request]
        (go
          (let [response (<! (api/api-get "/test"))]
            (is (= 200 (:status response)))
            (is (= {:data "success"} (:body response)))
            (done))))))

  (testing "Error response processing"
    (async done
      (setup-mock-response :get "/test" {:status 400 :body {:error "Bad request"}})

      (with-redefs [http/get mock-http-request]
        (go
          (let [response (<! (api/api-get "/test"))]
            (is (= 400 (:status response)))
            (is (contains? (:body response) :error))
            (done))))))

  (testing "State updates after successful API calls"
    (async done
      (let [mock-missions [{:id 1 :title "Mission 1"}]]
        (setup-mock-response :get (str api/api-base-url "/missions")
                           {:status 200 :body {:missions mock-missions}})

        (with-redefs [http/get mock-http-request]
          (go
            ;; Clear existing missions
            (state/set-missions! [])

            ;; Fetch missions
            (api/fetch-missions)

            ;; Wait for async update
            (<! (timeout 200))

            ;; Check state was updated
            (let [state-missions (:missions @state/app-state)]
              (is (= mock-missions state-missions))
              (done))))))))

;; Cleanup after tests
(deftest test-cleanup
  (testing "Clear mocks and reset state"
    (clear-mocks)
    (is (empty? @mock-responses))))