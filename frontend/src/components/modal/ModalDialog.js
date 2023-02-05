import React from 'react';
import Modal from 'react-bootstrap/Modal';
import "./ModalDialog.css";

const ModalDialog = (props) => {
    return (
        <>
            <Modal show={props.show}>
                <Modal.Header closeButton onClick={props.onClose}>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.children}
                </Modal.Body>
            </Modal>
        </>
    );
}

export default ModalDialog;