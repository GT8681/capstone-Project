import { Card, Badge, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { customFetch } from '../../API/api';
import React, { useEffect, useState } from "react";
import '../../App.css';


const PromisingPlayers = ({ players}) => {
    // Filtriamo solo i "promettenti" (voto >8)
    const topProspects = (players || []).filter(player => Number(player.rating) > 8);

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [playersForPage, setPlayersForPage] = useState(9);
     const [userFavorites, setUserFavorites] = useState([]);


    const indexOfLastPlayer = currentPage * playersForPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersForPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    useEffect(() => {

          const fetchUserFavorites = async () => {
                    const token = localStorage.getItem('token');
                    if (!token) return;
        
                    const resp = await customFetch('users/me', {
                        headers: { 'Authorization': `Bearer ${token}` }
                    });
                    const data = await resp.json();
                    setUserFavorites(data.favorites  || []);
                }
        
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


    return (
        <Container>
            <div className="">
                <h2 className="text-danger text-center mb-5">🌟 PLAYERS PROSPECTS..... 🌟 </h2>
                <div className='d-flex justify-content-center align-items-center gap-5 flex-wrap'>
                    {currentPlayers.map(player => (
                        <Col key={player._id} md={4} lg={3} className="mb-4">
                            <Card className="text-white shadow-sm border-0 h-100 overflow-hidden bg-transparent" style={{ minHeight: '200px' }}>
                                <Row className='g-0 h-100'>
                                    <Col xs={6}>
                                        <Card.Img
                                            src={player.avatar}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover',
                                                objectPosition: 'top center'
                                            }}
                                        />
                                    </Col>
                                    <Col xs={6} className="d-flex flex-column justify-content-center p-3">
                                        <div className="mb-1">
                                            <Badge bg="primary" style={{ fontSize: '0.7rem' }}>TOP PROSPECT</Badge>
                                        </div>
                                        <Card.Title className="h5 mb-1 text-truncate">
                                            {player.name} {player.surname}
                                        </Card.Title>
                                        <div className="mb-3">
                                            <small className="text-secondary">Rating: </small>
                                            <span className="text-warning fw-bold">{player.rating}/10</span>
                                        </div>

                                        <div className="d-flex justify-content-between align-items-center mb-2">
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
                                                <i className={`bi ${userFavorites.includes(player._id) ? 'bi-heart-fill text-danger neon-heart' : 'bi-heart text-muted'}`}
                                                    style={{ fontSize: '1.4rem' }}></i>
                                            </div>
                                        </div>
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            className="mt-auto align-self-start w-100 btn-neon-cyan"
                                            onClick={() => {
                                                if (!localStorage.getItem('token')) {
                                                    alert('Effettua il login per i dettagli');
                                                    navigate('/login');
                                                } else {
                                                    navigate(`/player-details/${player._id}`);
                                                }
                                            }}
                                        >
                                            Dettagli
                                        </Button>
                                    </Col>
                                </Row>

                            </Card>

                        </Col>

                    ))}
                </div>
                <div className="d-flex justify-content-center mt-4 p-5 gap-2">
                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                    >
                        Precedente
                    </button>

                    <span className="align-self-center mx-2">
                        Pagina <strong>{currentPage}</strong>
                    </span>

                    <button
                        className="btn btn-outline-primary"
                        onClick={() => setCurrentPage(prev => prev + 1)}
                        disabled={indexOfLastPlayer >= players.length}
                    >
                        Successiva
                    </button>
                </div>
            </div>
        </Container >
    );
};
export default PromisingPlayers;