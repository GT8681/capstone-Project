import React from 'react';
import { customFetch } from '../../API/api';
import { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Modal, Form, Row, Col } from 'react-bootstrap';

const PatnerDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    surname: '',
    role: '',
    rating:'',
    foot: ''
  });

  // 1. Funzione per leggere i giocatori (READ)
  const fetchPlayers = async () => {
    try {
      const response = await customFetch('players'); // Assicurati che l'URL sia corretto
      const data = await response.json();
      setPlayers(data);
    } catch (error) {
      console.error("Errore nel caricamento:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  // funzione per creare player
  const handleSubmitPlayer = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    const dataToSend = new FormData();
    dataToSend.append('name',newPlayer.name);
    dataToSend.append('surname',newPlayer.surname);
    dataToSend.append('role',newPlayer.role);
    dataToSend.append('rating',newPlayer.rating);
    dataToSend.append('foot',newPlayer.foot);
    if(newPlayer.image){
      dataToSend.append('foto',newPlayer.image);
    }
    console.log('dataToSend',newPlayer.image);
    
    try {
      const response = await fetch('http://localhost:4545/players/add', {
        method: 'POST',
        headers: {
          
          'Authorization': `Bearer ${token}`
        },
        body:dataToSend    
      });
       if (response.ok) {
        
        setShowModal(false); // Chiudi il modal
        fetchPlayers(); // Ricarica la tabella automaticamente!
        alert("Giocatore salvato con successo!");
      } else {
        const errorData = await response.json();
        console.log('Errore dettagliato;',errorData);

      }
    } catch (error) {
      console.error("Errore nell'invio:", error);
    }
  };

  const handleDeletePlayer =  async(playerId) =>{
    if(window.confirm('Sei sicuro di voler eliminarlo')){
      const token = localStorage.getItem('token');
        try {
          const response = await fetch(`http://localhost:4545/players/${playerId}`,{
            method: 'DELETE',
            headers:{
              'Authorization':`Bearer ${token}`
            }
          })
          if(response.ok){
                 setPlayers(players.filter(p =>p._id !== playerId))
                 alert('Player Rimosso....');
          }else{
            alert("Errore durante l'eliminazione");
          }
        } catch (error) {
          console.log("errore delete",error);
        }
    }
  }


  return (
    <Container className="mt-5 text-white">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Area Gestione Calciatori (PRO)</h2>
        <Button variant="info" className="fw-bold" onClick={() => setShowModal(true)} >
          <i className="bi bi-plus-circle me-2"></i>Aggiungi Talento
        </Button>
      </div>

      {loading ? (
        <Spinner animation="border" variant="info" />
      ) : (
        <Table striped bordered hover variant="dark" responsive>
          <thead>
            <tr>
              <th></th>
              <th>Name Surname</th>
              <th>Role</th>
              <th>Rating</th>
              <th>Foot</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player) => (
              <tr key={player._id}>
                <td><img src={player.avatar} alt="player" style={{ width: '60px', borderRadius: '100%' }} /></td>
                <td>{player.name} {player.surname}</td>
                <td>{player.role}</td>
                <td>{player.foot} </td>
                <td>
                  <Button variant="outline-warning" size="sm" className="me-2">Edit</Button>
                  <Button 
                  variant="outline-danger"
                   size="sm"
                   onClick={() => handleDeletePlayer(player._id)}
                   >Elimina</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}


      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>Aggiungi Nuovo Talento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={handleSubmitPlayer}>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Es: Francesco"
                    onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Cognome</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Es: Totti"
                    onChange={(e) => setNewPlayer({ ...newPlayer, surname: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Rating</Form.Label>
                  <Form.Select onChange={(e) => setNewPlayer({ ...newPlayer, rating: e.target.value })}>
                    <option>Seleziona Rating</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </Form.Select>
                </Form.Group>
              </Col>

            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select onChange={(e) => setNewPlayer({ ...newPlayer, role: e.target.value })}>
                <option>Seleziona Ruolo</option>
                <option value="ATT">Attaccante</option>
                <option value="CEN">Centrocampista</option>
                <option value="DIF">Difensore</option>
                <option value="POR">Portiere</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foot</Form.Label>
              <Form.Select onChange={(e) => setNewPlayer({ ...newPlayer, foot: e.target.value })}>
                <option>Seleziona Foot</option>
                <option value="DESTRO">DESTRO</option>
                <option value="SINISTRO">SINISTRO</option>
                <option value="AMBIDESTRO">AMBIDESTRO</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Foto Player</Form.Label>
              <Form.Control
              type='file' 
              onChange={(e) => setNewPlayer({ ...newPlayer, image: e.target.files[0] })}/>
            </Form.Group>



            <Button variant="info" type="submit" className="w-100 fw-bold mt-3">
              Salva nel Database
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

    </Container>
  );
};

export default PatnerDashboard;
