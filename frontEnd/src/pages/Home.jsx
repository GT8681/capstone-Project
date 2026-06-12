import React, { useEffect, useState, useCallback } from "react";
import { customFetch } from '../API/api';
import { Container, Row, Col, Card, Badge, Spinner, Button,Modal } from "react-bootstrap";
import TopCarousel from '../components/caruselWelcome/carusel.jsx';
import { useNavigate } from "react-router-dom";
import RoleBadge from '../components/RoleBadge/RoleBadge.jsx';
import FiltriAvanzati from "./FiltriAvanzati.jsx";
import '../App.css';
import '../pages/Home.css';
import SoccerNews from '../pages/SoccerNews.jsx';
import ModalHome from '../components/modale /ModalHome.jsx';


const Home = () => {
    const [players, setPlayer] = useState([]);
    const [filters, setFilters] = useState({});
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState();
    const [playersForPage, setPlayersForPage] = useState(9);
    const [userFavorites, setUserFavorites] = useState();
    // 🚀 STATO PER LA MODALE DI AVVISO LOGIN
    const [showLoginModal, setShowLoginModal] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const indexOfLastPlayer1 = currentPage * playersForPage;
    const indexOfFirstPlayer2 = indexOfLastPlayer1 - playersForPage;
    const currentPlayer1 = players.slice(indexOfFirstPlayer2, indexOfLastPlayer1);
    const paginate1 = (pageNumber) => setCurrentPage(pageNumber);

    const handleFilterChange = useCallback((dati) => {
        setFilters(dati);
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        const fectchPlayer = async () => {
            setLoading(true);
            const filteredParams = {};

            Object.keys(filters).forEach(key => {
                const value = filters[key];
                if (value && value.length !== 0 && value !== "") {
                    filteredParams[key] = value;

                }
            });
            const query = new URLSearchParams(filteredParams).toString();
            try {
                const response = await customFetch(`players?${query}`, {
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
        fectchPlayer();
        fetchUserFavorites();
    }, [filters]);

    const handleFavorite = async (playerId) => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowLoginModal(true);
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

    // Logica di paginazione
    const indexOfLastPlayer = currentPage * playersForPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersForPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>

            <TopCarousel />
            <Container className="mt-3">

                <FiltriAvanzati onFilterChange={handleFilterChange} />


                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-danger">THE PLAYERS........</h2>
                </div>


                {/* LOGICA DELLO SPINNER OTTIMIZZATA */}
               {loading ? (
                              <div className="d-flex flex-column align-items-center justify-content-center my-5 gap-3">
                                  <Spinner
                                      animation="border"
                                      variant="danger" 
                                      style={{ width: '3rem', height: '3rem' }} 
                                      role="status"
                                  />
                                  <span className="text-muted fw-bold text-uppercase small tracking-wider">
                                      Caricamento Players...
                                  </span>
                              </div>
                ) : (
                    <Row className="g-4 justify-content-center">
                        {currentPlayers.map((player) => (
                            <Col key={player._id} xs={12} sm={6} md={4} lg={3}>
                                {/* CARD VERTICALE ULTRA PREMIUM */}
                                <Card className="border-0 main-player-card-vertical shadow-lg h-100 overflow-hidden">

                                    {/* 📸 SEZIONE TOP: FOTO GIOCATORE CON SFUMATURA */}
                                    <div className="main-player-img-wrapper position-relative d-flex align-items-end justify-content-center">
                                        <Card.Img
                                            src={player.avatar || './default-player.png'}
                                            className="main-player-avatar-vertical-fit"
                                        />

                                        {/* Badge del ruolo fluttuante sulla foto */}
                                        <span className="position-absolute top-3 start-3 main-badge-role">
                                            {player.role || 'CEN'}
                                        </span>

                                        {/* Cuore dei preferiti in alto a destra sulla foto */}
                                        <div
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleFavorite(player._id); 
                                               
                                            }}
                                            className="main-favorite-btn-position"
                                        >
                                            <i className={`bi ${userFavorites?.includes(player._id) ? 'bi-heart-fill text-danger neon-heart' : 'bi-heart text-white-50'}`} style={{ fontSize: '1.25rem' }}></i>
                                        </div>
                                    </div>

                                    {/* 📊 SEZIONE BOTTOM: DETTAGLI E INFORMAZIONI */}
                                    <Card.Body className="d-flex flex-column justify-content-between p-3 bg-main-card-dark text-white">
                                        <div>
                                            {/* Nome e Cognome */}
                                            <h5 className="text-uppercase fw-black mb-2 text-truncate main-player-title">
                                                <span className="text-white-50 d-block main-small-name text-capitalize">{player.name}</span>
                                                {player.surname}
                                            </h5>

                                            {/* Info Squadra / Nazionalità o Età se presenti */}
                                            <div className="d-flex gap-2 mb-3 flex-wrap">
                                                <Badge bg="secondary" className="bg-opacity-25 text-white-50 border border-secondary border-opacity-25 text-uppercase x-small-badge">
                                                    {player.team || 'Svincolato'}
                                                </Badge>
                                                <Badge bg="dark" className="bg-opacity-50 text-warning border border-warning border-opacity-25 x-small-badge">
                                                    ⭐ RATING: {player.rating}
                                                </Badge>
                                            </div>
                                        </div>

                                        {/* Bottone d'azione Cyber-Red */}
                                        <Button
                                            className="btn-action-details-horizontal w-100 fw-bold text-uppercase rounded-3 py-1.5 small"
                                            onClick={() => {
                                                if (!localStorage.getItem('token')) {
                                                    setShowLoginModal(true); // 🔥 Apre la modale se manca il token
                                                } else {
                                                    navigate(`/player-details/${player._id}`);

                                                }
                                            }}
                                        >
                                            📊 Vedi Scheda Scout
                                        </Button>
                                            {/* Modale di avviso login */}
                                            <ModalHome
                                                show={showLoginModal}
                                                onHide={() => setShowLoginModal(false)}
                                                title="Attenzione!"
                                                body="Devi essere loggato per visualizzare i dettagli del giocatore."
                                                onConfirm={() => {
                                                    setShowLoginModal(false);
                                                    navigate('/login');
                                                }}
                                                confirmText="Vai al Login"
                                                />
                                    </Card.Body>

                                </Card>
                            </Col>
                        ))}
                    </Row>

                )}

                <div className="d-flex justify-content-center mt-4 p-5 gap-2">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Precedente
                    </button>

                    <span className="align-self-center mx-2 text-black">
                        Pagina <strong>{currentPage}</strong>
                    </span>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={indexOfLastPlayer1 >= players.length}
                    >
                        Successiva
                    </button>
                </div>


                <SoccerNews />
            </Container >
        </>
    )
}
export default Home;