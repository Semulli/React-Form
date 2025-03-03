import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { editPost } from "../../services/api";
import useForm from "../Hooks/useForm";
function EditModal({ editItem, editShow, editClose, setEditShow, fetchPosts }) {
  const {
    handleInputChange,
    resetForm,
    form: editedUser,
  } = useForm(editItem);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await editPost(editedUser.id, editedUser);
    setEditShow();
    fetchPosts();
    resetForm();
  };
  return (
    <div
      className="modal show"
      style={{ display: "block", position: "initial" }}
    >
      <Modal show={editShow} onHide={editClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGroupEmail">
              <Form.Control
                type="text"
                placeholder="edit name"
                value={editedUser?.firstName}
                name="firstName"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                type="email"
                placeholder="edit email"
                value={editedUser?.email}
                name="email"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                type="text"
                placeholder="edit position"
                value={editedUser?.position}
                name="position"
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formGroupPassword">
              <Form.Control
                type="number"
                placeholder="edit age"
                value={editedUser?.age}
                name="age"
                onChange={handleInputChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="success" onClick={handleSubmit}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default EditModal;
