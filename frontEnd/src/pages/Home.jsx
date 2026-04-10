import React, { useEffect, useState, useCallback } from "react";
import { customFetch } from '../API/api';
import { Container, Row, Col, Card, Badge, Spinner, Button } from "react-bootstrap";
import TopCarousel from '../components/caruselWelcome/carusel.jsx';
import { useNavigate } from "react-router-dom";
import RoleBadge from '../components/RoleBadge/RoleBadge.jsx';
import FiltriAvanzati from "./FiltriAvanzati.jsx";
import '../App.css';
import '../pages/Home.css';


const Home = () => {
    const [players, setPlayer] = useState([]);
    const [filters, setFilters] = useState({});
    console.log("Filters in Home:", filters);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [playersForPage, setPlayersForPage] = useState(9);
    const [userFavorites, setUserFavorites] = useState();
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('user'));

    const handleFilterChange = useCallback((dati) => {
        setFilters(dati);
        setCurrentPage(1); // Importante: se filtri, torna alla pagina 1!
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
                    console.log("Dati ricevuti dal backend:", data);

                    const playersArray = Array.isArray(data) ? data : (data.players || []);
                    console.log("Array di giocatori:", playersArray);
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

    { loading && <div className="spinner">Caricamento...</div> }

    const indexOfLastPlayer = currentPage * playersForPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersForPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);



    return (
        <>
            <TopCarousel />
            <Container className="mt-4">

                <FiltriAvanzati onFilterChange={handleFilterChange} />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="text-danger">THE PLAYERS........</h2>
                </div>
                <Row>
                    {currentPlayers.length > 0 ? (
                        currentPlayers.map((player) => (
                            <Col key={player._id} xs={12} md={6} lg={4} className="mb-4">
                                <Card className="h-100 box-shadow  text-white border-secondary">
                                    <Card.Body className="position-relative">
                                        <div className="d-flex justify-content-center mb-3">
                                            <Card.Img variant='top' src={player.avatar} className="shadow-sm border-0 h-100 overflow-hidden " style={{ height: '240px', objectFit: 'cover' }} />
                                        </div>
                                        <div className="d-flex flex-column justify-content-between align-items-start">
                                            <Card.Title className="text-success">{player.name}</Card.Title>
                                            <Card.Title className="text-success">{player.surname}</Card.Title>
                                            <div className="d-flex flex-column align-items-end mb-3">
                                                <Badge pill bg="warning" text="dark" className="">
                                                    Rating: {player.rating}
                                                </Badge>
                                            </div>
                                            <p className="text-dark">Nazionality: {player.nationality}</p>
                                            <RoleBadge role={player.role} />
                                            <div className="d-flex justify-content-between align-items-center mb-2 gap-3">
                                                <small className="text-secondary">Salva nei preferiti:</small>
                                                <div
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleFavorite(player._id);
                                                    }}
                                                    style={{
                                                        cursor: 'pointer',
                                                        outline: 'none',
                                                        userSelect: 'none'
                                                    }}
                                                >
                                                    <i className={`bi ${userFavorites?.includes(player._id) ? 'bi-heart-fill text-danger neon-heart' : 'bi-heart text-muted'}`}
                                                        style={{ fontSize: '1.4rem' }}></i>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-footer bg-transparent border-top-0 pt-0">
                                            <hr className="my-2" />
                                            <div className="d-flex align-items-center">
                                                <div className="flex-grow-1">
                                                    <p className="text-muted mb-0" style={{ fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase' }}>
                                                        Scout:
                                                    </p>
                                                    <p className="mb-0 text-dark" style={{ fontSize: '0.85rem', fontWeight: '600' }}>
                                                        {player.author?.name} {player.author?.surname}
                                                    </p>
                                                    <p className="text-primary mb-0" style={{ fontSize: '0.75rem' }}>
                                                        <i className="bi bi-envelope-at me-1"></i>
                                                        {player.author?.email}
                                                    </p>
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