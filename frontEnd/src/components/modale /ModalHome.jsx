import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const LoginModal = ({ show, onHide }) => {
    const navigate = useNavigate();

    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            centered
            contentClassName="custom-modal-dark"
        >
            <Modal.Header closeButton closeVariant="white" className="border-0 pb-0">
                <Modal.Title className="text-uppercase fw-black fs-5 text-white tracking-wide">
                    ⚠️ Accesso Richiesto
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="text-white-50 py-3">
                <p className="mb-1">Per usufruire di questo servizio, visualizzare i dati avanzati e le sezioni scouting è necessario essere autenticati.</p>
            </Modal.Body>
            
            <Modal.Footer className="border-0 pt-0 gap-2">
                <Button 
                    variant="link" 
                    className="text-white-50 text-decoration-none text-uppercase fw-bold small px-3"
                    onClick={onHide}
                >
                    Annulla
                </Button>
                <Button 
                    className="btn-modal-login text-uppercase fw-bold small px-4 py-2"
                    onClick={() => {
                        onHide();
                        navigate('/login');
                    }}
                >
                    Accedi / Registrati
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default LoginModal;
