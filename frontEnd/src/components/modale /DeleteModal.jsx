import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onHide, onConfirm, itemName }) => {
    return (
        <Modal 
            show={show} 
            onHide={onHide} 
            centered
            contentClassName="custom-modal-dark border-danger-subtle" /* Un leggero richiamo rosso al bordo */
        >
            <Modal.Header closeButton closeVariant="white" className="border-0 pb-0">
                <Modal.Title className="text-uppercase fw-black fs-5 text-white tracking-wide">
                    🗑️ Conferma Eliminazione
                </Modal.Title>
            </Modal.Header>
            
            <Modal.Body className="text-white-50 py-3">
                <p className="mb-1">
                    Sei sicuro di voler eliminare definitivamente 
                    <strong className="text-danger mx-1">{itemName || "questo elemento"}</strong> 
                    dalla tua dashboard? Questa azione non può essere annullata.
                </p>
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
                    variant="danger"
                    className="text-uppercase fw-bold small px-4 py-2 rounded-3 shadow-sm"
                    onClick={() => {
                        onConfirm(); // Esegue la cancellazione
                        onHide();    // Chiude la modale
                    }}
                >
                    Elimina Ora
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default DeleteModal;
