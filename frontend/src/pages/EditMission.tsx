import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { missionsApi, isAdmin } from '../services/api';
import { Mission } from '../types';

const EditMission: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const missionId = parseInt(id || '0');

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin()) {
      navigate('/');
    }
  }, [navigate]);

  const [formData, setFormData] = useState<Partial<Mission>>({
    title: '',
    category: '',
    difficulty: 5,
    objective: '',
    mission_description: '',
    why_description: '',
    notes: '',
    route: '',
    pilot_experience: 'Beginner (< 100 hours)',
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Load mission data
  const { data: missionData, isLoading: missionLoading, error: missionError } = useQuery(
    ['mission', missionId],
    () => missionsApi.getById(missionId),
    { 
      select: (response) => response.data.mission,
      enabled: missionId > 0
    }
  );

  // Populate form data when mission data is loaded
  useEffect(() => {
    if (missionData) {
      setFormData({
        title: missionData.title || '',
        category: missionData.category || '',
        difficulty: missionData.difficulty || 5,
        objective: missionData.objective || '',
        mission_description: missionData.mission_description || '',
        why_description: missionData.why_description || '',
        notes: missionData.notes || '',
        route: missionData.route || '',
        pilot_experience: missionData.pilot_experience || 'Beginner (< 100 hours)',
      });
    }
  }, [missionData]);

  const updateMutation = useMutation(
    (updatedData: Partial<Mission>) => missionsApi.update(missionId, updatedData),
    {
      onSuccess: () => {
        setShowSuccess(true);
        queryClient.invalidateQueries(['mission', missionId]);
        queryClient.invalidateQueries('missions');
        setTimeout(() => setShowSuccess(false), 5000);
      }
    }
  );

  const deleteMutation = useMutation(
    () => missionsApi.delete(missionId),
    {
      onSuccess: () => {
        navigate('/');
      }
    }
  );

  const categories = [
    'Airspace Operations',
    'Terrain & Environment', 
    'Weather & Atmospheric',
    'Navigation & Diversions',
    'Airport Operations',
    'Endurance & Planning',
    'Advanced Adventures',
    'General Training'
  ];

  const handleInputChange = (field: keyof Mission, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.category && formData.objective && 
        formData.mission_description && formData.why_description) {
      updateMutation.mutate(formData);
    }
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this mission? This action cannot be undone.')) {
      deleteMutation.mutate();
    }
  };

  const isFormValid = formData.title && formData.category && formData.objective && 
                     formData.mission_description && formData.why_description;

  if (!isAdmin()) {
    return null; // Will redirect
  }

  if (missionLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" />
        <p className="mt-3">Loading mission...</p>
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
            <Link to={`/missions/${missionId}`} className="btn btn-primary me-3">
              <i className="fas fa-arrow-left me-2"></i>Back to Mission
            </Link>
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0">
                <li className="breadcrumb-item">
                  <Link to="/" className="text-decoration-none">Missions</Link>
                </li>
                <li className="breadcrumb-item">
                  <Link to={`/missions/${missionId}`} className="text-decoration-none">Mission Details</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                  Edit Mission
                </li>
              </ol>
            </nav>
          </div>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h2 className="mb-0">
                <i className="fas fa-edit me-2"></i>
                Edit Mission
              </h2>
              <div>
                <Button 
                  variant="danger" 
                  onClick={handleDelete}
                  disabled={deleteMutation.isLoading}
                >
                  <i className="fas fa-trash me-1"></i>
                  {deleteMutation.isLoading ? 'Deleting...' : 'Delete Mission'}
                </Button>
              </div>
            </Card.Header>
            <Card.Body>
              <Alert variant="warning" className="mb-4">
                <i className="fas fa-user-shield me-2"></i>
                <strong>Admin Mode:</strong> You are editing a live mission. Changes will be visible immediately.
              </Alert>

              {showSuccess && (
                <Alert variant="success" className="mb-4">
                  <i className="fas fa-check-circle me-2"></i>
                  <strong>Mission updated successfully!</strong>
                </Alert>
              )}

              {(updateMutation.error as any) && (
                <Alert variant="danger" className="mb-4">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  There was an error updating the mission. Please try again.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mission Title *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.title || ''}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        placeholder="e.g., Class B Transition Practice at LAX"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={4}>
                    <Form.Group className="mb-3">
                      <Form.Label>Difficulty (1-10) *</Form.Label>
                      <Form.Range
                        min={1}
                        max={10}
                        value={formData.difficulty || 5}
                        onChange={(e) => handleInputChange('difficulty', parseInt(e.target.value))}
                      />
                      <div className="text-center">
                        <span className="badge bg-primary">{formData.difficulty}/10</span>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Category *</Form.Label>
                  <Form.Select
                    value={formData.category || ''}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat: string) => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mission Objective *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.objective || ''}
                    onChange={(e) => handleInputChange('objective', e.target.value)}
                    placeholder="Describe what the pilot will learn or accomplish..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mission Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.mission_description || ''}
                    onChange={(e) => handleInputChange('mission_description', e.target.value)}
                    placeholder="Detailed description of the mission steps..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Why This Mission? *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.why_description || ''}
                    onChange={(e) => handleInputChange('why_description', e.target.value)}
                    placeholder="Explain the educational value and importance..."
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Suggested Route</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={formData.route || ''}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    placeholder="e.g., KPAO → KSJC via direct"
                  />
                  <Form.Text className="text-muted">
                    Optional: Suggested flight route or airports
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pilot Experience Level *</Form.Label>
                      <Form.Select
                        value={formData.pilot_experience || 'Beginner (< 100 hours)'}
                        onChange={(e) => handleInputChange('pilot_experience', e.target.value)}
                        required
                      >
                        <option value="Beginner (< 100 hours)">Beginner (&lt; 100 hours)</option>
                        <option value="Intermediate (100 - 1000 hours)">Intermediate (100 - 1000 hours)</option>
                        <option value="Advanced (1000+ hours)">Advanced (1000+ hours)</option>
                      </Form.Select>
                      <Form.Text className="text-muted">
                        Recommended minimum pilot experience level
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.notes || ''}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special instructions, warnings, or tips..."
                  />
                </Form.Group>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Link to={`/missions/${missionId}`} className="btn btn-outline-secondary">
                    Cancel
                  </Link>
                  <Button 
                    type="submit" 
                    variant="primary"
                    disabled={!isFormValid || updateMutation.isLoading}
                  >
                    {updateMutation.isLoading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Updating...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-save me-1"></i>
                        Update Mission
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditMission;
