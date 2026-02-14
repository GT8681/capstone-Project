import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const MyFooter = () => {
  return (
    <footer className="bg-dark text-white py-5 mt-auto border-top border-success">
      <Container>
        <Row className="align-items-center">
          
          <Col md={4} className="text-center text-md-start mb-3 mb-md-0">
            <h5 className="text-success fw-bold mb-1">SCOUT MASTER PRO</h5>
            <small className="text-muted">Capstone Project 2026</small>
          </Col>

       
          <Col md={4} className="text-center mb-3 mb-md-0">
            <p className="mb-0 small text-secondary">
              © {new Date().getFullYear()} - Sistema Scouting Professionale
            </p>
          </Col>

          
          <Col md={4} className="text-center text-md-end">
            <div className="d-flex justify-content-center justify-content-md-end gap-3">
              <a href="#" className="text-success text-decoration-none small">Privacy</a>
              <a href="#" className="text-success text-decoration-none small">Termini</a>
              <a href="mailto:support@scoutmaster.com" className="text-success text-decoration-none small">Contatti</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default MyFooter;
