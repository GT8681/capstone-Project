import { Card, Badge, Container, Row, Col, Button, Spinner,Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '../../API/api';
import React, { useEffect, useState } from "react";
import '../../App.css';
import '../playerPromising/playerPromising.css';
import ModalHome from '../modale /ModalHome.jsx';

const PromisingPlayers = ({ players }) => {
    // Filtriamo i "promettenti" (voto >= 9 o >= 10 in base alla tua logica)
    const topProspects = (players || []).filter(player => Number(player.rating) >= 10);

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [playersForPage] = useState(3);
    const [userFavorites, setUserFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    // 🚀 STATO PER LA MODALE DI AVVISO LOGIN
    const [showLoginModal, setShowLoginModal] = useState(false);

    const indexOfLastPlayer = currentPage * playersForPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersForPage;
    const currentPlayers = topProspects.slice(indexOfFirstPlayer, indexOfLastPlayer);

    useEffect(() => {
        const fetchUserFavorites = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setUserFavorites([]);
                setLoading(false); // 🔥 FIX fondamentale: spegne lo spinner anche se non sei loggato!
                return;
            }
            try {
                const resp = await customFetch('users/me', {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (resp.ok) {
                    const data = await resp.json();
                    setUserFavorites(data.favorites || []);
                }
            } catch (err) {
                console.error("Errore nel recupero dei preferiti:", err);
                setUserFavorites([]);
            } finally {
                setLoading(false);
            }
        };

        fetchUserFavorites();
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
                setUserFavorites(prev =>
                    prev.includes(playerId)
                        ? prev.filter(id => id !== playerId)
                        : [...prev, playerId]
                );
            }
        } catch (err) {
            console.error("Errore preferiti:", err);
        }
    };

    return (
        <Container className="mt-5">
            <h2 className="text-dark fw-black text-uppercase tracking-wide text-center mb-5" style={{ letterSpacing: '1px' }}>
                🌟 PROSPETTI <span className="text-danger">TOP PROSPECT</span> 🌟
            </h2>

            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <Button variant="outline-danger" disabled className="px-4 py-2 rounded-pill shadow">
                        <Spinner
                            as="span"
                            animation="grow"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                        />
                        Caricamento talenti...
                    </Button>
                </div>
            ) : (
                /* 🔥 FIX GRIGLIA: Sostituito il vecchio 'div' con un 'Row' nativo di Bootstrap */
                <Row className="g-4 justify-content-center">
                    {currentPlayers.map((player) => (
                        <Col key={player._id} xs={12} md={6} xl={4}>
                            {/* 🚀 FIX: Inserite le classi corrette player-card-horizontal e rimosso ombre chiare */}
                            <Card className="border-0 player-card-horizontal overflow-hidden">
                                {/* 🚀 FIX: h-100 e w-100 sulla Row assicurano che le colonne riempiano i 160px di altezza */}
                                <Row className="g-0 h-100 w-100 m-0">

                                    {/* 📸 LATO SINISTRO: IMMAGINE GIOCATORE */}
                                    {/* Usiamo col-5 nativo per bloccare la proporzione orizzontale */}
                                    <div className="col-5 p-0 position-relative h-100">
                                        <div className="img-horizontal-wrapper">
                                            <img
                                                src={player.avatar || './default-player.png'}
                                                className="player-avatar-horizontal"
                                                alt={`${player.name} ${player.surname}`}
                                            />
                                        </div>
                                        {/* Badge Ruolo posizionato in absolute sopra l'immagine */}
                                        <span className="position-absolute bottom-2 start-2 main-badge-role">
                                            {player.role || 'ATT'}
                                        </span>
                                    </div>

                                    {/* 📊 LATO DESTRO: INFO E VALUTAZIONI */}
                                    <div className="col-7 h-100 d-flex flex-column justify-content-between p-3 text-white bg-main-card-dark">
                                        <div>
                                            <div className="d-flex justify-content-between align-items-center mb-1">
                                                <Badge bg="danger" className="text-uppercase tracking-wider fw-bold text-white x-small-badge">
                                                    Top Prospect
                                                </Badge>

                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFavorite(player._id);
                                                    }}
                                                    className="main-favorite-btn-position-horizontal" // Classe per gestire il cuore in orizzontale
                                                    style={{ cursor: 'pointer' }}
                                                >
                                                    <i className={`bi ${userFavorites?.includes(player._id) ? 'bi-heart-fill text-danger' : 'bi-heart text-white-50'}`} style={{ fontSize: '1rem' }}></i>
                                                </div>
                                            </div>

                                            {/* Nome e Cognome con le classi del tuo font Montserrat */}
                                            <h6 className="text-uppercase fw-bold mb-1 text-truncate text-white main-player-title">
                                                <span className="text-white-50 d-block text-capitalize main-small-name">{player.name}</span>
                                                {player.surname}
                                            </h6>

                                            <div className="d-flex align-items-center mb-2">
                                                <span className="text-secondary font-monospace" style={{ fontSize: '0.65rem' }}>POTENZIALE:</span>
                                                <span className="text-warning fw-bold ms-2" style={{ fontSize: '0.85rem' }}>{player.rating} / 10</span>
                                            </div>
                                        </div>

                                        {/* 🚀 FIX: Agganciata la classe btn-action-details-horizontal */}
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
                                            👁️ Analizza
                                        </Button>
                                        <ModalHome show={showLoginModal} onHide={() => setShowLoginModal(false)}/>
                                    </div>

                                </Row>
                            </Card>
                        </Col>
                    ))}

                    {topProspects.length === 0 && (
                        <Col className="text-center text-muted my-4">
                            Nessun giocatore con valutazione Top (Voto 9 o 10) registrato.
                        </Col>
                    )}
                </Row>
            )}

            {/* PAGINAZIONE AGGIORNATA E COERENTE */}
            <div className="d-flex justify-content-center align-items-center mt-5 mb-5 gap-3">
                <button
                    className="btn btn-outline-secondary px-3 py-1 rounded-pill text-uppercase small fw-bold"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    ◀
                </button>

                <span className="align-self-center text-dark font-monospace" style={{ fontSize: '0.9rem' }}>
                    PAGINE: <strong className="text-danger  bg-opacity-40 px-1 py-1 rounded-3 mx-1">{currentPage}</strong>
                </span>

                <button
                    className="btn btn-outline-secondary px-3 py-1.5 rounded-pill text-uppercase small fw-bold"
                    onClick={() => setCurrentPage(prev => prev + 1)}
                    disabled={indexOfLastPlayer >= topProspects.length}
                >
                    ▶
                </button>
            </div>
        </Container>
    );
};

export default PromisingPlayers;
