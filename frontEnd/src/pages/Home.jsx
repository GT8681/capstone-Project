import React, { useEffect, useState } from "react";
import { customFetch } from '../API/api';
import { Container, Row, Col, Card, Badge, Spinner, Button } from "react-bootstrap";
import TopCarousel from '../components/caruselWelcome/carusel.jsx';
import { useNavigate } from "react-router-dom";
import RoleBadge from '../components/RoleBadge/RoleBadge.jsx';
import '../App.css';
import './Home.css'




const Home = () => {
    const [players, setPlayer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [playersForPage, setPlayersForPage] = useState(9);
    const [userFavorites, setUserFavorites] = useState();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fectchPlayer = async () => {
            try {
                const response = await customFetch('players', {
                    method: 'GET'
                });
                if (response.ok) {
                    const data = await response.json();
                    const playersArray = Array.isArray(data) ? data : (data.players || []);
                    setPlayer(playersArray);

                }
            } catch (error) {
                console.error('Errore durante il fetch dei giocatori:', error);
            } finally {
                setLoading(false);
            }
        }
        const fetchUserFavorites = async () => {
            const token = localStorage.getItem('token');
            if (!token) return;

            const resp = await customFetch('users/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await resp.json();
            setUserFavorites(data.favorites);
        }

        fetchUserFavorites();
        fectchPlayer();
    }, []);

    const handleFavorite = async (playerId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            alert("Accedi per salvare i tuoi preferiti!");
            return;
        }

        try {
            const response = await customFetch(`users/favorites/${playerId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Se il backend risponde OK, aggiorniamo la lista locale dei preferiti
                setUserFavorites(prev =>
                    prev.includes(playerId)
                        ? prev.filter(id => id !== playerId) // Lo togliamo
                        : [...prev, playerId] // Lo aggiungiamo
                );
            }
        } catch (err) {
            console.error("Errore preferiti:", err);
        }
    };

    if (loading)
        return
    <Container className="text-center mt-4">
        <Spinner animation="border" variant="success" />
        <p className="text-light mt-2 ">Caricamento Talenti</p>
    </Container>

    const indexOfLastPlayer = currentPage * playersForPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersForPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <TopCarousel />
            <Container className="mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-danger">THE PLAYERS........</h2>
                </div>

                <Row>
                    {currentPlayers.length > 0 ? (
                        currentPlayers.map((player) => (
                            <Col key={player._id} xs={12} md={6} lg={4} className="mb-4">
                                <Card className="h-100 box-shadow  text-white border-secondary">
                                    <div className="position-absolute top-0 end-0 p-2 d-flex flex-column align-items-end">
                                        <Badge pill bg="warning" text="dark" className="">
                                            {player.rating}
                                        </Badge>


                                    </div>
                                    <Card.Body className="position-relative">
                                        <div className="d-flex justify-content-center mb-3">
                                            <Card.Img variant='top' src={player.avatar} className="shadow-sm border-0 h-100 overflow-hidden " style={{ height: '240px', objectFit: 'cover' }} />
                                        </div>

                                        <div className="d-flex flex-column justify-content-between align-items-start mb-2">
                                            <Card.Title className="text-success">{player.name}</Card.Title>
                                            <Card.Title className="text-success">{player.surname}</Card.Title>
                                            <RoleBadge role={player.role} />

                                            <div className="d-flex justify-content-between align-items-center mb-2 gap-3">
                                            <small className="text-secondary">Salva nei preferiti:</small>
                                            <div
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    handleFavorite(player._id);
                                                }}
                                                style={{ cursor: 'pointer',
                                                         outline:'none',
                                                         userSelect:'none'
                                                }}
                                            >
                                                <i className={`bi ${userFavorites?.includes(player._id) ? 'bi-heart-fill text-danger neon-heart' : 'bi-heart text-muted'}`}
                                                    style={{ fontSize: '1.4rem' }}></i>
                                            </div>
                                        </div>
                                        </div>
                                        <hr className="border-secondary" />
                                        <div className="d-flex justify-content-between align-items-center">

                                            <Button
                                                className="btn-neon-cyan "
                                                onClick={() => {
                                                    if (!localStorage.getItem('token')) {
                                                        alert('Effettua il login per i dettagli');
                                                        navigate('/login');
                                                    } else {
                                                        navigate(`/player-details/${player._id}`);
                                                    }
                                                }}>
                                                Dettagli

                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))
                    ) : (
                        <Col className="text-center">
                            <p className="text-muted">Nessun giocatore trovato.</p>
                            <p className="text-muted">Inizia ad aggiungere i tuoi report di scouting!</p>
                        </Col>
                    )}
                </Row>
                <div className="d-flex justify-content-center mt-4">
                    <nav>
                        <ul className="pagination">
                            {Array.from({ length: Math.ceil(players.length / playersForPage) }).map((_, index) => (

                                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                                    <Button variant="outline-secondary" size="sm" onClick={() => paginate(index + 1)}>
                                        {index + 1}
                                    </Button>
                                </li>
                            ))}
                        </ul>
                    </nav>

                </div>

            </Container >
        </>
    )
}
export default Home;