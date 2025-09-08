import React, { useState } from 'react';
import { Row, Col, Form, Spinner, Alert, Container } from 'react-bootstrap';
import { useQuery } from 'react-query';
import { missionsApi } from '../services/api';
import MissionCard from '../components/MissionCard';
import { Mission } from '../types';

const MissionList: React.FC = () => {
  const [filters, setFilters] = useState({
    category: '',
    difficulty: '',
    sort: 'difficulty'
  });

  const { data, isLoading, error } = useQuery(
    ['missions', filters],
    () => missionsApi.getAll({
      category: filters.category || undefined,
      difficulty: filters.difficulty ? parseInt(filters.difficulty) : undefined,
      sort: filters.sort
    }),
    {
      select: (response) => response.data.missions
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

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  if (isLoading) {
    return (
      <Container className="text-center py-5">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading missions...</span>
        </Spinner>
        <p className="mt-3">Loading missions...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Alert variant="danger">
          <Alert.Heading>Error Loading Missions</Alert.Heading>
          <p>There was an error loading the missions. Please try again later.</p>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h1 className="display-4 mb-4">
            <i className="fas fa-plane me-3"></i>
            General Aviation Training Missions
          </h1>
          <p className="lead text-muted">
            Discover challenging and educational flight missions designed to improve your general aviation skills.
            From basic airport operations to advanced mountain flying, find missions that match your experience level.
          </p>
        </Col>
      </Row>

      {/* Filters */}
      <Row className="mb-4">
        <Col md={4}>
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Select 
              value={filters.category}
              onChange={(e) => handleFilterChange('category', e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Difficulty Level</Form.Label>
            <Form.Select 
              value={filters.difficulty}
              onChange={(e) => handleFilterChange('difficulty', e.target.value)}
            >
              <option value="">All Difficulties</option>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(diff => (
                <option key={diff} value={diff}>{diff}/10</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Col>
        
        <Col md={4}>
          <Form.Group>
            <Form.Label>Sort By</Form.Label>
            <Form.Select 
              value={filters.sort}
              onChange={(e) => handleFilterChange('sort', e.target.value)}
            >
              <option value="difficulty">Difficulty</option>
              <option value="title">Title</option>
              <option value="category">Category</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      {/* Mission Count */}
      <Row className="mb-3">
        <Col>
          <p className="text-muted">
            <i className="fas fa-info-circle me-2"></i>
            Showing {data?.length || 0} missions
          </p>
        </Col>
      </Row>

      {/* Mission Cards */}
      <Row>
        {data?.map((mission: Mission) => (
          <Col key={mission.id} lg={4} md={6} className="mb-4">
            <MissionCard mission={mission} />
          </Col>
        ))}
      </Row>

      {data && data.length === 0 && (
        <Row>
          <Col className="text-center py-5">
            <div className="text-muted">
              <i className="fas fa-search fa-3x mb-3"></i>
              <h4>No missions found</h4>
              <p>Try adjusting your filters to see more missions.</p>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default MissionList;
