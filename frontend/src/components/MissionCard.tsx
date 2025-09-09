import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Mission } from '../types';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'success';
    if (difficulty <= 6) return 'warning';
    return 'danger';
  };

  const formatCategory = (category: string) => {
    return category.replace(/&/g, '&');
  };

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text;
  };

  return (
    <Card className="h-100 mission-card shadow-sm border-0 overflow-hidden">
      <Card.Header className="bg-light border-0 py-2 px-3">
        <Row className="align-items-center g-2">
          <Col xs="auto">
            <Badge 
              bg={getDifficultyColor(mission.difficulty)} 
              className="difficulty-badge px-2 py-1 rounded-pill"
            >
              <i className="fas fa-star me-1"></i>{mission.difficulty}/10
            </Badge>
          </Col>
          <Col>
            <Badge 
              bg="secondary" 
              className="text-uppercase small px-2 py-1 rounded-pill float-end"
            >
              {formatCategory(mission.category)}
            </Badge>
          </Col>
        </Row>
      </Card.Header>
      
      <Card.Body className="p-3 d-flex flex-column">
        <Card.Title className="h5 mb-3 lh-sm">
          <Link 
            to={`/missions/${mission.id}`} 
            className="text-decoration-none text-dark stretched-link"
          >
            {mission.title}
          </Link>
        </Card.Title>
        
        <div className="mb-3 flex-grow-1">
          <p className="text-muted small mb-2 lh-sm">
            <i className="fas fa-bullseye text-primary me-2"></i>
            <strong>Objective:</strong> {truncateText(mission.objective, 85)}
          </p>
          
          <p className="small text-secondary mb-3 lh-sm">
            {truncateText(mission.mission_description, 100)}
          </p>
          
          {mission.suggested_route && (
            <div className="bg-primary bg-opacity-10 rounded p-2 mb-2">
              <div className="d-flex align-items-center">
                <i className="fas fa-map-marked-alt text-primary me-2"></i>
                <code className="small fw-bold text-primary bg-transparent p-0">
                  {mission.suggested_route}
                </code>
              </div>
            </div>
          )}
          
          {mission.route && (
            <p className="text-info small mb-0 lh-sm">
              <i className="fas fa-route me-1"></i>
              <strong>Route:</strong> {truncateText(mission.route, 50)}
            </p>
          )}
        </div>
        
        <div className="mt-auto pt-2 border-top">
          <Row className="g-1 align-items-center text-center">
            <Col xs={3}>
              <div className="d-flex flex-column align-items-center">
                <Badge bg="primary" className="stats-badge rounded-pill px-2">
                  {mission.comment_count}
                </Badge>
                <small className="text-muted mt-1" style={{ fontSize: '0.65rem' }}>
                  <i className="fas fa-comments"></i>
                </small>
              </div>
            </Col>
            <Col xs={3}>
              <div className="d-flex flex-column align-items-center">
                <Badge bg="success" className="stats-badge rounded-pill px-2">
                  {mission.completion_count}
                </Badge>
                <small className="text-muted mt-1" style={{ fontSize: '0.65rem' }}>
                  <i className="fas fa-check"></i>
                </small>
              </div>
            </Col>
            <Col xs={3}>
              <div className="d-flex flex-column align-items-center">
                <Badge bg="success" className="stats-badge rounded-pill px-2">
                  {mission.thumbs_up}
                </Badge>
                <small className="text-muted mt-1" style={{ fontSize: '0.65rem' }}>
                  <i className="fas fa-thumbs-up"></i>
                </small>
              </div>
            </Col>
            <Col xs={3}>
              <div className="d-flex flex-column align-items-center">
                <Badge bg="danger" className="stats-badge rounded-pill px-2">
                  {mission.thumbs_down}
                </Badge>
                <small className="text-muted mt-1" style={{ fontSize: '0.65rem' }}>
                  <i className="fas fa-thumbs-down"></i>
                </small>
              </div>
            </Col>
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MissionCard;
