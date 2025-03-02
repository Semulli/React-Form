import React, { useState } from "react";
import Title from "../Title";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import { createPosts } from "../../services/api";
import { isValidEmail } from "../Helpers/regex";

function MainForm({ refreshData }) {
  const values = { firstName: "", email: "", position: "", age: "" };

  const [form, setForm] = useState(values);
  const [errors, setErrors] = useState({ email: "", age: "", form: "" });
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });

    let newErrors = { ...errors };

    if (name === "email") {
      newErrors.email = !isValidEmail(value)
        ? "Please enter a valid email"
        : "";
    }

    if (name === "age") {
      newErrors.age = value < 0 ? "Age cannot be negative" : "";
    }

    setErrors(newErrors);
  };
  async function handleSubmit() {
    const newErrors = { ...errors };

    if (Object.values(form).some((value) => value === "")) {
      newErrors.form = "All fields must be filled";
    } else {
      newErrors.form = "";
    }

    setErrors(newErrors);

    if (newErrors.email || newErrors.age || newErrors.form) return;

    await createPosts(form);
    setForm(values);
    refreshData();
  }

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
            value={form.firstName}
            name="firstName"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="enter email"
            onChange={handleInputChange}
            value={form.email}
            name="email"
          />
          {errors.email && (
            <div style={{ color: "red", textAlign: "left" }}>
              {errors.email}
            </div>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPosition">
          <Form.Control
            type="text"
            placeholder="enter position"
            onChange={handleInputChange}
            value={form.position}
            name="position"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicAge">
          <Form.Control
            type="number"
            placeholder="enter age"
            onChange={handleInputChange}
            value={form.age}
            name="age"
          />
          {errors.age && (
            <div style={{ color: "red", textAlign: "left" }}>{errors.age}</div>
          )}
           {errors.form && (
          <div style={{ color: "red", textAlign: "left" }}>{errors.form}</div>
        )}
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
