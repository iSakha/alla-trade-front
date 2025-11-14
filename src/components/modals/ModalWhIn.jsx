import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import MySelectProduct from "../selects/MySelectProduct";
import axios from "axios";
import MyDatePicker from "../../components/MyDatePicker";

const URL = "https://sakha.lat/alla";
// const URL = "http://192.168.100.10:4433/wh/in";
// const URL = "http://192.168.100.10:4433";

function ModalWhIn({ show, onHide }) {
  const [date, setDate] = useState("");
  const [product, setProduct] = useState(null);
  const [qtt, setQtt] = useState(0);
  const [unit, setUnit] = useState("кг");
  const [price, setPrice] = useState(0);
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addProduct = async () => {
    console.log("date: ", date);
    // const formattedDate = date ? date.toISOString().split("T")[0] : "";
    const formattedDate = date
  ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
  : "";

    console.log("formattedDate: ", formattedDate);

    const productObj = {
      date: formattedDate,
      name: product?.label || "",
      qtt,
      unit,
      price,
      notes,
      state: false,
    };

    console.log("productObj: ", productObj);

    const response = await axios
      .post(URL + "/wh", productObj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const insertId = response.data.insertId;
        console.log("Created:", response.data);
        alert(`${productObj.name} приход учтен!`);

        // handleClose();
        // location.href = "db";
      })

      .catch((error) => {
        console.error("Error creating product:", error);
      });

    handleClose();
  };


  const handleClose = () => {
    // clear form when close
    setDate("");
    setProduct("");
    setQtt("");
    setUnit("");
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
              value={product?.value || ""}
              onSelect={(selectedOption) => {
                console.log("Selected product:", selectedOption);
                setProduct(selectedOption);
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
            <Form.Label>Единица измерения</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setUnit(e.target.value)}
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
