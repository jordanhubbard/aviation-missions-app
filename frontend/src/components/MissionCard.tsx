import React from 'react';
import { Card, Badge, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Mission } from '../types';

interface MissionCardProps {
  mission: Mission;
}

const MissionCard: React.FC<MissionCardProps> = ({ mission }) => {
  const navigate = useNavigate();
  
  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return 'success';
    if (difficulty <= 6) return 'warning';
    return 'danger';
  };

  const formatCategory = (category: string) => {
    return category.replace(/&/g, '&');
  };

  const handleStatClick = (action: string, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    navigate(`/missions/${mission.id}?action=${action}`);
  };


  return (
    <Card className="h-100 mission-card shadow-sm border-0" style={{ maxHeight: '400px', display: 'flex', flexDirection: 'column' }}>
      <Card.Header className="bg-light border-0 py-2 px-3 flex-shrink-0">
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
      
      <Card.Body className="p-3 d-flex flex-column flex-grow-1" style={{ overflow: 'hidden' }}>
        <Card.Title className="h5 mb-3 lh-sm flex-shrink-0">
          <Link 
            to={`/missions/${mission.id}`} 
            className="text-decoration-none text-dark"
          >
            {mission.title}
          </Link>
        </Card.Title>
        
        <div className="mb-3 flex-grow-1" style={{ overflow: 'auto', minHeight: '0' }}>
          <p className="text-muted small mb-2 lh-sm">
            <i className="fas fa-bullseye text-primary me-2"></i>
            <strong>Objective:</strong> {mission.objective}
          </p>
          
          <p className="small text-secondary mb-3 lh-sm">
            {mission.mission_description}
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
              <strong>Route:</strong> {mission.route}
            </p>
          )}
        </div>
        
        <div className="mt-auto pt-2 border-top flex-shrink-0">
          <Row className="g-1 align-items-center text-center">
            <Col xs={3}>
              <div 
                className="d-flex flex-column align-items-center" 
                title="Click to add comment"
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleStatClick('comment', e)}
              >
                <div className="d-flex align-items-center">
                  <i className="fas fa-comments text-primary me-1" style={{ fontSize: '0.75rem' }}></i>
                  <Badge bg="primary" className="stats-badge rounded-pill px-2">
                    {mission.comment_count}
                  </Badge>
                </div>
                <small className="text-muted mt-1" style={{ fontSize: '0.6rem', lineHeight: '1' }}>
                  Comments
                </small>
              </div>
            </Col>
            <Col xs={3}>
              <div 
                className="d-flex flex-column align-items-center" 
                title="Click to view completions"
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleStatClick('completions', e)}
              >
                <div className="d-flex align-items-center">
                  <i className="fas fa-check text-success me-1" style={{ fontSize: '0.75rem' }}></i>
                  <Badge bg="success" className="stats-badge rounded-pill px-2">
                    {mission.completion_count}
                  </Badge>
                </div>
                <small className="text-muted mt-1" style={{ fontSize: '0.6rem', lineHeight: '1' }}>
                  Completed
                </small>
              </div>
            </Col>
            <Col xs={3}>
              <div 
                className="d-flex flex-column align-items-center" 
                title="View likes and reviews"
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleStatClick('reviews', e)}
              >
                <div className="d-flex align-items-center">
                  <i className="fas fa-thumbs-up text-success me-1" style={{ fontSize: '0.75rem' }}></i>
                  <Badge bg="success" className="stats-badge rounded-pill px-2">
                    {mission.thumbs_up}
                  </Badge>
                </div>
                <small className="text-muted mt-1" style={{ fontSize: '0.6rem', lineHeight: '1' }}>
                  Likes
                </small>
              </div>
            </Col>
            <Col xs={3}>
              <div 
                className="d-flex flex-column align-items-center" 
                title="View dislikes and reviews"
                style={{ cursor: 'pointer' }}
                onClick={(e) => handleStatClick('reviews', e)}
              >
                <div className="d-flex align-items-center">
                  <i className="fas fa-thumbs-down text-danger me-1" style={{ fontSize: '0.75rem' }}></i>
                  <Badge bg="danger" className="stats-badge rounded-pill px-2">
                    {mission.thumbs_down}
                  </Badge>
                </div>
                <small className="text-muted mt-1" style={{ fontSize: '0.6rem', lineHeight: '1' }}>
                  Dislikes
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
