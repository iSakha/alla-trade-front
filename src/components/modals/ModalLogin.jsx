// MyModal.jsx
import React from 'react';
import { Modal, Form, Button } from 'react-bootstrap';

function MyModal({ show, onHide, onLogin }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Здесь можно добавить логику обработки входа
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicEmail" className="mb-3">
            <Form.Label>Email Address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">We'll never share your email</Form.Text>
          </Form.Group>
          <Form.Group controlId="formBasicPassword" className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Enter password" required />
          </Form.Group>
          <Form.Group controlId="formBasicCheckbox" className="mb-3">
            <Form.Check type="checkbox" label="Remember me" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Log In
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default MyModal;