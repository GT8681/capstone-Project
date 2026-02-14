import React from "react";
import { Container,Row,Col } from "react-bootstrap";

const Home = () => {
    return (
        <Container>
            <Row>
                <Col>
                <div className='home-container d-flex flex-column align-items-center justify-content-center text-center'>
                <h1>SoccerScout</h1>
                    <p>Questa è la pagina principale del nostro progetto. Qui potrai trovare tutte le funzionalità e i servizi offerti dalla nostra applicazione.</p>
                    <p>Esplora le diverse sezioni, accedi alle tue funzionalità preferite e goditi l'esperienza unica che abbiamo creato per te!</p>
                </div>
               </Col>
            </Row>
        </Container>
    )
}
export default Home;