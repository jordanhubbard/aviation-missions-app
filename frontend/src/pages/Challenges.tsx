import React from 'react';
import { Container, Row, Col, Card, Badge } from 'react-bootstrap';

interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  skills: string[];
  examples: string[];
}

const challenges: Challenge[] = [
  {
    id: 'crosswind-landing',
    title: 'Crosswind Landing Mastery',
    description: 'Master landing techniques in challenging crosswind conditions',
    difficulty: 'Intermediate',
    category: 'Landing Techniques',
    skills: ['Crab approach', 'Wing-low method', 'Rudder control', 'Go-around decision making'],
    examples: ['KRHV on windy days', 'KHAF with marine layer winds', 'KTRK mountain winds']
  },
  {
    id: 'mountain-flying',
    title: 'Mountain Flying Operations',
    description: 'Navigate safely through mountainous terrain with proper techniques',
    difficulty: 'Advanced',
    category: 'Terrain Navigation',
    skills: ['Density altitude calculations', 'Ridge crossing', 'Valley navigation', 'Weather assessment'],
    examples: ['KTRK approaches', 'KTVL high altitude ops', 'Sierra Nevada crossings']
  },
  {
    id: 'busy-airspace',
    title: 'Complex Airspace Navigation',
    description: 'Operate confidently in busy controlled airspace',
    difficulty: 'Intermediate',
    category: 'Airspace Operations',
    skills: ['Radio communications', 'Clearance compliance', 'Traffic awareness', 'Route planning'],
    examples: ['LAX Bravo transitions', 'SFO Class B operations', 'Multiple frequency changes']
  },
  {
    id: 'weather-decision',
    title: 'Weather Decision Making',
    description: 'Make safe go/no-go decisions based on weather conditions',
    difficulty: 'Beginner',
    category: 'Weather Operations',
    skills: ['METAR interpretation', 'TAF analysis', 'Minimums assessment', 'Alternate planning'],
    examples: ['Marine layer penetration', 'Thunderstorm avoidance', 'Low visibility approaches']
  },
  {
    id: 'night-flying',
    title: 'Night Flight Operations',
    description: 'Develop proficiency in night flying operations',
    difficulty: 'Intermediate',
    category: 'Special Operations',
    skills: ['Night vision preservation', 'Lighting systems', 'Spatial orientation', 'Emergency procedures'],
    examples: ['Night pattern work', 'Cross-country night flights', 'Uncontrolled field operations']
  },
  {
    id: 'emergency-procedures',
    title: 'Emergency Procedures',
    description: 'Practice and master various emergency scenarios',
    difficulty: 'Advanced',
    category: 'Emergency Operations',
    skills: ['Engine failure procedures', 'Forced landing techniques', 'System failures', 'Decision making under pressure'],
    examples: ['Simulated engine failures', 'Electrical system failures', 'Navigation equipment failures']
  }
];

const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case 'Beginner': return 'success';
    case 'Intermediate': return 'warning';
    case 'Advanced': return 'danger';
    default: return 'secondary';
  }
};

const Challenges: React.FC = () => {
  return (
    <Container className="py-4">
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 mb-3">
            <i className="fas fa-trophy me-3"></i>
            Aviation Challenges
          </h1>
          <p className="lead text-muted">
            Master essential aviation skills through structured challenges. Each challenge focuses on specific 
            competencies that will make you a safer, more confident pilot.
          </p>
        </Col>
      </Row>

      <Row>
        {challenges.map((challenge) => (
          <Col key={challenge.id} lg={6} className="mb-4">
            <Card className="h-100 shadow-sm">
              <Card.Header className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{challenge.title}</h5>
                <Badge bg={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
              </Card.Header>
              <Card.Body>
                <Badge bg="info" className="mb-3">{challenge.category}</Badge>
                <p className="text-muted mb-3">{challenge.description}</p>
                
                <h6 className="fw-bold mb-2">Key Skills:</h6>
                <div className="mb-3">
                  {challenge.skills.map((skill, index) => (
                    <Badge key={index} bg="light" text="dark" className="me-1 mb-1">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <h6 className="fw-bold mb-2">Practice Examples:</h6>
                <ul className="small text-muted mb-0">
                  {challenge.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <Row className="mt-5">
        <Col>
          <Card className="bg-light">
            <Card.Body>
              <h5 className="mb-3">
                <i className="fas fa-lightbulb me-2"></i>
                How to Use Challenges
              </h5>
              <Row>
                <Col md={4}>
                  <h6>1. Choose Your Level</h6>
                  <p className="small text-muted">
                    Start with challenges that match your current skill level and gradually progress.
                  </p>
                </Col>
                <Col md={4}>
                  <h6>2. Practice Regularly</h6>
                  <p className="small text-muted">
                    Incorporate challenge elements into your regular flights and training sessions.
                  </p>
                </Col>
                <Col md={4}>
                  <h6>3. Track Progress</h6>
                  <p className="small text-muted">
                    Use the mission system to log flights that incorporate these challenges.
                  </p>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Challenges;
