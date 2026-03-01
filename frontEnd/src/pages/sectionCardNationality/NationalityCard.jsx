import React from 'react';
import './NationalityCard.CSS'
import { useNavigate } from 'react-router-dom';
import { Carousel, Container, Row, Col } from 'react-bootstrap';
import imgItalia from "../../../public/italia-card.jpg";
import imgBrasile from "../../../public/brasile-card.jpg";
import imgArgentina from "../../../public/argentina-card.jpeg";
import imgInglese from "../../../public/inglese.jpeg";
import imgMarocco from "../../../public/marocco-card.jpeg";
import imgFrancia from "../../../public/francia-card.jpg";

// 1. Definiamo la Card singola (quella con la freccina)
const NationalityCard = ({ title, image, color, nationality }) => {
  const navigate = useNavigate();
  return (
    <div className="col-md-4 mb-4">
      <div
        className="card border-0 shadow h-100"
        style={{ borderRadius: '60px', overflow: 'hidden', cursor: 'pointer' }}
        onClick={() => navigate(`/players/Nationality-players/${nationality}`)}
      >
        <div className="d-flex justify-content-center overflow-y-hidden" style={{ height: '200px', background: '#f8f9fa' }}>
          <img src={image} style={{ maxHeight: '100%', objectFit: 'cover' }} alt={title} />
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

const SectionNationality = () => {
  return (
    
    <Conteiner-fluid>

    
       <h1 className='text-danger p-4 mb-3'>
          Player di tutto il mondo.....
        </h1>
      <Carousel className='Row-auto m-auto'>
       
        <Carousel.Item interval={2000} className='flex-nowrap'>
          <Col className='d-flex col-auto p-3 m-3 gap-5'>
            <NationalityCard title="FORZA ITALIA" image={imgItalia} color="#0055A4" nationality="italia" />
            <NationalityCard title="BRASILE" image={imgBrasile} color="#009739" nationality="brasile" />
            <NationalityCard title="ARGENTINA" image={imgArgentina} color="#74ACDF" nationality="argentina" />
          </Col>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <Col className='d-flex col-auto p-3 m-3 gap-5'>
          <NationalityCard title="INGLESE" image={imgInglese} color="#a83232" nationality="inglese" />
          <NationalityCard title="MAROCCO" image={imgMarocco} color="#a85632" nationality="marocchina" />
          <NationalityCard title="FRANCIA" image={imgFrancia} color="#3262a8" nationality="francese" />
          </Col>
        </Carousel.Item>
      </Carousel>
      
      </Conteiner-fluid>
  );
};

export default SectionNationality;
