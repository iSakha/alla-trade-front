// ModalWhIn.jsx
import React, { useState } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import MySelectProduct from "../selects/MySelectProduct";
import axios from "axios";
import MyDatePicker from "../../components/MyDatePicker";

const URL = import.meta.env.VITE_API_URL;

function ModalWhIn({ show, onHide }) {
  const [date, setDate] = useState("");
  const [product, setProduct] = useState(null);
  const [qtt, setQtt] = useState("");
  const [unit, setUnit] = useState("кг");
  const [notes, setNotes] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Дополнительная валидация на случай если браузерная не сработала
    if (!date) {
      setError("Пожалуйста, выберите дату");
      return;
    }
    
    if (!product) {
      setError("Пожалуйста, выберите товар");
      return;
    }
    
    if (!qtt || parseFloat(qtt) <= 0) {
      setError("Пожалуйста, укажите корректное количество");
      return;
    }
    
    if (!unit.trim()) {
      setError("Пожалуйста, укажите единицу измерения");
      return;
    }

    setLoading(true);
    setError("");

    const formattedDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      : "";

    // Создаем объект с явными именами полей
    const productObj = {
      date: formattedDate,
      product_id: product.value,     // ← ID продукта
      product_name: product.label,   // ← Название продукта
      qtt: parseFloat(qtt),
      unit: unit.trim(),
      notes: notes.trim(),
      state: false,
    };

    console.log("Отправка данных:", productObj);

    try {
      const response = await axios.post(URL + "/wh", productObj, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      
      console.log("Создано:", response.data);
      alert(`${productObj.product_name} приход учтен!`);
      handleClose();
      
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
      setError(error.response?.data?.message || "Ошибка при добавлении товара");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    // Очищаем форму при закрытии
    setDate("");
    setProduct(null);
    setQtt("");
    setUnit("кг");
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
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicDate" className="mb-3">
            <Form.Label>Дата *</Form.Label>
            <MyDatePicker
              value={date}
              onChange={(selectedDate) => {
                setDate(selectedDate);
                console.log("Selected date:", selectedDate);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicProduct" className="mb-3">
            <Form.Label>Товар *</Form.Label>
            <MySelectProduct
              value={product?.label || ""}
              onSelect={(selectedOption) => {
                console.log("Selected product:", selectedOption);
                setProduct(selectedOption);
              }}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicQtt" className="mb-3">
            <Form.Label>Количество *</Form.Label>
            <Form.Control
              type="number"
              step="0.01"
              min="0.01"
              value={qtt}
              onChange={(e) => setQtt(e.target.value)}
              required
              placeholder="Введите количество"
            />
          </Form.Group>

          <Form.Group controlId="formBasicUnit" className="mb-3">
            <Form.Label>Единица измерения *</Form.Label>
            <Form.Control
              type="text"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              required
              placeholder="кг, шт, л и т.д."
            />
          </Form.Group>

          <Form.Group controlId="formBasicNotes" className="mb-3">
            <Form.Label>Примечания</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Необязательные примечания"
            />
          </Form.Group>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Отменить
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Добавление..." : "Добавить"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalWhIn;