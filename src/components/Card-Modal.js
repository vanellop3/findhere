import Button from "react-bootstrap/Button";
import React, {useState} from 'react';
import Modal from "react-bootstrap/Modal";

const CardModal = (props) => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="btn--primary" onClick={handleShow}>More info</Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{props.title}</Modal.Title>
                </Modal.Header>
                {props.categoryImg()}
                <Modal.Body>Description: {props.desc}</Modal.Body>
                <Modal.Body>Place: {props.place}</Modal.Body>
                <Modal.Body>Price: {props.price}$</Modal.Body>
                <Modal.Body>Category: {props.category}</Modal.Body>
                <Modal.Body>Phone: {props.phone}</Modal.Body>
                <Modal.Footer>
                    <Button className="btn--primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    );
}
export default CardModal;