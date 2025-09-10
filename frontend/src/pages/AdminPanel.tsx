import React, { useState, useRef } from 'react';
import { Container, Row, Col, Card, Table, Button, Badge, Modal, Alert, Tab, Tabs, Form } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { submissionsApi, importExportApi } from '../services/api';
import { Submission, Mission } from '../types';

const AdminPanel: React.FC = () => {
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importFile, setImportFile] = useState<File | null>(null);
  const [importResult, setImportResult] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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

  const exportMutation = useMutation(
    () => importExportApi.exportMissions(),
    {
      onSuccess: (response) => {
        const data = JSON.stringify(response.data, null, 2);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `missions-export-${new Date().toISOString().split('T')[0]}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }
    }
  );

  const importMutation = useMutation(
    (missions: Mission[]) => importExportApi.importMissions(missions),
    {
      onSuccess: (response) => {
        setImportResult(response.data.message);
        setShowImportModal(false);
        setImportFile(null);
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
        // Refresh any relevant data
        queryClient.invalidateQueries('missions');
      },
      onError: (error: any) => {
        setImportResult(`Error: ${error.response?.data?.error || error.message}`);
      }
    }
  );

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImportFile(file);
    }
  };

  const handleImport = () => {
    if (!importFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target?.result as string);
        if (jsonData.missions && Array.isArray(jsonData.missions)) {
          importMutation.mutate(jsonData.missions);
        } else {
          setImportResult('Error: Invalid file format. Expected JSON with "missions" array.');
        }
      } catch (error) {
        setImportResult('Error: Invalid JSON file.');
      }
    };
    reader.readAsText(importFile);
  };

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
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h1 className="display-5">
                <i className="fas fa-cogs me-3"></i>
                Admin Panel
              </h1>
              <p className="lead text-muted">
                Review and manage mission submissions
              </p>
            </div>
            <div className="d-flex gap-2">
              <Button 
                variant="outline-primary" 
                onClick={() => exportMutation.mutate()}
                disabled={exportMutation.isLoading}
              >
                <i className="fas fa-download me-2"></i>
                {exportMutation.isLoading ? 'Exporting...' : 'Export Missions'}
              </Button>
              <Button 
                variant="outline-success" 
                onClick={() => setShowImportModal(true)}
              >
                <i className="fas fa-upload me-2"></i>
                Import Missions
              </Button>
            </div>
          </div>
        </Col>
      </Row>

      {importResult && (
        <Row className="mb-3">
          <Col>
            <Alert 
              variant={importResult.includes('Error') ? 'danger' : 'success'} 
              dismissible 
              onClose={() => setImportResult(null)}
            >
              {importResult}
            </Alert>
          </Col>
        </Row>
      )}

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

      {/* Import Missions Modal */}
      <Modal show={showImportModal} onHide={() => setShowImportModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <i className="fas fa-upload me-2"></i>Import Missions
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p className="text-muted mb-3">
            Upload a JSON file containing missions to import. The file should have the format:
          </p>
          <pre className="bg-light p-3 rounded small">
{`{
  "missions": [
    {
      "title": "Mission Title",
      "category": "Category",
      "difficulty": 5,
      "objective": "Mission objective",
      "mission_description": "Description",
      "why_description": "Why description",
      "pilot_experience": "Beginner (< 100 hours)",
      "recommended_aircraft": "Cessna 172",
      "notes": "Optional notes",
      "route": "Optional route"
    }
  ]
}`}
          </pre>
          
          <Form.Group className="mb-3">
            <Form.Label>Select JSON File</Form.Label>
            <Form.Control
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              ref={fileInputRef}
            />
          </Form.Group>
          
          {importFile && (
            <Alert variant="info">
              <i className="fas fa-file-alt me-2"></i>
              Selected: {importFile.name} ({(importFile.size / 1024).toFixed(1)} KB)
            </Alert>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button 
            variant="secondary" 
            onClick={() => {
              setShowImportModal(false);
              setImportFile(null);
              if (fileInputRef.current) {
                fileInputRef.current.value = '';
              }
            }}
          >
            Cancel
          </Button>
          <Button 
            variant="success" 
            onClick={handleImport}
            disabled={!importFile || importMutation.isLoading}
          >
            <i className="fas fa-upload me-2"></i>
            {importMutation.isLoading ? 'Importing...' : 'Import Missions'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminPanel;
