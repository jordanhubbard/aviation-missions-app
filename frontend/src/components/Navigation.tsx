import React, { useState } from 'react';
import { Navbar, Nav, Container, Button, Modal, Form, Alert } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { adminApi, setAdminToken, clearAdminToken, isAdmin } from '../services/api';

const Navigation: React.FC = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginForm, setLoginForm] = useState({ admin_name: '', password: '' });
  const [loginError, setLoginError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [adminLoggedIn, setAdminLoggedIn] = useState(isAdmin());

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setLoginError('');
    
    try {
      const response = await adminApi.login(loginForm);
      setAdminToken(response.data.token);
      setAdminLoggedIn(true);
      setShowLoginModal(false);
      setLoginForm({ admin_name: '', password: '' });
    } catch (error: any) {
      setLoginError(error.response?.data?.error || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    clearAdminToken();
    setAdminLoggedIn(false);
  };

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <i className="fas fa-plane me-2"></i>
              Aviation Mission Manager v2.1
            </Navbar.Brand>
          </LinkContainer>
          
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/">
                <Nav.Link>Missions</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/submit">
                <Nav.Link>Submit Mission</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/challenges">
                <Nav.Link>Challenges</Nav.Link>
              </LinkContainer>
              {adminLoggedIn && (
                <LinkContainer to="/admin">
                  <Nav.Link>Admin Panel</Nav.Link>
                </LinkContainer>
              )}
            </Nav>
            
            <Nav>
              <Nav.Link href="/docs/" target="_blank">
                <i className="fas fa-code me-1"></i>
                API Docs
              </Nav.Link>
              
              {adminLoggedIn ? (
                <Button variant="outline-light" size="sm" onClick={handleLogout}>
                  <i className="fas fa-sign-out-alt me-1"></i>
                  Admin Logout
                </Button>
              ) : (
                <Button variant="outline-light" size="sm" onClick={() => setShowLoginModal(true)}>
                  <i className="fas fa-user-shield me-1"></i>
                  Admin Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Admin Login Modal */}
      <Modal show={showLoginModal} onHide={() => setShowLoginModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loginError && (
            <Alert variant="danger">
              {loginError}
            </Alert>
          )}
          
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Admin Name</Form.Label>
              <Form.Control
                type="text"
                value={loginForm.admin_name}
                onChange={(e) => setLoginForm({...loginForm, admin_name: e.target.value})}
                placeholder="Enter admin username"
                required
              />
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({...loginForm, password: e.target.value})}
                placeholder="Enter password"
                required
              />
            </Form.Group>
            
            <div className="d-grid">
              <Button type="submit" variant="primary" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>
            </div>
          </Form>
          
          <div className="mt-3">
            <small className="text-muted">
              Demo credentials: admin / aviation123
            </small>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Navigation;
