import { Card, Badge, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import React, { useState } from "react";

const PromisingPlayers = ({ players }) => {
    // Filtriamo solo i "promettenti" (voto >8)
    const topProspects = (players || []).filter(player => Number(player.rating) > 8);

    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [playersForPage, setPlayersForPage] = useState(9);


    const indexOfLastPlayer = currentPage * playersForPage;
    const indexOfFirstPlayer = indexOfLastPlayer - playersForPage;
    const currentPlayers = players.slice(indexOfFirstPlayer, indexOfLastPlayer);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


    return (
        <Container>
            <div className="">
                <h2 className="text-danger text-center mb-5">🌟 PLAYERS PROSPECTS..... 🌟 </h2>

                <div className='d-flex justify-content-center align-items-center gap-5 flex-wrap'>


                    {currentPlayers.map(player => (
                        <Col key={player._id} md={4} lg={3} className="mb-4">

                            <Card className="bg-dark text-white shadow-sm border-0 h-100 overflow-hidden  " style={{ minHeight: '200px' }}>
                                <Row className='g-0 h-100'>
                                    <Col xs={6}>
                                        <Card.Img
                                            src={player.avatar}
                                            style={{
                                                width: '100%',
                                                height: '100%',
                                                objectFit: 'cover', // Taglia la foto in eccesso senza schiacciarla
                                                objectPosition: 'top center' // Mantiene i visi visibili
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
                                        <Button
                                            variant="outline-light"
                                            size="sm"
                                            className="mt-auto align-self-start w-100"
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