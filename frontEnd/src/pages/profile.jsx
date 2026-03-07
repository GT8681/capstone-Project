import React, { useState, useEffect } from 'react';
import { Container, Card, Row, Col, ListGroup, Nav, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
  
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUserData(JSON.parse(savedUser));
    }
  }, []);

  if (!userData) {
    return (
      <Container className="mt-5 text-center text-white">
        <h3>Effettua il login per accedere al profilo</h3>
      </Container>
    );
  }
  
  return (
    <Container className="mt-5">
      <Row className="justify-content-center mb-4">
        <Col md={6}>
          <Card bg="dark" text="white" className="border-secondary shadow-lg">
            <Card.Header className="bg-dark border-secondary text-white text-center py-3">
              <h2 className="mb-0">Area Personale</h2>
            </Card.Header>
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <div className="d-inline-flex align-items-center justify-content-center rounded-circle bg-info text-dark fw-bold"
                  style={{ width: '80px', height: '80px', fontSize: '2rem' }}>
                  {userData.name?.charAt(0)}{userData.surname?.charAt(0)}
                </div>
              </div>

              <ListGroup variant="flush">
                <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
                  <strong>Nome:</strong> <span>{userData.name}</span>
                </ListGroup.Item>
                <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
                  <strong>cognome:</strong> <span>{userData.surname}</span>
                </ListGroup.Item>

                <ListGroup.Item className="bg-dark text-white border-secondary d-flex justify-content-between">
                  <strong>Email:</strong> <span>{userData.email}</span>
                </ListGroup.Item>
                <div className='Role mt-3'>
                  <Badge bg={userData.role === 'PatnerPro' ? 'danger' : 'info'} className="mb-3 text-blacks">
                    {userData.role === 'PatnerPro' ? 'PatnerPro' : 'user'}
                 
                  </Badge>
                </div>

                <ListGroup>
                  <div className='d-flex justify-content-center mt-4'>
                    <Nav.Link as={Link} to="/">HOME</Nav.Link>
                  </div>
                </ListGroup>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Profile;
