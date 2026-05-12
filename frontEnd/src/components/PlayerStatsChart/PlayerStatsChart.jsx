import React from 'react';
import { ProgressBar } from 'react-bootstrap';
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
    <div className="p-4 rounded-4 shadow-lg border border-secondary"
      style={{ background: 'rgba(0,0,0,0.8)', color: 'white' }}>

      <h3 className="text-danger mb-4 text-center fw-bold">SKILLS ANALYTICS</h3>

      {stats.map((stat, index) => (
        <div key={index} className="mb-4">
          <div className="d-flex justify-content-between mb-1">
            <span className="text-uppercase small fw-bold text-secondary">{stat.label}</span>
            <span className="fw-bold" style={{ color: '#fff' }}>{stat.value}</span>
          </div>
          <ProgressBar
            now={stat.value}
            variant={getColor(stat.value)} // Colore dinamico!
            style={{ height: '10px', borderRadius: '10px' }}
            className="bg-dark"
          />
        </div>
      ))}
    </div>
  );
};

export default PlayerStatsBars;

