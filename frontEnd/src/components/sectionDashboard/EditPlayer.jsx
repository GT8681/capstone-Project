import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { customFetch } from '../../API/api';
import { Container, Row, Col } from 'react-bootstrap';



const EditPlayer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    role: '',
    rating: '',
    foot: '',
    team: '',
    height: '',
    weight: '',
    nationality: '',
    age: '',
    avatar: '',
    description: ''
  });

  // 1. Carichiamo i dati del giocatore da modificare
  useEffect(() => {
    if (!id) return;
    const fetchPlayer = async () => {
      const response = await customFetch(`players/${id}`);
     
      const data = await response.json();
   

      if (response.ok) {
        setFormData(data);

      }
    };
    fetchPlayer();
  }, [id]);


  // 2. Gestiamo il salvataggio
  const handleUpdate = async (e) => {
    e.preventDefault();
    
    try {
      const response = await customFetch(`players/edit/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
        

      });

      
      if (response.ok) {

        alert("Giocatore aggiornato con successo! ⚽");
        navigate('/Patner-dashboard');
  

      }
    } catch (err) {
      console.error("Errore update:", err);
    }
  };

  if (!formData) {
    return (
      <div className="container text-center mt-5">
        <div className="spinner-border text-success" role="status"></div>
        <h2 className="mt-3 text-dark">Caricamento dati giocatore...</h2>
      </div>
    );
  }


  return (
    <Container>
      <form onSubmit={handleUpdate} className="p-4 shadow-lg rounded bg-white">
        <h3 className="text-center mb-4 text-primary">Modifica Profilo Player</h3>
        <Row>
          
          <Col md={4}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
              <label htmlFor="floatingName">Name Player</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="surname"
                placeholder="surname"
                value={formData.surname}
                onChange={(e) => setFormData({ ...formData, surname: e.target.value })}
              />
              <label htmlFor="floatingName">Surname Player</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="age"
                placeholder="Age"
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              />
              <label htmlFor="floatingName">Age</label>
            </div>
          </Col>
          <Col md={4}>
            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="floatingSelectFoot"
                value={formData.foot}
                onChange={(e) => setFormData({ ...formData, foot: e.target.value })}
              >
                <option value="DESTRO">DESTRO</option>
                <option value="SINISTRO">SINISTRO</option>
                <option value="AMBIDESTRO">AMBIDESTRO</option>

              </select>
              <label htmlFor="floatingSelect">FOOT</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="floatingSelectRole"
                value={formData.role}
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <option value="ATT">ATT </option>
                <option value="DIF">DIF </option>
                <option value="CEN">CEN </option>
                <option value="POR">POR </option>
              </select>
              <label htmlFor="floatingSelect">Role</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="description"
                placeholder="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <label htmlFor="floatingName">description</label>
            </div>
          </Col>

          <Col md={4}>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="height"
                placeholder="height"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
              />
              <label htmlFor="floatingName">height</label>
            </div>

            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="weight"
                placeholder="weight"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              />
              <label htmlFor="floatingName">weight</label>
            </div>

            <div className="form-floating mb-3">
              <select
                className="form-select"
                id="floatingSelect"
                value={formData.nationality}
                onChange={(e) => setFormData({ ...formData, nationality: e.target.value })}
              >
                <option value="italiana">Italiana 🇮🇹</option>
                <option value="brasiliana">Brasiliana 🇧🇷</option>
                <option value="argentina">Argentina 🇦🇷</option>
                <option value="marocchina">Marocchina 🇲🇦</option>
              </select>
              <label htmlFor="floatingSelect">Nazionalità</label>
            </div>
          </Col>
          <div className="mb-3">
            <label className="form-label fw-bold">URL Immagine Avatar</label>
            <input
              type="text"
              className="form-control"
              placeholder="Incolla l'URL della foto (jpg, png...)"
              value={formData.avatar}
              onChange={(e) => setFormData({ ...formData, avatar: e.target.value })}
            />
            <div id="avatarHelp" className="form-text">
              Usa un link diretto a un'immagine online.
            </div>
          </div>
        </Row>

        {/* BOTTONI */}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end mt-4">
          <button type="button" className="btn btn-outline-secondary me-md-2" onClick={() => navigate(-1)}>
            Annulla
          </button>
          <button type="submit" className="btn btn-primary px-5">
            Salva modifiche
          </button>
        </div>
      </form>

    </Container>
  );
}

export default EditPlayer;
