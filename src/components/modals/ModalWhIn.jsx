// ModalWhIn.jsx

import React, { useState } from "react";
import { Modal, Form, Button, Alert, Row, Col } from "react-bootstrap";
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
  
  // Новые поля
  const [expiryDate, setExpiryDate] = useState(""); // срок реализации
  const [expiryWarning, setExpiryWarning] = useState("week"); // предупреждение за (week/month)
  const [minQuantity, setMinQuantity] = useState(""); // минимальное количество
  const [minQuantityWarning, setMinQuantityWarning] = useState("week"); // предупреждение за (week/month)

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

    // Валидация для минимального количества (если указано)
    if (minQuantity && parseFloat(minQuantity) < 0) {
      setError("Минимальное количество не может быть отрицательным");
      return;
    }

    setLoading(true);
    setError("");

    const formattedDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      : "";

    const formattedExpiryDate = expiryDate
      ? `${expiryDate.getFullYear()}-${String(expiryDate.getMonth() + 1).padStart(2, "0")}-${String(expiryDate.getDate()).padStart(2, "0")}`
      : null;

    // Создаем объект с явными именами полей
    const productObj = {
      date: formattedDate,
      product_id: product.value,
      product_name: product.label,
      qtt: parseFloat(qtt),
      unit: unit.trim(),
      notes: notes.trim(),
      state: false,
      // Новые поля
      expiry_date: formattedExpiryDate,
      expiry_warning: expiryWarning,
      min_quantity: minQuantity ? parseFloat(minQuantity) : null,
      min_quantity_warning: minQuantityWarning
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
    setExpiryDate("");
    setExpiryWarning("week");
    setMinQuantity("");
    setMinQuantityWarning("week");
    setError("");
    onHide();
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Поступление на склад</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6}>
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
            </Col>
            
            <Col md={6}>
              <Form.Group controlId="formExpiryDate" className="mb-3">
                <Form.Label>Срок реализации</Form.Label>
                <MyDatePicker
                  value={expiryDate}
                  onChange={(selectedDate) => {
                    setExpiryDate(selectedDate);
                    console.log("Selected expiry date:", selectedDate);
                  }}
                />
                <Form.Text className="text-muted">
                  Оставьте пустым, если не требуется контроль срока
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group controlId="formExpiryWarning" className="mb-3">
                <Form.Label>Предупреждать о сроке за</Form.Label>
                <Form.Select
                  value={expiryWarning}
                  onChange={(e) => setExpiryWarning(e.target.value)}
                  disabled={!expiryDate}
                >
                  <option value="week">Неделя</option>
                  <option value="month">Месяц</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  За сколько времени предупреждать об истечении срока
                </Form.Text>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group controlId="formMinQuantityWarning" className="mb-3">
                <Form.Label>Предупреждать о количестве за</Form.Label>
                <Form.Select
                  value={minQuantityWarning}
                  onChange={(e) => setMinQuantityWarning(e.target.value)}
                  disabled={!minQuantity}
                >
                  <option value="week">Неделя</option>
                  <option value="month">Месяц</option>
                </Form.Select>
                <Form.Text className="text-muted">
                  За сколько времени предупреждать о достижении минимума
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

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

          <Row>
            <Col md={6}>
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
            </Col>

            <Col md={6}>
              <Form.Group controlId="formMinQuantity" className="mb-3">
                <Form.Label>Минимальное количество</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  min="0"
                  value={minQuantity}
                  onChange={(e) => setMinQuantity(e.target.value)}
                  placeholder="Введите минимальное количество"
                />
                <Form.Text className="text-muted">
                  Оставьте пустым, если не требуется контроль количества
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
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
            </Col>

            <Col md={6}>
              <Form.Group controlId="formBasicNotes" className="mb-3">
                <Form.Label>Примечания</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={1}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Необязательные примечания"
                />
              </Form.Group>
            </Col>
          </Row>

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