import React, { useState } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Alert, Tab, Tabs } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { submissionsApi } from '../services/api';
import { Submission } from '../types';

const AdminPanel: React.FC = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const queryClient = useQueryClient();

  const { data: submissions, isLoading, error } = useQuery(
    'submissions',
    () => submissionsApi.getAll(),
    { select: (response) => response.data.submissions }
  );

  const approveMutation = useMutation(
    (id: number) => submissionsApi.approve(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('submissions');
        setShowModal(false);
        setSelectedSubmission(null);
      }
    }
  );

  const rejectMutation = useMutation(
    (id: number) => submissionsApi.reject(id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries('submissions');
        setShowModal(false);
        setSelectedSubmission(null);
      }
    }
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge bg="warning">Pending</Badge>;
      case 'approved':
        return <Badge bg="success">Approved</Badge>;
      case 'rejected':
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'success';
    if (difficulty <= 6) return 'warning';
    return 'danger';
  };

  const handleViewSubmission = (submission: Submission) => {
    setSelectedSubmission(submission);
    setShowModal(true);
  };

  const pendingSubmissions = submissions?.filter(s => s.status === 'pending') || [];
  const reviewedSubmissions = submissions?.filter(s => s.status !== 'pending') || [];

  // Debug logging
  console.log('Submissions data:', submissions);
  console.log('Pending submissions:', pendingSubmissions);
  console.log('Reviewed submissions:', reviewedSubmissions);

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-3">Loading submissions...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          <Alert.Heading>Error Loading Submissions</Alert.Heading>
          <p>There was an error loading the submissions. Please check that you are logged in as admin and try again.</p>
          <p className="small text-muted">Error: {(error as any)?.response?.data?.error || (error as any)?.message || 'Unknown error'}</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="display-5">
            <i className="fas fa-cogs me-3"></i>
            Admin Panel
          </h1>
          <p className="lead text-muted">
            Review and manage mission submissions
          </p>
        </Col>
      </Row>

      <Tabs defaultActiveKey="pending" className="mb-4">
        <Tab eventKey="pending" title={`Pending Review (${pendingSubmissions.length})`}>
          {pendingSubmissions.length > 0 ? (
            <Card>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Difficulty</th>
                      <th>Submitter</th>
                      <th>Submitted</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pendingSubmissions.map(submission => (
                      <tr key={submission.id}>
                        <td>
                          <strong>{submission.title}</strong>
                        </td>
                        <td>
                          <Badge bg="secondary" className="text-uppercase">
                            {submission.category}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={getDifficultyColor(submission.difficulty)}>
                            {submission.difficulty}/10
                          </Badge>
                        </td>
                        <td>
                          <div>
                            <strong>{submission.submitter_name}</strong>
                            {submission.submitter_email && (
                              <div className="small text-muted">
                                {submission.submitter_email}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          <small className="text-muted">
                            {new Date(submission.created_at).toLocaleDateString()}
                          </small>
                        </td>
                        <td>
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => handleViewSubmission(submission)}
                          >
                            <i className="fas fa-eye me-1"></i>
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="info">
              <i className="fas fa-inbox me-2"></i>
              No pending submissions to review.
            </Alert>
          )}
        </Tab>

        <Tab eventKey="reviewed" title={`Reviewed (${reviewedSubmissions.length})`}>
          {reviewedSubmissions.length > 0 ? (
            <Card>
              <Card.Body className="p-0">
                <Table responsive hover className="mb-0">
                  <thead className="table-dark">
                    <tr>
                      <th>Title</th>
                      <th>Category</th>
                      <th>Difficulty</th>
                      <th>Submitter</th>
                      <th>Status</th>
                      <th>Reviewed</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reviewedSubmissions.map(submission => (
                      <tr key={submission.id}>
                        <td>
                          <strong>{submission.title}</strong>
                        </td>
                        <td>
                          <Badge bg="secondary" className="text-uppercase">
                            {submission.category}
                          </Badge>
                        </td>
                        <td>
                          <Badge bg={getDifficultyColor(submission.difficulty)}>
                            {submission.difficulty}/10
                          </Badge>
                        </td>
                        <td>
                          <div>
                            <strong>{submission.submitter_name}</strong>
                            {submission.submitter_email && (
                              <div className="small text-muted">
                                {submission.submitter_email}
                              </div>
                            )}
                          </div>
                        </td>
                        <td>
                          {getStatusBadge(submission.status)}
                        </td>
                        <td>
                          <small className="text-muted">
                            {submission.reviewed_at 
                              ? new Date(submission.reviewed_at).toLocaleDateString()
                              : 'N/A'}
                          </small>
                        </td>
                        <td>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleViewSubmission(submission)}
                          >
                            <i className="fas fa-eye me-1"></i>
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          ) : (
            <Alert variant="info">
              <i className="fas fa-history me-2"></i>
              No reviewed submissions yet.
            </Alert>
          )}
        </Tab>
      </Tabs>

      {/* Submission Review Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            Review Submission: {selectedSubmission?.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedSubmission && (
            <div>
              <Row className="mb-3">
                <Col md={6}>
                  <strong>Category:</strong> {selectedSubmission.category}
                </Col>
                <Col md={6}>
                  <strong>Difficulty:</strong> 
                  <Badge bg={getDifficultyColor(selectedSubmission.difficulty)} className="ms-2">
                    {selectedSubmission.difficulty}/10
                  </Badge>
                </Col>
              </Row>

              <Row className="mb-3">
                <Col md={6}>
                  <strong>Submitter:</strong> {selectedSubmission.submitter_name}
                </Col>
                <Col md={6}>
                  <strong>Email:</strong> {selectedSubmission.submitter_email || 'Not provided'}
                </Col>
              </Row>

              <div className="mb-3">
                <strong>Objective:</strong>
                <p className="mt-2">{selectedSubmission.objective}</p>
              </div>

              <div className="mb-3">
                <strong>Mission Description:</strong>
                <p className="mt-2">{selectedSubmission.mission_description}</p>
              </div>

              <div className="mb-3">
                <strong>Why This Mission:</strong>
                <p className="mt-2">{selectedSubmission.why_description}</p>
              </div>

              {selectedSubmission.route && (
                <div className="mb-3">
                  <strong>Suggested Route:</strong>
                  <p className="mt-2 font-monospace bg-light p-2 rounded">
                    {selectedSubmission.route}
                  </p>
                </div>
              )}

              {selectedSubmission.notes && (
                <div className="mb-3">
                  <strong>Additional Notes:</strong>
                  <p className="mt-2">{selectedSubmission.notes}</p>
                </div>
              )}

              <div className="mb-3">
                <strong>Status:</strong> {getStatusBadge(selectedSubmission.status)}
              </div>

              {selectedSubmission.admin_notes && (
                <div className="mb-3">
                  <strong>Admin Notes:</strong>
                  <p className="mt-2 text-muted">{selectedSubmission.admin_notes}</p>
                </div>
              )}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          {selectedSubmission?.status === 'pending' && (
            <>
              <Button 
                variant="danger"
                onClick={() => selectedSubmission && rejectMutation.mutate(selectedSubmission.id)}
                disabled={rejectMutation.isLoading}
              >
                {rejectMutation.isLoading ? 'Rejecting...' : 'Reject'}
              </Button>
              <Button 
                variant="success"
                onClick={() => selectedSubmission && approveMutation.mutate(selectedSubmission.id)}
                disabled={approveMutation.isLoading}
              >
                {approveMutation.isLoading ? 'Approving...' : 'Approve & Publish'}
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
