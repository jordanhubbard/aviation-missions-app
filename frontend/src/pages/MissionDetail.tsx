import React, { useState, useEffect } from 'react';
import { useParams, Link, useSearchParams } from 'react-router-dom';
import { Container, Row, Col, Card, Badge, Button, Form, Alert, Spinner, Modal, Tab, Tabs } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { missionsApi, commentsApi, reviewsApi, completionApi, ratingsApi, isAdmin } from '../services/api';
import { NewComment, NewReview, MissionCompletion, NewRating } from '../types';
import PrintableMissionCard from '../components/PrintableMissionCard';

const MissionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const missionId = parseInt(id || '0');
  const queryClient = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();

  const [showCommentModal, setShowCommentModal] = useState(false);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showCompletionModal, setShowCompletionModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  // Handle URL parameters to auto-open modals
  useEffect(() => {
    const action = searchParams.get('action');
    if (action) {
      switch (action) {
        case 'comment':
          setShowCommentModal(true);
          break;
        case 'complete':
          setShowCompletionModal(true);
          break;
        case 'review':
          setShowReviewModal(true);
          break;
        case 'comments':
          setActiveTab('comments');
          break;
        case 'reviews':
          setActiveTab('reviews');
          break;
        case 'completions':
          setActiveTab('completions');
          break;
      }
      // Clear the search param after opening the modal
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

  // Form states
  const [commentForm, setCommentForm] = useState<NewComment>({ author_name: '', content: '' });
  const [reviewForm, setReviewForm] = useState<NewReview>({ pilot_name: '' });
  const [completionForm, setCompletionForm] = useState<MissionCompletion>({ 
    pilot_name: '', 
    completion_date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  // Queries
  const { data: missionData, isLoading: missionLoading, error: missionError } = useQuery(
    ['mission', missionId],
    () => missionsApi.getById(missionId),
    { select: (response) => response.data.mission }
  );

  const { data: comments } = useQuery(
    ['comments', missionId],
    () => commentsApi.getForMission(missionId),
    { select: (response) => response.data.comments }
  );

  const { data: reviews } = useQuery(
    ['reviews', missionId],
    () => reviewsApi.getForMission(missionId),
    { select: (response) => response.data.reviews }
  );

  const { data: completions } = useQuery(
    ['completions', missionId],
    () => completionApi.getForMission(missionId),
    { select: (response) => response.data.completions }
  );

  // Mutations
  const addCommentMutation = useMutation(
    (comment: NewComment) => commentsApi.add(missionId, comment),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['comments', missionId]);
        queryClient.invalidateQueries(['mission', missionId]);
        setCommentForm({ author_name: '', content: '' });
        setShowCommentModal(false);
      }
    }
  );

  const addReviewMutation = useMutation(
    (review: NewReview) => reviewsApi.add(missionId, review),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['reviews', missionId]);
        queryClient.invalidateQueries(['mission', missionId]);
        setReviewForm({ pilot_name: '' });
        setShowReviewModal(false);
      }
    }
  );

  const markCompletedMutation = useMutation(
    (completion: MissionCompletion) => completionApi.markCompleted(missionId, completion),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mission', missionId]);
        queryClient.invalidateQueries(['completions', missionId]);
        setCompletionForm({ pilot_name: '', completion_date: new Date().toISOString().split('T')[0], notes: '' });
        setShowCompletionModal(false);
      }
    }
  );

  const addRatingMutation = useMutation(
    (rating: NewRating) => ratingsApi.add(missionId, rating),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['mission', missionId]);
      }
    }
  );

  const handleRating = (isPositive: boolean) => {
    const rating: NewRating = {
      pilot_name: 'anonymous-user', // For now, using anonymous user
      rating: isPositive ? 'up' : 'down'
    };
    addRatingMutation.mutate(rating);
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'success';
    if (difficulty <= 6) return 'warning';
    return 'danger';
  };

  if (missionLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading mission details...</p>
      </Container>
    );
  }

  if (missionError || !missionData) {
    return (
      <Container>
        <Alert variant="danger">
          <Alert.Heading>Mission Not Found</Alert.Heading>
          <p>The requested mission could not be found.</p>
          <Link to="/" className="btn btn-primary">Back to Missions</Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-4">
        <Col>
          <div className="d-flex align-items-center mb-3">
            <Link to="/" className="btn btn-primary me-3">
              <i className="fas fa-arrow-left me-2"></i>Back to Missions
            </Link>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none">Missions</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Mission Details
                </li>
              </ol>
            </nav>
          </div>
        </Col>
      </Row>

      <Row>
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <div>
                <Badge bg={getDifficultyColor(missionData.difficulty)} className="me-2">
                  Difficulty: {missionData.difficulty}/10
                </Badge>
                <Badge bg="secondary" className="text-uppercase">
                  {missionData.category}
                </Badge>
              </div>
              <div>
                {isAdmin() && (
                  <Link 
                    to={`/missions/${missionId}/edit`}
                    className="btn btn-warning btn-sm me-2"
                  >
                    <i className="fas fa-edit me-1"></i>Edit Mission
                  </Link>
                )}
                <Button 
                  variant="success" 
                  size="sm" 
                  className="me-2"
                  onClick={() => setShowCompletionModal(true)}
                >
                  <i className="fas fa-check me-1"></i>Mark Completed
                </Button>
                <Button 
                  variant="primary" 
                  size="sm" 
                  className="me-2"
                  onClick={() => setShowReviewModal(true)}
                >
                  <i className="fas fa-star me-1"></i>Add Review
                </Button>
                <Button 
                  variant="outline-primary" 
                  size="sm"
                  className="me-2"
                  onClick={() => setShowCommentModal(true)}
                >
                  <i className="fas fa-comment me-1"></i>Add Comment
                </Button>
                <Button 
                  variant="outline-secondary" 
                  size="sm"
                  onClick={() => setShowPrintModal(true)}
                >
                  <i className="fas fa-print me-1"></i>Print Card
                </Button>
              </div>
            </Card.Header>
            
            <Card.Body>
              <h1 className="mb-4">{missionData.title}</h1>
              
              <Tabs activeKey={activeTab} onSelect={(k) => setActiveTab(k || 'overview')} className="mb-4">
                <Tab eventKey="overview" title="Mission Overview">
                  <div className="mb-4">
                    <h5 className="text-primary">
                      <i className="fas fa-bullseye me-2"></i>Objective
                    </h5>
                    <p className="lead">{missionData.objective}</p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-primary">
                      <i className="fas fa-tasks me-2"></i>Mission Description
                    </h5>
                    <p>{missionData.mission_description}</p>
                  </div>

                  <div className="mb-4">
                    <h5 className="text-primary">
                      <i className="fas fa-question-circle me-2"></i>Why This Mission?
                    </h5>
                    <p>{missionData.why_description}</p>
                  </div>

                  {missionData.route && (
                    <div className="mb-4">
                      <h5 className="text-primary">
                        <i className="fas fa-route me-2"></i>Route Description
                      </h5>
                      <p className="font-monospace bg-light p-3 rounded">{missionData.route}</p>
                    </div>
                  )}

                  {missionData.suggested_route && (
                    <div className="mb-4">
                      <h5 className="text-primary">
                        <i className="fas fa-map-marked-alt me-2"></i>ICAO Route
                      </h5>
                      <div className="bg-primary bg-opacity-10 p-3 rounded">
                        <p className="font-monospace fs-5 mb-2 text-center">{missionData.suggested_route}</p>
                        <small className="text-muted d-block text-center">
                          <i className="fas fa-info-circle me-1"></i>
                          Copy these ICAO codes into your flight planning app or GPS
                        </small>
                      </div>
                    </div>
                  )}

                  {missionData.notes && (
                    <div className="mb-4">
                      <h5 className="text-primary">
                        <i className="fas fa-sticky-note me-2"></i>Additional Notes
                      </h5>
                      <Alert variant="info">
                        {missionData.notes}
                      </Alert>
                    </div>
                  )}
                </Tab>

                <Tab eventKey="comments" title={`Comments (${comments?.length || 0})`}>
                  <div className="mb-3">
                    <Button 
                      variant="primary"
                      onClick={() => setShowCommentModal(true)}
                    >
                      <i className="fas fa-plus me-2"></i>Add Comment
                    </Button>
                  </div>
                  
                  {comments && comments.length > 0 ? (
                    comments.map(comment => (
                      <Card key={comment.id} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <strong>{comment.author_name}</strong>
                            <small className="text-muted">
                              {new Date(comment.created_at).toLocaleDateString()}
                            </small>
                          </div>
                          <p className="mb-0">{comment.content}</p>
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <Alert variant="light">
                      <i className="fas fa-comment me-2"></i>
                      No comments yet. Be the first to share your thoughts!
                    </Alert>
                  )}
                </Tab>

                <Tab eventKey="reviews" title={`Reviews (${reviews?.length || 0})`}>
                  <div className="mb-3">
                    <Button 
                      variant="primary"
                      onClick={() => setShowReviewModal(true)}
                    >
                      <i className="fas fa-star me-2"></i>Add Review
                    </Button>
                  </div>
                  
                  {reviews && reviews.length > 0 ? (
                    reviews.map(review => (
                      <Card key={review.id} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <strong>{review.pilot_name}</strong>
                            </div>
                            <div className="text-end">
                              <small className="text-muted d-block">
                                {new Date(review.created_at).toLocaleDateString()}
                              </small>
                              {review.flight_date && (
                                <small className="text-muted">
                                  Flight: {new Date(review.flight_date).toLocaleDateString()}
                                </small>
                              )}
                            </div>
                          </div>
                          {review.review_text && <p className="mb-0">{review.review_text}</p>}
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <Alert variant="light">
                      <i className="fas fa-star me-2"></i>
                      No reviews yet. Fly this mission and share your experience!
                    </Alert>
                  )}
                </Tab>

                <Tab eventKey="completions" title={`Completions (${completions?.length || 0})`}>
                  <div className="mb-3">
                    <Button 
                      variant="success"
                      onClick={() => setShowCompletionModal(true)}
                    >
                      <i className="fas fa-check me-2"></i>Mark Completed
                    </Button>
                  </div>
                  
                  {completions && completions.length > 0 ? (
                    completions.map(completion => (
                      <Card key={completion.id} className="mb-3">
                        <Card.Body>
                          <div className="d-flex justify-content-between align-items-start mb-2">
                            <div>
                              <strong>{completion.pilot_name}</strong>
                              <Badge bg="success" className="ms-2">
                                <i className="fas fa-check me-1"></i>Completed
                              </Badge>
                            </div>
                            <div className="text-end">
                              <small className="text-muted d-block">
                                Completed: {new Date(completion.completion_date).toLocaleDateString()}
                              </small>
                              <small className="text-muted">
                                Logged: {new Date(completion.created_at).toLocaleDateString()}
                              </small>
                            </div>
                          </div>
                          {completion.notes && (
                            <div className="mt-2">
                              <small className="text-muted d-block mb-1">
                                <i className="fas fa-sticky-note me-1"></i>Notes:
                              </small>
                              <p className="mb-0">{completion.notes}</p>
                            </div>
                          )}
                        </Card.Body>
                      </Card>
                    ))
                  ) : (
                    <Alert variant="light">
                      <i className="fas fa-check me-2"></i>
                      No completions yet. Be the first to complete this mission!
                    </Alert>
                  )}
                </Tab>
              </Tabs>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <Card className="shadow-sm">
            <Card.Header>
              <h5 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>Mission Statistics
              </h5>
            </Card.Header>
            <Card.Body>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Comments:</span>
                  <Badge bg="primary">{missionData.comment_count}</Badge>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between">
                  <span>Completions:</span>
                  <Badge bg="success">{missionData.completion_count}</Badge>
                </div>
              </div>
              <div className="mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span>Rate this mission:</span>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="outline-success" 
                      size="sm"
                      onClick={() => handleRating(true)}
                      disabled={addRatingMutation.isLoading}
                      style={{ fontSize: '1.2rem', minWidth: '60px' }}
                    >
                      👍 {missionData.thumbs_up}
                    </Button>
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={() => handleRating(false)}
                      disabled={addRatingMutation.isLoading}
                      style={{ fontSize: '1.2rem', minWidth: '60px' }}
                    >
                      👎 {missionData.thumbs_down}
                    </Button>
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Comment Modal */}
      <Modal show={showCommentModal} onHide={() => setShowCommentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Your Name</Form.Label>
              <Form.Control
                type="text"
                value={commentForm.author_name}
                onChange={(e) => setCommentForm({...commentForm, author_name: e.target.value})}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                value={commentForm.content}
                onChange={(e) => setCommentForm({...commentForm, content: e.target.value})}
                placeholder="Share your thoughts about this mission..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCommentModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => addCommentMutation.mutate(commentForm)}
            disabled={!commentForm.author_name || !commentForm.content || addCommentMutation.isLoading}
          >
            {addCommentMutation.isLoading ? 'Adding...' : 'Add Comment'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Review Modal */}
      <Modal show={showReviewModal} onHide={() => setShowReviewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Review</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pilot Name</Form.Label>
              <Form.Control
                type="text"
                value={reviewForm.pilot_name}
                onChange={(e) => setReviewForm({...reviewForm, pilot_name: e.target.value})}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Flight Date (Optional)</Form.Label>
              <Form.Control
                type="date"
                value={reviewForm.flight_date || ''}
                onChange={(e) => setReviewForm({...reviewForm, flight_date: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Review (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={reviewForm.review_text || ''}
                onChange={(e) => setReviewForm({...reviewForm, review_text: e.target.value})}
                placeholder="Share your experience flying this mission..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowReviewModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="primary" 
            onClick={() => addReviewMutation.mutate(reviewForm)}
            disabled={!reviewForm.pilot_name || addReviewMutation.isLoading}
          >
            {addReviewMutation.isLoading ? 'Adding...' : 'Add Review'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Completion Modal */}
      <Modal show={showCompletionModal} onHide={() => setShowCompletionModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mark Mission Completed</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Pilot Name</Form.Label>
              <Form.Control
                type="text"
                value={completionForm.pilot_name}
                onChange={(e) => setCompletionForm({...completionForm, pilot_name: e.target.value})}
                placeholder="Enter your name"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Completion Date</Form.Label>
              <Form.Control
                type="date"
                value={completionForm.completion_date}
                onChange={(e) => setCompletionForm({...completionForm, completion_date: e.target.value})}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Notes (Optional)</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={completionForm.notes || ''}
                onChange={(e) => setCompletionForm({...completionForm, notes: e.target.value})}
                placeholder="Any notes about completing this mission..."
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowCompletionModal(false)}>
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={() => markCompletedMutation.mutate(completionForm)}
            disabled={!completionForm.pilot_name || !completionForm.completion_date || markCompletedMutation.isLoading}
          >
            {markCompletedMutation.isLoading ? 'Marking...' : 'Mark Completed'}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Print Mission Card Modal */}
      <Modal show={showPrintModal} onHide={() => setShowPrintModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-print me-2"></i>
            Printable Mission Card
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0">
          <div className="d-print-block">
            <PrintableMissionCard mission={missionData} />
          </div>
        </Modal.Body>
        <Modal.Footer className="d-print-none">
          <Button variant="secondary" onClick={() => setShowPrintModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={() => window.print()}
          >
            <i className="fas fa-print me-1"></i>
            Print Card
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default MissionDetail;
