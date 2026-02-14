import React from 'react';
import { Carousel } from 'react-bootstrap';

const TopCarousel = () => {
    return (
        <Carousel fade className="mb-5 shadow">
            {/* Slide 1 */}
            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=2000"
                    alt="Stadio"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>Analisi Talenti 2026</h3>
                    <p>Scopri i migliori prospetti del calcio mondiale con dati aggiornati in tempo reale.</p>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Slide 2 */}

            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000"
                    alt="Giocatore"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>Statistiche Dettagliate</h3>
                    <p>Esplora statistiche approfondite su ogni giocatore, dai gol alle prestazioni in campo.</p>
                </Carousel.Caption>
            </Carousel.Item>

            {/* Slide 3 */}

            <Carousel.Item interval={3000}>
                <img
                    className="d-block w-100"
                    src="https://images.unsplash.com/photo-1521412644187-c49fa049e84d?auto=format&fit=crop&q=80&w=2000"
                    alt="Tifosi"
                    style={{ height: '400px', objectFit: 'cover' }}
                />
                <Carousel.Caption>
                    <h3>Community di Appassionati</h3>
                    <p>Unisciti alla nostra community di appassionati di calcio per condividere opinioni e scoperte.</p>
                </Carousel.Caption>
            </Carousel.Item>

        </Carousel>
    );
};

export default TopCarousel;
