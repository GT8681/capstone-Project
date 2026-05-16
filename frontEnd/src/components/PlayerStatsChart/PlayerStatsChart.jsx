import React from 'react';
import { ProgressBar,Container,Row,Col } from 'react-bootstrap';
import './PlayerStatsChart.css';

const PlayerStatsBars = ({ player }) => {
  // Funzione per scegliere il colore in automatico in base al valore
  const getColor = (value) => {
    if (value >= 75) return 'success'; // Verde
    if (value >= 50) return 'warning'; // Giallo
    return 'danger'; // Rosso
  };

  // Mappiamo i dati del tuo database
  const stats = [
    { label: 'velocita', value: player.velocita || 0 },
    { label: 'tiro', value: player.tiro || 0 },
    { label: 'colpoDiTesta', value: player.colpoDiTesta || 0 },
    { label: 'passaggio', value: player.passaggio || 0 },
    { label: 'dribbling', value: player.dribbling || 0 }
  ];

  return (
 
    <>
      <Container >
           
        <Row className="justify-content-center">
          
          <Col xs={12} md={6} lg={12}>
            <div 
              className="stats-container  rounded shadow-lg text-white" 
              style={{ backgroundColor: '#2d2d37' }}
            >
              <h3 className="text-center text-danger mb-3 fw-bold">
                SKILLS ANALYTICS
              </h3>
              
              {/* Il .map cicla direttamente i blocchi in verticale senza d-flex esterni che schiacciano il layout */}
              {stats.map((stat, index) => (
                <div key={index} className="mb-4">
                  
                  {/* Questa riga allinea l'etichetta a sinistra e il valore numerico a destra */}
                  <div className="d-flex justify-content-between mb-1">
                    <span className="text-uppercase small fw-bold text-secondary">
                      {stat.label}
                    </span>
                    <span className="fw-bold" style={{ color: '#fff' }}>
                      {stat.value}
                    </span>
                  </div>
                  
                  {/* Barra del progresso nativa di React-Bootstrap */}
                  <ProgressBar 
                    now={stat.value} 
                    variant={getColor(stat.value)} // Mantiene il tuo colore dinamico (verde, giallo, rosso)
                    style={{ height: '10px', borderRadius: '10px' }}
                    className="bg-dark"
                  />
                </div>
              ))}
            </div>
          </Col>
        </Row>
      </Container>
      </>
    )
};

export default PlayerStatsBars;

