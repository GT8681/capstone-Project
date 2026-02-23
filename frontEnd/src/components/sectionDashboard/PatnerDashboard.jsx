import React from 'react';
import { customFetch } from '../../API/api.js';
import { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Modal, Form, Row, Col, Card } from 'react-bootstrap';
import StatsCardsDashboard from './StatsCardsDashboard.jsx';

const PatnerDashboard = () => {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [filterRole, setFilterRole] = useState('All');
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    surname: '',
    role: '',
    rating: '',
    foot: '',
    team:'',
    height:'',
    weight:'',
    nationality:''

  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  // 1. Funzione per leggere i giocatori (READ)
  const fetchPlayers = async () => {
    try {
      const response = await customFetch('players/my-players');
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
    dataToSend.append('name', newPlayer.name);
    dataToSend.append('surname', newPlayer.surname);
    dataToSend.append('role', newPlayer.role);
    dataToSend.append('rating', newPlayer.rating);
    dataToSend.append('foot', newPlayer.foot);
    dataToSend.append('description', newPlayer.description);
    dataToSend.append('nationality', newPlayer.nationality);
    dataToSend.append('weight', newPlayer.weight);
    dataToSend.append('height', newPlayer.height);
    dataToSend.append('team', newPlayer.team);
    dataToSend.append('age', newPlayer.age);


    if (newPlayer.image) {
      dataToSend.append('foto', newPlayer.image);
    }
    try {
      const response = await fetch('http://localhost:4545/players/add', {
        method: 'POST',
        headers: {

          'Authorization': `Bearer ${token}`
        },
        body: dataToSend
      });
      if (response.ok) {

        setShowModal(false); // Chiudi il modal
        fetchPlayers(); // Ricarica la tabella automaticamente!
        alert("Giocatore salvato con successo!");
      } else {
        const errorData = await response.json();
        alert('ATTENZIONE PLAYER GIA INSERITO DA UN ALTRO UTENTE');
        console.log('Errore dettagliato;', errorData);

      }
    } catch (error) {
      console.error("Errore nell'invio:", error);
    }
  };

  const handleDeletePlayer = async (playerId) => {
    if (window.confirm('Sei sicuro di voler eliminarlo')) {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:4545/players/${playerId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          setPlayers((upDatePlayers) => upDatePlayers.filter(player => player._id !== playerId));
          alert('Player Rimosso....');
        } else {
          alert("Errore durante l'eliminazione");
        }
      } catch (error) {
        console.log("errore delete", error);
      }
    }
  }
  const filteredPlyers = filterRole === 'All' ? players : players.filter(p => p.role === filterRole);

  return (
    <Container className="mt-5 text-white">


      <StatsCardsDashboard
        players={players}
        setFilterRole={setFilterRole}
        currentFilter={filterRole}
      />

      <div className="d-flex gap-5 align-items-center mb-4">

        <Button
          onClick={() => setFilterRole('All')}
          className={`btn ${filterRole === 'All' ? 'btn-primary' : 'btn-outline-dark'}`}
        >
          <i className="bi bi-plus-circle me-4 fw-bold fs-4">    ALL PLAYERS :  {players.length}</i>
        </Button>

        <Button variant="info" className="fw-bold" onClick={() => setShowModal(true)} >
          <i className="bi bi-plus-circle me-4 fw-bold fs-4">     ADD PLAYER</i>
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
              <th>Foot</th>
              <th></th>
            </tr>
          </thead>
          <tbody>

            {filteredPlyers.map((player) => (
              <tr key={player._id}>
                <td><img src={player.avatar} alt="player" style={{ width: '60px', borderRadius: '100%' }} /></td>
                <td>{player.name} {player.surname}</td>
                <td>{player.role}</td>
                <td>{player.foot} </td>
                <td>
                  <Button className='btn btn-info btn-sm me-2'
                    onClick={() => {
                      setSelectedPlayer(player);
                      setShowDetailsModal(true);
                    }}
                  >
                    Dettagli

                  </Button>
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
            <Row>
              <Col md={4}>
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
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Foot</Form.Label>
                  <Form.Select onChange={(e) => setNewPlayer({ ...newPlayer, foot: e.target.value })}>
                    <option>Seleziona Foot</option>
                    <option value="DESTRO">DESTRO</option>
                    <option value="SINISTRO">SINISTRO</option>
                    <option value="AMBIDESTRO">AMBIDESTRO</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Nationality</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Es: Italia"
                    onChange={(e) => setNewPlayer({ ...newPlayer, nationality: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
            <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Team</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="inserisci il tuo Team..."
                    onChange={(e) => setNewPlayer({ ...newPlayer, team: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Height</Form.Label>
                  <Form.Control
                    type="number"
                    step='0.01'
                    min='1.00'
                    max='2.50'
                    name='heigth'
                    placeholder="la tua altezza..."
                    onChange={(e) => setNewPlayer({ ...newPlayer, height: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Weight</Form.Label>
                  <Form.Control
                    type="number"
                    name='weight'
                    placeholder="il tuo peso..."
                    onChange={(e) => setNewPlayer({ ...newPlayer, weight: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>

            </Row>
            <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    min='1'
                    max='100'
                    placeholder="la tua eta'...."
                    onChange={(e) => setNewPlayer({ ...newPlayer, age: e.target.value })}
                    required
                  />
                </Form.Group>
              </Col>

            <Form.Group className="mb-3">
              <Form.Label>Foto Player</Form.Label>
              <Form.Control
                type='file'
                onChange={(e) => setNewPlayer({ ...newPlayer, image: e.target.files[0] })} />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Descrizione Talento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci le caratteristiche tecniche..."
                name="description"
                value={newPlayer.description}
                onChange={(e) => setNewPlayer({ ...newPlayer, description: e.target.value })} // Assicurati che gestisca il valore
              />
            </Form.Group>
            <Button variant="info" type="submit" className="w-100 fw-bold mt-3">
              Salva nel Database
            </Button>

          </Form>
        </Modal.Body>
      </Modal>

      {/* MODALE DETTAGLI */}
      <Modal show={showDetailsModal} onHide={() => setShowDetailsModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Scheda di {selectedPlayer?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p><strong>Cognome:</strong> {selectedPlayer?.surname}</p>
          <p><strong>Ruolo:</strong> {selectedPlayer?.role}</p>
          <p><strong>Age:</strong> {selectedPlayer?.age}</p>
          <p><strong>nationality:</strong> {selectedPlayer?.nationality}</p>
          <p><strong>Foot:</strong> {selectedPlayer?.foot}</p>
          <p><strong>Rating:</strong> {selectedPlayer?.rating}</p>
          <p><strong>Age:</strong> {selectedPlayer?.age}</p>
          <p><strong>Peso:</strong> {selectedPlayer?.weight}</p>
          <p><strong>Altezza:</strong> {selectedPlayer?.height}</p>
          <hr />
          <h5>Descrizione:</h5>
          <p>{selectedPlayer?.description || "Nessuna descrizione inserita per questo giocatore."}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDetailsModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>


    </Container>
  );
};

export default PatnerDashboard;
