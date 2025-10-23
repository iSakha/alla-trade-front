// ModalAddItem.jsx
import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import MySelectSupplier from "../selects/MySelectSupplier";
import MySelectType from "../selects/MySelectType";
import axios from "axios";

const URL = "https://sakha.lat/alla"
// const URL = "http://127.0.0.1:3030";

function ModalAddItem({ show, onHide, onItemAdded }) {
  const [id_type, setType] = useState("");
  const [id_supplier, setSupplier] = useState("");
  const [product_name, setName] = useState("");
  const [unit, setUnit] = useState("кг");

  const productObj = {
    id_type: id_type,
    id_supplier: id_supplier,
    product_name: product_name,
    unit: unit,
    state: false,
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const addProduct = async () => {
    console.log("productObj: ", productObj);
    const response = await axios
      .post(URL + "/products/create", productObj, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const insertId = response.data.insertId;
        console.log("Created:", response.data);
        alert(`${productObj.product_name} успешно добавлено!`);

        handleClose();
        location.href = "db";
      })

      .catch((error) => {
        console.error("Error creating product:", error);
      });
  };

  const handleClose = () => {
    // Сбрасываем форму при закрытии
    setType("");
    setSupplier("");
    setName("");
    setUnit("");
    setError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Добавление товара в базу данных</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        <Form>
          <Form.Group controlId="formBasicType" className="mb-3">
            <Form.Label>Категория товара</Form.Label>
            <MySelectType
              value={id_type}
              onSelect={(selectedOption) => {
                console.log("Selected type:", selectedOption);
                setType(selectedOption);
                console.log("Selected type:", productObj.id_type);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicSupplier" className="mb-3">
            <Form.Label>Поставщик</Form.Label>
            <MySelectSupplier
              value={id_supplier}
              onSelect={(selectedOption) => {
                console.log("Selected supplier:", selectedOption);
                setSupplier(selectedOption);
                console.log("Selected supplier:", productObj.id_supplier);
              }}
            />
          </Form.Group>

          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Наименование товара</Form.Label>
            <Form.Control
              type="text"
              name="name"
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicUnit" className="mb-3">
            <Form.Label>Ед. измерения</Form.Label>
            <Form.Control
              type="text"
              name="unit"
              onChange={(e) => setUnit(e.target.value)}
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

export default ModalAddItem;
