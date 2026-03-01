import React from 'react';
import { useNavigate } from 'react-router-dom';

// 1. Definiamo la Card singola (quella con la freccina)
const NationalityCard = ({ title, image, color, nationality }) => {
  const navigate = useNavigate();
  return (
    <div className="col-md-4 mb-4">
      <div 
        className="card border-0 shadow h-100" 
        style={{ borderRadius: '15px', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => navigate(`/players/nationality/${item.nationality}`)}
      >
        <div className="d-flex justify-content-center p-3" style={{ height: '200px', background: '#f8f9fa' }}>
          <img src={image} style={{ maxHeight: '100%', objectFit: 'contain' }} alt={title} />
        </div>
        <div className="p-3 d-flex justify-content-between align-items-center text-white" style={{ backgroundColor: color }}>
          <h5 className="m-0 fw-bold">{title}</h5>
          <div className="bg-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '35px', height: '35px' }}>
            <span style={{ color: color }}>➔</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// 2. Esportiamo il "Contenitore" completo
const SectionNationality = () => {
  return (
    <div className="container my-5">
      <h2 className="text-center mb-4 fw-bold">CATEGORIE NAZIONALI</h2>
      <div className="row">
        <NationalityCard title="ITALIA" image="link_italia.png" color="#0055A4" nationality="italia" />
        <NationalityCard title="BRASILE" image="link_brasile.png" color="#009739" nationality="brasile" />
        <NationalityCard title="ARGENTINA" image="link_argentina.png" color="#74ACDF" nationality="argentina" />
      </div>
    </div>
  );
};

export default SectionNationality;
