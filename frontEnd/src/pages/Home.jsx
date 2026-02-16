import React, { useEffect, useState } from "react";
import { customFetch } from '../API/api';
import { Container, Row, Col, Card, Badge, Spinner, Button } from "react-bootstrap";
import TopCarousel from '../components/caruselWelcome/carusel.jsx';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Stars from "../components/stars/Stars.jsx";

const Home = () => {
    const [players, setPlayer] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [playersForPage, setPlayersForPage] = useState(3);
    const navigate = useNavigate();

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
        fectchPlayer();
    }, []);
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
                    <h2 className="text-white">TOP PLAYER</h2>
                </div>

                <Row>
                    {currentPlayers.length > 0 ? (
                        currentPlayers.map((player) => (
                            <Col key={player._id} xs={12} md={6} lg={4} className="mb-4">
                                <Card className="h-100 box-shadow bg-dark text-white border-secondary">
                                    <div className="position-absolute top-0 end-0 p-2">
                                        <Badge pill bg="warning" text="dark" className="">
                                            {player.rating} / 10
                                        </Badge>

                                    </div>
                                    <Card.Body>
                                        <div className="d-flex justify-content-center mb-3">
                                            <Card.Img variant='top' src={player.avatar} style={{ height: '240px', objectFit: 'cover' }} />
                                        </div>

                                        <div className="d-flex flex-column justify-content-between align-items-start mb-2">
                                            <Card.Title className="text-success">{player.name}</Card.Title>
                                            <Card.Title className="text-success">{player.surname}</Card.Title>
                                            <Badge pill bg="info" text="dark">{player.role}</Badge>

                                            <Badge bg="" className="">
                                                <Stars rating={player.rating} />
                                            </Badge>
                                        </div>

                                        <hr className="border-secondary" />
                                        <div className="d-flex justify-content-between align-items-center">

                                            <Button onClick={() => {
                                                if (!localStorage.getItem('token')) {
                                                    alert('Per visualizzare i dettagli del giocatore è necessario effettuare il login');
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
            </Container>
        </>
    )
}
export default Home;