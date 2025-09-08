import React from 'react';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { Mission } from '../types';

interface PrintableMissionCardProps {
  mission: Mission;
  className?: string;
}

const PrintableMissionCard: React.FC<PrintableMissionCardProps> = ({ mission, className = '' }) => {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'success';
    if (difficulty <= 6) return 'warning';
    return 'danger';
  };

  return (
    <Card className={`mission-card-printable ${className}`} style={{ pageBreakAfter: 'always' }}>
      <Card.Header className="bg-primary text-white">
        <Row className="align-items-center">
          <Col>
            <h4 className="mb-0">
              <i className="fas fa-plane me-2"></i>
              Aviation Mission Card
            </h4>
          </Col>
          <Col xs="auto">
            <Badge bg={getDifficultyColor(mission.difficulty)} className="fs-6">
              Difficulty: {mission.difficulty}/10
            </Badge>
          </Col>
        </Row>
      </Card.Header>
      
      <Card.Body>
        <div className="mb-3">
          <h3 className="text-primary border-bottom pb-2">{mission.title}</h3>
          <div className="d-flex gap-2 mb-3">
            <Badge bg="secondary" className="text-uppercase">{mission.category}</Badge>
            <Badge bg="info">Mission #{mission.id}</Badge>
          </div>
        </div>

        <Row>
          <Col md={6}>
            <div className="mb-3">
              <h5 className="text-primary">
                <i className="fas fa-bullseye me-2"></i>Objective
              </h5>
              <p className="small">{mission.objective}</p>
            </div>

            <div className="mb-3">
              <h5 className="text-primary">
                <i className="fas fa-tasks me-2"></i>Mission
              </h5>
              <p className="small">{mission.mission_description}</p>
            </div>

            {mission.route && (
              <div className="mb-3">
                <h5 className="text-primary">
                  <i className="fas fa-route me-2"></i>Route
                </h5>
                <p className="font-monospace small bg-light p-2 rounded">{mission.route}</p>
              </div>
            )}
          </Col>

          <Col md={6}>
            <div className="mb-3">
              <h5 className="text-primary">
                <i className="fas fa-question-circle me-2"></i>Why This Mission?
              </h5>
              <p className="small">{mission.why_description}</p>
            </div>

            {mission.notes && (
              <div className="mb-3">
                <h5 className="text-primary">
                  <i className="fas fa-sticky-note me-2"></i>Notes
                </h5>
                <p className="small text-warning">{mission.notes}</p>
              </div>
            )}

            <div className="mb-3">
              <h5 className="text-primary">
                <i className="fas fa-clipboard me-2"></i>Flight Log
              </h5>
              <div className="border p-3" style={{ minHeight: '120px' }}>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong>Date:</strong> _______________
                  </div>
                  <div className="col-6">
                    <strong>Aircraft:</strong> _______________
                  </div>
                </div>
                <div className="row mb-2">
                  <div className="col-6">
                    <strong>Pilot:</strong> _______________
                  </div>
                  <div className="col-6">
                    <strong>Instructor:</strong> _______________
                  </div>
                </div>
                <div className="mb-2">
                  <strong>Weather Conditions:</strong>
                  <div style={{ height: '20px', borderBottom: '1px solid #ccc', marginTop: '5px' }}></div>
                </div>
                <div className="mb-2">
                  <strong>Lessons Learned:</strong>
                  <div style={{ height: '40px', borderBottom: '1px solid #ccc', marginTop: '5px' }}></div>
                </div>
                <div className="row">
                  <div className="col-6">
                    <strong>Mission Completed:</strong> ☐ Yes ☐ No
                  </div>
                  <div className="col-6">
                    <strong>Rating:</strong> ☐ 👍 ☐ 👎
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <div className="border-top pt-3 mt-3">
          <Row className="text-center small text-muted">
            <Col md={4}>
              <strong>Pre-Flight Checklist:</strong><br />
              ☐ Weather briefing<br />
              ☐ NOTAMs checked<br />
              ☐ Route planned<br />
              ☐ Fuel calculated
            </Col>
            <Col md={4}>
              <strong>In-Flight Notes:</strong><br />
              ☐ ATC communications<br />
              ☐ Navigation accuracy<br />
              ☐ Emergency procedures<br />
              ☐ Airspace compliance
            </Col>
            <Col md={4}>
              <strong>Post-Flight Review:</strong><br />
              ☐ Objectives met<br />
              ☐ Areas for improvement<br />
              ☐ Next mission planned<br />
              ☐ Logbook updated
            </Col>
          </Row>
        </div>
      </Card.Body>
      
      <Card.Footer className="text-center small text-muted">
        Generated from Aviation Mission Manager • aviationmissions.app
      </Card.Footer>
    </Card>
  );
};

export default PrintableMissionCard;
