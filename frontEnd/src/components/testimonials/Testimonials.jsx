import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import sfondo from '../../assets/Scouting-nel-calcio.jpg';



       
        const Testimonials = () => {
            return (
              <section className="py-5 section-body" style={{ backgroundImage:`url(${sfondo})`}}>
                <Container>
                  <div className=" mb-5">
                    <h2 className="fw-bold  fs-1 text-uppercase text-black">Recent Tweet</h2>
                    <p className="fw-bold fs-3 text-black">Le opinioni di chi ha collaborato con me</p>
                  </div>
          
                  <Row className="g-4 justify-content-center">
                    {/* Card 1 */}
                    <Col md={4}>
                      <Card className="h-100 border-1 text-white shadow-sm custom-t-card">
                        <Card.Body className="p-4">
                          <blockquote className="blockquote mb-0">
                            <p className="fs-6 italic text-secondary">
                            "Serietà, puntualità e una visione tattica fuori dal comune. Collaborare con Gianni significa avere la certezza di un'analisi oggettiva e profonda su ogni singolo atleta monitorato."
                            </p>
                            <footer className="blockquote-footer mt-3">
                              <cite title="Source Title" className="fw-bold text-dark text-uppercase">Marco Rossi</cite>
                              <br />
                              <span>25 Febbrary 2026</span>
                            </footer>
                          </blockquote>
                        </Card.Body>
                      </Card>
                    </Col>

                     {/* Card 1 */}
                     <Col md={4}>
                      <Card className="h-100 border-1 text-white shadow-sm custom-t-card">
                        <Card.Body className="p-4">
                          <blockquote className="blockquote mb-0">
                            <p className="fs-6 italic text-secondary">
                            "Seguo il lavoro di Gianni da tempo. La sua capacità di leggere le fasi di gioco e tradurle in dati azionabili è impressionante. Un valore aggiunto per chiunque faccia scouting ad alto livello."
                            </p>
                            <footer className="blockquote-footer mt-3">
                              <cite title="Source Title" className="fw-bold text-dark text-uppercase">Giulio Golia</cite>
                              <br />
                              <span>03 Gennary 2026</span>
                            </footer>
                          </blockquote>
                        </Card.Body>
                      </Card>
                    </Col>


                     {/* Card 1 */}
                     <Col md={4}>
                      <Card className="h-100 border-1 text-white shadow-sm custom-t-card">
                        <Card.Body className="p-4">
                          <blockquote className="blockquote mb-0">
                            <p className="fs-6 italic text-secondary">
                            "I report di Gianni Toscano non sono solo analisi, sono mappe strategiche. Grazie alle sue segnalazioni abbiamo scoperto due profili Under-19 che oggi sono pilastri della nostra prima squadra."
                            </p>
                            <footer className="blockquote-footer mt-3">
                              <cite title="Source Title" className="fw-bold text-dark text-uppercase">Fiorentino Perez</cite>
                              <br />
                              <span>03 April 2025</span>
                            </footer>
                          </blockquote>
                        </Card.Body>
                      </Card>
                    </Col>  
                  </Row>
                </Container>
              </section>
            );
          };
        
export default Testimonials