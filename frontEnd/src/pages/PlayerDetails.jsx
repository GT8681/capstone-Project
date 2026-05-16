import { Navigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container, Row, Col, Button, Alert, ListGroup, Card, } from 'react-bootstrap';
import { customFetch } from '../API/api';
import RoleBadge from '../components/RoleBadge/RoleBadge.jsx';
import PlayerStatsChart from '../components/PlayerStatsChart/PlayerStatsChart.jsx';

const PlayerDetails = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);
    const [error, setError] = useState(false);

    const user = JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            setError(true);
            return;
        }
        customFetch(`players/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Non autorizzato o errore del server');
                }
                return res.json()
            })
            .then(data => {

                setPlayer(data)
            })
            .catch(error => {
                alert(error.message)
                setError(true);
            })
    }, [id]);

    if (!player) return <p>Caricamento...</p>;

    if (user.role !== 'PatnerPro') {
        return (
            <Container className="mt-5">
                <Alert variant="danger">
                    <h3>Accesso Negato</h3>
                    <p>Solo i PartnerPro possono visualizzare i dettagli dei calciatori.</p>
                </Alert>
            </Container>
        );
    }


    return (
        <Container className="mt-5">
            <Row className="justify-content-center align-content-center">
                <Col md={8}>
                    <Card className="shadow-lg border-0">
                        <Row className="g-0">
                            {/* Colonna immagine */}
                            <Col md={6} className="d-flex align-items-center justify-content-center bg-light">
                                <Card.Img
                                    src={player.avatar || 'https://via.placeholder.com/300'}
                                    alt={player.surname}
                                    className="img-fluid rounded"
                                    style={{ maxWidth: '300px', objectFit: 'cover' }}
                                />
                            </Col>
                            <Col md={6} style={{ maxWidth: '400px' }} className="m-3 ">
                               
                                <PlayerStatsChart player={player} />
                            </Col>


                            {/* Colonna dettagli */}
                            <Col md={8}>
                                <Card.Body>
                                    <Card.Title className="text-success fs-3">{player.name} {player.surname}</Card.Title>
                                    <RoleBadge role={player.role} />
                                    <ListGroup variant="flush">
                                        <ListGroup.Item>
                                            <strong>Piede preferito:</strong> {player.foot || 'N/A'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Età:</strong> {player.age || 'N/A'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Altezza:</strong> {player.height || 'N/A'} cm
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Peso:</strong> {player.weight || 'N/A'} kg
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Descrizione:</strong> {player.description || 'N/A'}
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <strong>Nazionalità:</strong> {player.nationality || 'N/A'}
                                        </ListGroup.Item>
                                    </ListGroup>
                                    <div className="mt-4">
                                        <Button variant="success" href="/" className="me-2">
                                            Torna Home
                                        </Button>
                                    </div>
                                </Card.Body>
                            </Col>
                        </Row>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default PlayerDetails;
