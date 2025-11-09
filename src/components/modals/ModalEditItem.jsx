import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import MySelectSupplier from "../selects/MySelectSupplier";
import MySelectType from "../selects/MySelectType";

const URL = "https://sakha.lat/alla"

function ModalEditItem({ show, onHide, product }) {
  const [formData, setFormData] = useState({
    id_type: "",
    id_supplier: "",
    product_name: "",
    unit: "",
  });

  useEffect(() => {
    if (product) {
      setFormData({
        id_type: product.id_type || "",
        id_supplier: product.id_supplier || "",
        product_name: product.product_name || "",
        unit: product.unit || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!product) return;

    console.log("formData: ", formData);

    try {
      const response = await fetch(
        URL + `/products/update/${product.id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update product");
      }

      console.log("Product updated successfully");
      alert(`Запись ${formData.product_name} успешно обновлена!`);
      onHide(); // close modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Редактирование товара</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicType" className="mb-3">
            <Form.Label>Категория товара</Form.Label>
            <MySelectType
              value={formData.id_type}
              onSelect={(val) => setFormData((prev) => ({ ...prev, id_type: val }))}
            />
          </Form.Group>
          <Form.Group controlId="formBasicSupplier" className="mb-3">
            <Form.Label>Поставщик</Form.Label>
            <MySelectSupplier
              value={formData.id_supplier}
              onSelect={(val) =>
                setFormData((prev) => ({ ...prev, id_supplier: val }))
              }
            />
          </Form.Group>
          <Form.Group controlId="formBasicName" className="mb-3">
            <Form.Label>Наименование товара</Form.Label>
            <Form.Control
              type="text"
              name="product_name"
              value={formData.product_name}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="formBasicUnit" className="mb-3">
            <Form.Label>Ед. измерения</Form.Label>
            <Form.Control
              type="text"
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              required
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Отменить
        </Button>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          Сохранить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalEditItem;
