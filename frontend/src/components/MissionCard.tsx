import React from 'react';
import { Card, Badge } from 'react-bootstrap';
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
    <Card className="h-100 mission-card shadow-sm mb-3">
      <Card.Body className="p-3">
        <div className="d-flex justify-content-between align-items-start mb-2">
          <Badge bg={getDifficultyColor(mission.difficulty)} className="difficulty-badge">
            {mission.difficulty}/10
          </Badge>
          <Badge bg="secondary" className="text-uppercase small">
            {formatCategory(mission.category)}
          </Badge>
        </div>
        
        <Card.Title className="h6 mb-2">
          <Link to={`/missions/${mission.id}`} className="text-decoration-none text-dark">
            {mission.title}
          </Link>
        </Card.Title>
        
        <Card.Text className="text-muted small mb-2">
          <strong>Objective:</strong> {mission.objective.length > 80 
            ? `${mission.objective.substring(0, 80)}...`
            : mission.objective}
        </Card.Text>
        
        <Card.Text className="mission-description small">
          {mission.mission_description.length > 120 
            ? `${mission.mission_description.substring(0, 120)}...`
            : mission.mission_description}
        </Card.Text>
        
        {mission.route && (
          <Card.Text className="text-info small mb-2">
            <i className="fas fa-route me-1"></i>
            <strong>Route:</strong> {mission.route.length > 60 
              ? `${mission.route.substring(0, 60)}...`
              : mission.route}
          </Card.Text>
        )}
        
        <div className="d-flex justify-content-between align-items-center mt-2 pt-2 border-top">
          <div className="d-flex gap-2">
            <Badge bg="primary" className="stats-badge small">
              <i className="fas fa-comments me-1"></i>{mission.comment_count}
            </Badge>
            <Badge bg="success" className="stats-badge small">
              <i className="fas fa-check me-1"></i>{mission.completion_count}
            </Badge>
          </div>
          <div className="d-flex gap-1">
            <Badge bg="success" className="stats-badge small">
              <i className="fas fa-thumbs-up me-1"></i>{mission.thumbs_up}
            </Badge>
            <Badge bg="danger" className="stats-badge small">
              <i className="fas fa-thumbs-down me-1"></i>{mission.thumbs_down}
            </Badge>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MissionCard;
