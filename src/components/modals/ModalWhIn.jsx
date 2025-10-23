import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import MySelectProduct from "../selects/MySelectProduct";
import axios from "axios";
import MyDatePicker from "../../components/MyDatePicker";

const URL = "https://sakha.lat/alla";

function ModalWhIn({ show, onHide }) {
  const [date, setDate] = useState("");
  const [id_product, setProduct] = useState("");
  const [qtt, setQtt] = useState(0);
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const productObj = {
    date: date,
    id_product: id_product,
    qtt: qtt,
    price: price,
    notes: notes,
    state: false,
  };

  const addProduct = async () => {
    const formattedDate = date ? date.toISOString().split("T")[0] : "";
    productObj.date = formattedDate;

    console.log("productObj: ", productObj);
    handleClose();
  };

  const handleClose = () => {
    // clear form when close
    setDate("");
    setProduct("");
    setQtt("");
    setPrice("");
    setNotes("");
    setError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Поступление на склад</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form>
          <Form.Group controlId="formBasicType" className="mb-3">
            <MyDatePicker
              value={date}
              onChange={(selectedDate) => {
                setDate(selectedDate);
                console.log("Selected date:", selectedDate);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicType" className="mb-3">
            <Form.Label>Товар</Form.Label>
            <MySelectProduct
              value={id_product}
              onSelect={(selectedOption) => {
                console.log("Selected type:", selectedOption);
                setProduct(selectedOption);
                console.log("Selected type:", productObj.id_product);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Количество</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setQtt(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Цена</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Примечания</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setNotes(e.target.value)}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Отменить
        </Button>
        <Button
          variant="primary"
          type="submit"
          onClick={addProduct}
          disabled={loading}
        >
          {loading ? "Добавление..." : "Добавить"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalWhIn;
