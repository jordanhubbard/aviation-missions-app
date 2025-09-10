import React, { useState } from 'react';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from 'react-query';
import { submissionsApi } from '../services/api';
import { NewMissionSubmission } from '../types';

const SubmitMission: React.FC = () => {
  const [formData, setFormData] = useState<NewMissionSubmission>({
    title: '',
    category: '',
    difficulty: 5,
    objective: '',
    mission_description: '',
    why_description: '',
    notes: '',
    route: '',
    pilot_experience: 'Beginner (< 100 hours)',
    recommended_aircraft: 'N/A',
    submitter_name: '',
    submitter_email: ''
  });

  const [showSuccess, setShowSuccess] = useState(false);

  const submitMutation = useMutation(
    (submission: NewMissionSubmission) => submissionsApi.create(submission),
    {
      onSuccess: () => {
        setShowSuccess(true);
        setFormData({
          title: '',
          category: '',
          difficulty: 5,
          objective: '',
          mission_description: '',
          why_description: '',
          notes: '',
          route: '',
          pilot_experience: 'Beginner (< 100 hours)',
          recommended_aircraft: 'N/A',
          submitter_name: '',
          submitter_email: ''
        });
        setTimeout(() => setShowSuccess(false), 5000);
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

  const handleInputChange = (field: keyof NewMissionSubmission, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.title && formData.category && formData.objective && 
        formData.mission_description && formData.why_description && formData.submitter_name) {
      submitMutation.mutate(formData);
    }
  };

  const isFormValid = formData.title && formData.category && formData.objective && 
                     formData.mission_description && formData.why_description && formData.submitter_name;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col lg={8}>
          <Card className="shadow-sm">
            <Card.Header>
              <h2 className="mb-0">
                <i className="fas fa-plus-circle me-2"></i>
                Submit a New Mission
              </h2>
            </Card.Header>
            <Card.Body>
              <Alert variant="info" className="mb-4">
                <i className="fas fa-info-circle me-2"></i>
                <strong>Thank you for contributing!</strong> Your mission submission will be reviewed by our team 
                before being published. Please provide as much detail as possible to help other pilots understand 
                the mission objectives and requirements.
              </Alert>

              {showSuccess && (
                <Alert variant="success" className="mb-4">
                  <i className="fas fa-check-circle me-2"></i>
                  <strong>Mission submitted successfully!</strong> Your submission will be reviewed and published soon.
                </Alert>
              )}

              {(submitMutation.error as any) && (
                <Alert variant="danger" className="mb-4">
                  <i className="fas fa-exclamation-triangle me-2"></i>
                  There was an error submitting your mission. Please try again.
                </Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={8}>
                    <Form.Group className="mb-3">
                      <Form.Label>Mission Title *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.title}
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
                        value={formData.difficulty}
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
                    value={formData.category}
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
                    rows={2}
                    value={formData.objective}
                    onChange={(e) => handleInputChange('objective', e.target.value)}
                    placeholder="What skill or knowledge will pilots gain from this mission?"
                    required
                  />
                  <Form.Text className="text-muted">
                    Brief description of what the pilot will learn or practice.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Mission Description *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    value={formData.mission_description}
                    onChange={(e) => handleInputChange('mission_description', e.target.value)}
                    placeholder="Detailed description of what the pilot should do during this mission..."
                    required
                  />
                  <Form.Text className="text-muted">
                    Step-by-step description of the mission activities.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Why This Mission? *</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.why_description}
                    onChange={(e) => handleInputChange('why_description', e.target.value)}
                    placeholder="Explain the educational value and importance of this mission..."
                    required
                  />
                  <Form.Text className="text-muted">
                    Explain the benefits and learning outcomes.
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Suggested Route</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.route}
                    onChange={(e) => handleInputChange('route', e.target.value)}
                    placeholder="e.g., KPAO → KSFO → KOAK"
                  />
                  <Form.Text className="text-muted">
                    Airport codes and waypoints for the mission route.
                  </Form.Text>
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Pilot Experience Level *</Form.Label>
                      <Form.Select
                        value={formData.pilot_experience}
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
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Recommended Aircraft</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.recommended_aircraft}
                        onChange={(e) => handleInputChange('recommended_aircraft', e.target.value)}
                        placeholder="e.g., Cessna 172, Piper Cherokee, N/A"
                      />
                      <Form.Text className="text-muted">
                        Specific aircraft recommendation or "N/A" for no preference
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Additional Notes</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={formData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                    placeholder="Any special considerations, equipment needed, weather requirements, etc..."
                  />
                  <Form.Text className="text-muted">
                    Special considerations, equipment, weather requirements, etc.
                  </Form.Text>
                </Form.Group>

                <hr />

                <h5 className="mb-3">Submitter Information</h5>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Your Name *</Form.Label>
                      <Form.Control
                        type="text"
                        value={formData.submitter_name}
                        onChange={(e) => handleInputChange('submitter_name', e.target.value)}
                        placeholder="Enter your name"
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Email (Optional)</Form.Label>
                      <Form.Control
                        type="email"
                        value={formData.submitter_email}
                        onChange={(e) => handleInputChange('submitter_email', e.target.value)}
                        placeholder="your@email.com"
                      />
                      <Form.Text className="text-muted">
                        We may contact you if we have questions about your submission.
                      </Form.Text>
                    </Form.Group>
                  </Col>
                </Row>

                <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                  <Button 
                    variant="primary" 
                    type="submit" 
                    size="lg"
                    disabled={!isFormValid || submitMutation.isLoading}
                  >
                    {submitMutation.isLoading ? (
                      <>
                        <i className="fas fa-spinner fa-spin me-2"></i>
                        Submitting...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-paper-plane me-2"></i>
                        Submit Mission
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

export default SubmitMission;
