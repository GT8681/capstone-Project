import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';

const StatsCardsDashboard = ({ players = [], setFilterRole, currentFilter }) => {
  if (!players || players.length === 0) {
    return <p>Caricamento Statistiche</p>
  }


  // Calcoliamo i conteggi qui dentro
  const stats = {
    POR: players.filter(p => p.role === 'POR').length,
    DIF: players.filter(p => p.role === 'DIF').length,
    CEN: players.filter(p => p.role === 'CEN').length,
    ATT: players.filter(p => p.role === 'ATT').length,
  };

  const cardStyle = (role) => ({
    cursor: 'pointer',
    transition: 'transform 0.2s',
    border: currentFilter === role ? '2px solid #000' : 'none',
    transform: currentFilter === role ? 'scale(1.05)' : 'scale(1)'
  });

  return (
    <Row className="mb-4 g-3 d-flex justify-content-center">
    
      {Object.keys(stats).map((roleKey) => {
        // Mappatura nomi ruoli per il filtro
        const roleMap = { POR: 'POR', DIF: 'DIF', CEN: 'CEN', ATT: 'ATT' };
        const fullRoleName = roleMap[roleKey];

        return (
          <>
            <Col xs={6} md={3} key={roleKey}>
              <Card
                onClick={() => setFilterRole(currentFilter === fullRoleName ? 'All' : fullRoleName)}
                style={cardStyle(fullRoleName)}
                className="text-center shadow-sm border border-3"

              >

                <Card.Body>
                  <h6 className="text-muted fw-bold">{roleKey}</h6>
                  <h2 className="fw-bold m-0">{stats[roleKey]}</h2>
                </Card.Body>
              </Card>
            </Col>
          </>
        );
      })}
    </Row>
  );
};

export default StatsCardsDashboard;
