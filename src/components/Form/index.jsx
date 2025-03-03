import React, { useState, useCallback } from "react";
import Title from "../Title";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { createPosts } from "../../services/api";
// import { isValidEmail } from "../Helpers/regex";
import { toast } from "react-toastify";
import useForm from "../Hooks/useForm";


function MainForm({ refreshData }) {
  const values = { firstName: "", email: "", position: "", age: "" };

  // const [form, setForm] = useState(values);
  // const [errors, setErrors] = useState({ email: "", age: "", form: "" });

  const { handleInputChange, form, resetForm } = useForm(values);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    console.log(form);

    await createPosts(form);
    // setForm(values);
    refreshData();
    toast.success(" added successfully!", {
      position: "top-right",
      autoClose: 1000,
    });
    resetForm();
  }, [form]);
  return (
    <>
      <Title title="Add User" />
      <br />
      <Form className="w-75 mx-auto table-sm">
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control
            type="text"
            placeholder="Enter name"
            onChange={handleInputChange}
            value={form?.firstName}
            name="firstName"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="enter email"
            onChange={handleInputChange}
            value={form?.email}
            name="email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPosition">
          <Form.Control
            type="text"
            placeholder="enter position"
            onChange={handleInputChange}
            value={form?.position}
            name="position"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Control
            type="number"
            placeholder="enter age"
            onChange={handleInputChange}
            value={form?.age}
            name="age"
          />
        </Form.Group>

        <Button
          variant="primary"
          style={{ width: "100%" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
      </Form>
    </>
  );
}

export default MainForm;
