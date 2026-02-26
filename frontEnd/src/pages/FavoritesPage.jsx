import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import RoleBadge from '../components/RoleBadge/RoleBadge';
import { customFetch } from '../API/api';

const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const getMyFavs = async () => {
            const token = localStorage.getItem('token');
            const res = await customFetch('users/favorites', {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            setFavorites(data);
        };
        getMyFavs();
    }, []);


    const removeFavorite = async (playerId) => {
        const token = localStorage.getItem('token');
        try {
            const res = await customFetch(`users/favorites/${playerId}`, {
                method: 'PUT', // Usiamo la stessa rotta del cuore!
                headers: { 'Authorization': `Bearer ${token}` }
            });

            if (res.ok) {

                setFavorites(favorites.filter(p => p._id !== playerId));
            }
        } catch (err) {
            console.error("Errore nella rimozione:", err);
        }
    };



    return (
        <Container className="py-5">
            <h2 className="text-center text-white neon-text mb-5">I TUOI CAMPIONI SALVATI</h2>

            <Row className="g-4">
                {favorites.length > 0 ? (
                    favorites.map(player => (
                        <Col key={player._id} xs={12} sm={6} lg={4}>
                            <Card className="bg-dark border-danger text-white h-100 shadow-lg">
                                <Card.Img variant="top" src={player.avatar} style={{ height: '400px', objectFit: 'cover' }} />
                                <Card.Body className="d-flex flex-column justify-content-between">
                                    <div>
                                        <Card.Title>{player.name} {player.surname}</Card.Title>
                                        <Card.Text className="text-secondary small">
                                            <RoleBadge role={player.role} /> <br />
                                            Rating: {player.rating}
                                        </Card.Text>
                                    </div>
                                    <Button
                                        onClick={() => removeFavorite(player._id)}
                                        variant="outline-danger"
                                        className="mt-3 w-100">
                                        Rimuovi
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <Col className="text-center">
                        <h4 className="text-secondary">La tua lista è ancora vuota.</h4>
                    </Col>
                )}
            </Row>
        </Container>
    );
};

export default FavoritesPage;
