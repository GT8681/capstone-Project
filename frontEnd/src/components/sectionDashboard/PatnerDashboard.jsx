import React from 'react';
import { customFetch } from '../../API/api.js';
import { useEffect, useState } from 'react';
import { Container, Table, Button, Spinner, Modal, Form, Row, Col, Alert } from 'react-bootstrap';
import StatsCardsDashboard from './StatsCardsDashboard.jsx';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import PlayerStatsBars from '../PlayerStatsChart/PlayerStatsChart.jsx';
import DeleteModal from '../modale /DeleteModal.jsx';

const PatnerDashboard = () => {
  const notify = () => toast("PLAYER AGGIUNTO");
  const [user1, setUser1] = useState(null);
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
    team: '',
    height: '',
    weight: '',
    nationality: '',
    age: '',
    avatar: '',
    description: '',
    velocita: 50,
    tiro: 50,
    colpoDiTesta: 50,
    passaggio: 50,
    dribbling: 50

  });
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null)
  const navigate = useNavigate();

  const stats = [
    { label: 'velocita', value: newPlayer.velocita || 0 },
    { label: 'tiro', value: newPlayer.tiro || 0 },
    { label: 'colpoDiTesta', value: newPlayer.colpoDiTesta || 0 },
    { label: 'passaggio', value: newPlayer.passaggio || 0 },
    { label: 'dribbling', value: newPlayer.dribbling || 0 }
  ];



  // Funzione per leggere i giocatori 
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


  //FUNZIONE PER CARICARE L'IMMAGINE DA CLOUDINARY
  const openWidget = () => {
    window.cloudinary.openUploadWidget(
      {
        cloudName: "db4uicads",
        uploadPreset: "ml_dafault",
        sources: ["local", "url", "camera"],
        multiple: false,
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log('Immagine caricata con successo', result.info.secure_url);
          // Quando la foto è caricata, Cloudinary ci dà l'URL sicuro
          setNewPlayer({ ...newPlayer, avatar: result.info.secure_url });
        }
      }
    );
  };

  useEffect(() => {
    fetchPlayers();
  }, []);

  useEffect(() => {
    const saveUser = JSON.parse(localStorage.getItem('user'));
    if (saveUser) setUser1(saveUser);
  }, []);

  // funzione per creare player

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('name', newPlayer.name);
    data.append('surname', newPlayer.surname);
    data.append('role', newPlayer.role);
    data.append('age', newPlayer.age);
    data.append('nationality', newPlayer.nationality);
    data.append('rating', newPlayer.rating);
    data.append('foot', newPlayer.foot);
    data.append('team', newPlayer.team);
    data.append('height', newPlayer.height);
    data.append('weight', newPlayer.weight);
    data.append('description', newPlayer.description);

    data.append('velocita', newPlayer.velocita);
    data.append('tiro', newPlayer.tiro);
    data.append('colpoDiTesta', newPlayer.colpoDiTesta);
    data.append('passaggio', newPlayer.passaggio);
    data.append('dribbling', newPlayer.dribbling);

    if (newPlayer.avatar) {
      data.append("avatar", newPlayer.avatar);
    }


    if (!newPlayer.name || !newPlayer.nationality || !newPlayer.avatar) {
      alert('Per favore, compila tutti i campi e carica la foto! ⚠️');
      return;
    }
    const token = localStorage.getItem('token');

    try {
      const response = await customFetch('players/add', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: data,

      });


      if (response.ok) {
        toast.success('Giocatore salvato con successo! ⚽️🔥');

        setTimeout(() => {
          window.location.reload();
        }, 3000)
        // alert('Giocatore salvato con successo! ⚽️🔥');

      } else {
        const errorData = await response.json();
        console.error("Errore dal server:", errorData);
        alert(`Errore: ${errorData.message || 'Controlla i dati'}`);
      }

    } catch (error) {
      console.error("Errore salvataggio:", error);
      alert(error.response?.newPlayer?.msg || 'Errore nel salvataggio. Riprova! ❌');
    }
  };


  // FUNZIONE PER CANCELLARE LA CARD PLAYER (Chiamata al click su "Elimina Ora" nella modale)
  const handleDeletePlayer = async () => {
    // Se non c'è nessun giocatore selezionato nello stato, esce subito
    if (!playerToDelete) return;

    const token = localStorage.getItem('token'); // Recuperiamo il token direttamente qui se serve

    try {
      const response = await customFetch(`players/${playerToDelete._id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Aggiorna lo stato dei player escludendo quello rimosso
        setPlayers((prevPlayers) => prevPlayers.filter(p => p._id !== playerToDelete._id));
        // NOTA: l'alert vecchio è stato rimosso, l'utente vede la card sparire fluidamente
      } else {
        alert("Errore durante l'eliminazione dal server");
      }
    } catch (error) {
      console.error("Errore delete:", error);
    } finally {
      // 🔥 Pulisce lo stato e chiude la modale in ogni caso (sia successo che errore)
      setPlayerToDelete(null);
      setShowDeleteModal(false);
    }
  };

  const user = localStorage.getItem('user');



  //FILTRO PER RUOLO DEL PLAYER
  const filteredPlyers = filterRole === 'All' ? players : players.filter(p => p.role === filterRole);

  return (

    <Container className="mt-5 text-white">
      <header className="dashboard-header text-primary">
        <h1>Bentornato, <span className="user-name text-black">{user1?.name}  {user1?.surname}</span></h1>
        <p>Hai il controllo completo del tuo roster</p>
      </header>

      <StatsCardsDashboard
        players={players}
        setFilterRole={setFilterRole}
        currentFilter={filterRole}
      />

      <div className="d-flex gap-5 align-items-center mb-4">

        <Button
          onClick={() => setFilterRole('All')}
          className={`btn ${filterRole === 'All' ? 'btn-neon-cyan' : 'btn-neon-cyan'}`}
        >
          <i className="me-4 fw-bold fs-4">    ALL PLAYERS :  {players.length}</i>
        </Button>

        <Button variant="info" className="fw-bold btn-neon-red" onClick={() => setShowModal(true)} >
          <i className="bi bi-plus-circle me-4 fw-bold fs-4"> ADD PLAYER</i>
        </Button>
      </div>
      {loading ? (
        <Spinner animation="border" variant="info" />
      ) : (
        <Table striped bordered hover variant="" responsive>
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
                  <Button className='btn btn-info btn-sm  btn-neon-cyan m-3'
                    onClick={() => {
                      setSelectedPlayer(player);
                      setShowDetailsModal(true);
                    }}
                  >
                    Dettagli

                  </Button>
                  <Button
                    variant="outline-warning btn-neon-red "
                    size="sm"
                    className=" m-3 "
                    onClick={() => navigate(`/players/edit-players/${player._id}`)}
                  >
                    <i className='bi bi-pencil-square'></i>  MODIFICA</Button>

                  <Button
                    variant="outline-warning btn-neon-red "
                    className="btn-sm border-0 text-dark bg-danger-subtle m-3"
                    onClick={() => {
                      setPlayerToDelete(player); // 1. Salvi il player corrente che si vuole cancellare
                      setShowDeleteModal(true);  // 2. Apri la modale di conferma
                    }}
                  >
                    <i className="bi bi-trash3"></i>
                    cancella
                  </Button>

                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* ... resto del tuo layout ... */}

      <DeleteModal 
    show={showDeleteModal} 
    onHide={() => {
        setShowDeleteModal(false);
        setPlayerToDelete(null);
    }} 
    onConfirm={handleDeletePlayer}
    // 🚀 Il fallback sicuro evita che passi elementi indefiniti
    itemName={playerToDelete ? `${playerToDelete.name} ${playerToDelete.surname}` : ''} 
/>




      <Modal show={showModal} onHide={() => setShowModal(false)} centered size="lg">
        <Modal.Header closeButton className="bg-dark text-white border-secondary">
          <Modal.Title>Aggiungi Nuovo Talento</Modal.Title>
        </Modal.Header>
        <Modal.Body className="bg-dark text-white">
          <Form onSubmit={handleSubmit}>
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
            <Row>
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
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>velocita ({newPlayer.velocita})</Form.Label>
                  <Form.Range
                    min="0"
                    max="100"
                    name="velocita"
                    onChange={(e) => setNewPlayer({ ...newPlayer, velocita: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>tiro ({newPlayer.tiro})</Form.Label>
                  <Form.Range
                    min="0"
                    max="100"
                    name="tiro"
                    onChange={(e) => setNewPlayer({ ...newPlayer, tiro: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>colpoDiTesta ({newPlayer.colpoDiTesta})</Form.Label>
                  <Form.Range
                    min="0"
                    max="100"
                    name="colpoDiTesta"
                    onChange={(e) => setNewPlayer({ ...newPlayer, colpoDiTesta: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>passaggio ({newPlayer.passaggio})</Form.Label>
                  <Form.Range
                    min="0"
                    max="100"
                    name="passaggio"
                    onChange={(e) => setNewPlayer({ ...newPlayer, passaggio: e.target.value })}
                  />
                </Form.Group>
              </Col>
              <Col md={4}>
                <Form.Group className="mb-3">
                  <Form.Label>dribbling ({newPlayer.dribbling})</Form.Label>
                  <Form.Range
                    min="0"
                    max="100"
                    name="dribbling"
                    onChange={(e) => setNewPlayer({ ...newPlayer, dribbling: e.target.value })}
                  />
                </Form.Group>
              </Col>
            </Row>




            <div className="container mt-4">
              <button type="button" className="btn btn-primary mb-3" onClick={openWidget}>
                Seleziona Foto Giocatore
              </button>

              {/* Anteprima per l'utente così vede che ha caricato */}
              {newPlayer.avatar && (
                <div className="mb-3">
                  <img src={newPlayer.avatar} alt="Anteprima" style={{ width: '100px', borderRadius: '10px' }} />
                  <p className="text-success small">Immagine caricata correttamente! ✅</p>
                </div>
              )}
            </div>
            <Form.Group className="mb-3">
              <Form.Label>Descrizione Talento</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Inserisci le caratteristiche tecniche..."
                name="description"
                value={newPlayer.description}
                onChange={(e) => setNewPlayer({ ...newPlayer, description: e.target.value })}
              />
            </Form.Group>
            <Button variant="info" type="submit" className="w-100 fw-bold mt-3">
              Salva nel Database
            </Button>
            <ToastContainer />

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
          <hr />
          {/*
          <p><strong>Velocita:</strong> {selectedPlayer?.velocita}</p>
          <p><strong>Tiro:</strong> {selectedPlayer?.tiro}</p>
          <p><strong>Colpo di Testa:</strong> {selectedPlayer?.colpoDiTesta}</p>
          <p><strong>Passaggio:</strong> {selectedPlayer?.passaggio}</p>
          <p><strong>Dribbling:</strong> {selectedPlayer?.dribbling}</p>
          */}

          <PlayerStatsBars player={selectedPlayer} />


        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary btn-neon-red " onClick={() => setShowDetailsModal(false)}>
            Chiudi
          </Button>
        </Modal.Footer>
      </Modal>


    </Container>
  );
};

export default PatnerDashboard;
