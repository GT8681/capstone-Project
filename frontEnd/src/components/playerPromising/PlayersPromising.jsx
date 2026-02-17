import { Card, Badge, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PromisingPlayers = ({ players }) => {
    // Filtriamo solo i "promettenti" (voto >8)
    const topProspects = (players || []).filter(player => Number(player.rating) > 8);

    const navigate = useNavigate();

    return (
        <Container>
            <div className="">
            <h2 className="text-danger text-center mb-5">🌟 PLAYERS PROSPECTS..... 🌟 </h2>

                <div className='d-flex justify-content-center align-items-center gap-5 flex-wrap'>
                   

                    {topProspects.map(player => (
                        <Col key={player._id} md={4} lg={4} className="mb-4">

                            <Card className="bg-dark text-white shadow-sm border-0 h-100 overflow-hidden  " style={{ minHeight: '200px' }}>
                                <Row className='g-0 h-100'>




                                    <Col xs={5}>


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

                                    <Col xs={7} className="d-flex flex-column justify-content-center p-3">
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
            </div>
        </Container >
    );
};
export default PromisingPlayers;