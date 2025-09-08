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

  return (
    <Card className="h-100 mission-card shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg={getDifficultyColor(mission.difficulty)} className="difficulty-badge">
            Difficulty: {mission.difficulty}/10
          </Badge>
          <Badge bg="secondary" className="text-uppercase">
            {formatCategory(mission.category)}
          </Badge>
        </div>
        
        <Card.Title as={Link} to={`/missions/${mission.id}`} className="text-decoration-none">
          {mission.title}
        </Card.Title>
        
        <Card.Text className="text-muted small mb-3">
          <strong>Objective:</strong> {mission.objective}
        </Card.Text>
        
        <Card.Text className="mission-description">
          {mission.mission_description.length > 150 
            ? `${mission.mission_description.substring(0, 150)}...`
            : mission.mission_description}
        </Card.Text>
        
        {mission.route && (
          <Card.Text className="text-info small">
            <i className="fas fa-route me-1"></i>
            <strong>Route:</strong> {mission.route}
          </Card.Text>
        )}
      </Card.Body>
      
      <Card.Footer className="bg-transparent">
        <Row className="text-center">
          <Col xs={4}>
            <Badge bg="primary" className="stats-badge">
              <i className="fas fa-comments me-1"></i>
              {mission.comment_count} Comments
            </Badge>
          </Col>
          <Col xs={4}>
            <Badge bg="success" className="stats-badge">
              <i className="fas fa-check me-1"></i>
              {mission.completion_count} Completed
            </Badge>
          </Col>
          <Col xs={4}>
            <div className="d-flex gap-1">
              <Badge bg="success" className="stats-badge">
                <i className="fas fa-thumbs-up me-1"></i>
                {mission.thumbs_up}
              </Badge>
              <Badge bg="danger" className="stats-badge">
                <i className="fas fa-thumbs-down me-1"></i>
                {mission.thumbs_down}
              </Badge>
            </div>
          </Col>
        </Row>
      </Card.Footer>
    </Card>
  );
};

export default MissionCard;
