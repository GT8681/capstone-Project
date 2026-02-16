import { Card, Badge, Row, Col } from 'react-bootstrap';
import { navigate } from 'react-router-dom';

const PromisingPlayers = ({ players }) => {
    // Filtriamo solo i "promettenti" (voto >= 8)
    const topProspects = players.filter(p => p.rating >= 8);

    return (
        <div className="mt-5">
            <h2 className="text-white border-bottom pb-2">🌟 Giocatori Promettenti</h2>
            <Row>
                {topProspects.map(player => (
                    <Col key={player._id} md={4} className="mb-4">
                        <Card className="bg-dark text-white border-warning h-100 shadow">
                            <Card.Img variant="top" src={player.image || 'placeholder.jpg'} />
                            <Card.Body>
                                <Badge bg="warning" text="dark" className="mb-2">TOP PROSPECT</Badge>
                                <Card.Title>{player.name} {player.surname}</Card.Title>
                                <Card.Text>
                                    Voto: <span className="text-warning">{player.rating}/10</span>
                                </Card.Text>

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
                ))}
            </Row>
        </div>
    );
};
export default PromisingPlayers;