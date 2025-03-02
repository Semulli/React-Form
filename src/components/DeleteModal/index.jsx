import React from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

function DeleteModal({ show, handleClose, deletePost, deleteItem }) {
  console.log(deleteItem);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> {deleteItem.firstName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure delete this info?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={() => deletePost(deleteItem.id)}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default DeleteModal;
