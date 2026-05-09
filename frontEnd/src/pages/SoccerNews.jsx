import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Spinner, Button } from 'react-bootstrap';
import { customFetch } from '../API/api.js';

const SoccerNews = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getNews = async () => {
            try {
                // Sostituisci l'URL con quello del tuo server (es. http://localhost:5173/api/v1/news)
                const response = await fetch('http://localhost:4545/api/v1/news');
                const data = await response.json();
                setNews(data);
            } catch (err) {
                console.error("Errore nel caricamento news:", err);
            } finally {
                setLoading(false);
            }
        };
        getNews();
    }, []);

    return (
        <Container className="my-5">
            <h2 className="text-danger text-center mb-5">📰 ULTIME NOTIZIE CALCIO</h2>
            
            {loading ? (
                <div className="d-flex justify-content-center my-5">
                    <Spinner animation="border" variant="danger" role="status">
                        <span className="visually-hidden">Caricamento...</span>
                    </Spinner>
                </div>
            ) : (
                <Row>
                    {news.map((article, index) => (
                        <Col key={index} md={4} className="mb-4">
                            <Card className="h-100 bg-dark text-white border-secondary shadow-sm">
                                <Card.Img 
                                    variant="top" 
                                    src={article.urlToImage || 'https://via.placeholder.com/300x200?text=Calcio+News'} 
                                    style={{ height: '180px', objectFit: 'cover' }}
                                />
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="h6">{article.title}</Card.Title>
                                    <Card.Text className="small text-secondary mt-auto">
                                        {article.source.name} • {new Date(article.publishedAt).toLocaleDateString()}
                                    </Card.Text>
                                    <Button 
                                        variant="outline-danger" 
                                        size="sm" 
                                        href={article.url} 
                                        target="_blank"
                                        className="mt-3"
                                    >
                                        Leggi l'articolo
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default SoccerNews;
