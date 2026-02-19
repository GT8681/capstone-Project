import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

const Contactpage = () => {
    const [formData, setFormData] = useState({
        name: '', email: '', contact: '', subject: '', message: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Messaggio inviato:", formData);
        e.target.reset();
        setFormData({})
        alert("Grazie per averci contattato!");

    };

    return (
        <div className="bg-light min-vh-100 py-5">
            <Container>
                {/* PARTE SUPERIORE: FORM  */}
                <Row className="mb-5 align-items-stretch d-flex justify-content-center">
                    <Col lg={6}>
                        <Card className="p-4 shadow-sm border-0 h-100">
                            <h3 className="fw-bold mb-4">Feel Free to Contact us</h3>
                            <Form onSubmit={handleSubmit}>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Control name="name" placeholder="Your Name" onChange={handleChange} required />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Control type="email" name="email" placeholder="Email" onChange={handleChange} required />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md={6} className="mb-3">
                                        <Form.Control name="contact" placeholder="Contact" onChange={handleChange} />
                                    </Col>
                                    <Col md={6} className="mb-3">
                                        <Form.Control name="subject" placeholder="Subject" onChange={handleChange} />
                                    </Col>
                                </Row>
                                <Form.Control as="textarea" rows={5} name="message" placeholder="Write Your Message" className="mb-4" onChange={handleChange} required />
                                <Button variant="danger" type="submit" className="w-100 fw-bold py-2">
                                    CONTACT US NOW
                                </Button>
                            </Form>
                        </Card>
                    </Col>
                </Row>

                {/* PARTE INFERIORE: CONTACT INFORMATION */}
                <div className="mt-5 pt-4">
                    <h4 className="fw-bold mb-4 border-bottom pb-2">Contact Information</h4>
                    <Row className="g-4">
                        <Col md={4}>
                            <div className="d-flex align-items-start">
                                <FaMapMarkerAlt className="text-danger fs-4 me-3 mt-1" />
                                <div>
                                    <h6 className="fw-bold mb-1 text-danger">Address:</h6>
                                    <p className="text-muted small">Via Asiago 82, Caronno Pertusella</p>
                                    <p className="text-muted small">21042 Varese</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="d-flex align-items-start">
                                <FaPhone className="text-danger fs-4 me-3 mt-1" />
                                <div>
                                    <h6 className="fw-bold mb-1 text-danger">Contact:</h6>
                                    <p className="text-muted small mb-0">Phone: +39 3288117179</p>
                                    <p className="text-muted small">Fax: 38489473904892</p>
                                </div>
                            </div>
                        </Col>
                        <Col md={4}>
                            <div className="d-flex align-items-start">
                                <FaEnvelope className="text-danger fs-4 me-3 mt-1" />
                                <div>
                                    <h6 className="fw-bold mb-1 text-danger">For More Information:</h6>
                                    <p className="text-muted small mb-0">Email: gianni.toscano@icloud.com</p>
                                    <p className="text-muted small">contact@soccer.com</p>
                                </div>
                            </div>
                        </Col>
                        <div  className='mt-3 d-flex justify-content-center'>
                            <Button variant="success" href="/">
                                Torna Home
                            </Button>
                        </div>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default Contactpage;
