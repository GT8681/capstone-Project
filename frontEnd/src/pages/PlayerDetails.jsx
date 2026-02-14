import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Container,Row,Col,Button } from 'react-bootstrap';

const PlayerDetails = () => {
    const { id } = useParams();
    const [player, setPlayer] = useState(null);

    useEffect(() => {
        fetch(`http://localhost:4545/players/${id}`)
            .then(res => res.json())
            .then(data => setPlayer(data));
    }, [id]);

    if (!player) return <p>Caricamento...</p>;

    return (
        <Container>
            <Row>
                <Col className='d-flex m-5 p-3 align-items-center'>
                <div className='imag-wrapper d-flex justify-content-center mt-5 me-5'>
                    <img src={player.avatar} alt={player.surname} style={{ width: '300px' }} />
                </div>
                <div className="wrapper-details  d-flex flex-column justify-content-center mt-5">

                    <h1>{player.firstname} {player.surname}</h1>
                    <p>Ruolo: {player.role}</p>
                    <p>Piede: {player.foot}</p>
                    <p>Età: {player.age}</p>
                    <p>Altezza: {player.height} cm</p>
                    <p>Peso: {player.weight} kg</p>
                    <p>Descrizione: {player.description}</p>
                    <div>
                    <Button variant="success" href="/" className='mt-3'>
                        Torna Home
                    </Button>
                    </div>
                </div>
                
                
                </Col>
              
            </Row>
        </Container>
    );
};
export default PlayerDetails;
