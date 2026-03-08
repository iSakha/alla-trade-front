// ModalWhIn.jsx
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert, Row, Col } from "react-bootstrap";
import MySelectProduct from "../selects/MySelectProduct";
import axios from "axios";
import MyDatePicker from "../../components/MyDatePicker";

const URL = import.meta.env.VITE_API_URL;

// Стили для подсветки полей ввода
const fieldStyles = {
  formGroup: {
    marginBottom: '1rem',
    padding: '0.5rem',
    borderRadius: '8px',
    backgroundColor: '#f8f9fa', // очень светлый серый фон
    transition: 'all 0.3s ease',
  },
  formGroupHover: {
    backgroundColor: '#e9ecef', // чуть темнее при наведении
  },
  label: {
    fontWeight: '500',
    color: '#495057',
    marginBottom: '0.3rem',
    fontSize: '0.9rem',
    textTransform: 'uppercase', // маленькие заглавные для лучшей читаемости
    letterSpacing: '0.5px',
  },
  requiredStar: {
    color: '#dc3545',
    marginLeft: '4px',
  },
  input: {
    border: '2px solid #dee2e6',
    borderRadius: '6px',
    padding: '0.5rem 0.75rem',
    backgroundColor: 'white',
    transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
  },
  inputFocus: {
    borderColor: '#86b7fe',
    boxShadow: '0 0 0 0.25rem rgba(13, 110, 253, 0.25)',
  },
  searchHighlight: {
    backgroundColor: '#fff3cd', // светло-желтый для поиска
    border: '2px solid #ffe69c',
  },
};

function ModalWhIn({ show, onHide }) {
  // Состояния для полей
  const [date, setDate] = useState(new Date());
  const [searchTerm, setSearchTerm] = useState("");
  const [product, setProduct] = useState(null);
  const [qtt, setQtt] = useState("");
  const [unit, setUnit] = useState(""); // теперь пусто, заполнится из товара
  const [notes, setNotes] = useState("");
  
  // Поля для контроля
  const [expiryDate, setExpiryDate] = useState("");
  const [expiryWarning, setExpiryWarning] = useState("week");
  const [minQuantity, setMinQuantity] = useState("");
  const [minQuantityWarning, setMinQuantityWarning] = useState("week");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Состояния для hover эффектов
  const [hoveredField, setHoveredField] = useState(null);
  
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    if (show) {
      fetchProducts();
    }
  }, [show]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(URL + "/products");
      const products = Array.isArray(response.data) ? response.data : [];
      setAllProducts(products);
      setFilteredProducts(products);
    } catch (error) {
      console.error("Ошибка загрузки продуктов:", error);
      setAllProducts([]);
      setFilteredProducts([]);
    }
  };

  useEffect(() => {
    if (!Array.isArray(allProducts)) {
      setFilteredProducts([]);
      return;
    }
    
    if (searchTerm.trim() === "") {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(product => 
        product.product_name && product.product_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchTerm, allProducts]);

  const validateForm = () => {
    if (!date) {
      setError("Пожалуйста, выберите дату");
      return false;
    }
    
    if (!product) {
      setError("Пожалуйста, выберите товар");
      return false;
    }
    
    if (!qtt || parseFloat(qtt) <= 0) {
      setError("Пожалуйста, укажите корректное количество");
      return false;
    }
    
    if (!unit) {
      setError("Единица измерения не определена для этого товара");
      return false;
    }

    if (minQuantity && parseFloat(minQuantity) < 0) {
      setError("Минимальное количество не может быть отрицательным");
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setError("");
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    const formattedDate = date
      ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
      : "";

    const formattedExpiryDate = expiryDate
      ? `${expiryDate.getFullYear()}-${String(expiryDate.getMonth() + 1).padStart(2, "0")}-${String(expiryDate.getDate()).padStart(2, "0")}`
      : null;

    const productObj = {
      date: formattedDate,
      product_id: product.value,
      product_name: product.label,
      qtt: parseFloat(qtt),
      unit: unit,
      notes: notes.trim(),
      state: false,
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
      setSuccess(`${productObj.product_name} успешно добавлен!`);
      
      setTimeout(() => {
        handleClose();
      }, 1500);
      
    } catch (error) {
      console.error("Ошибка при добавлении товара:", error);
      setError(error.response?.data?.message || "Ошибка при добавлении товара");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setDate(new Date());
    setSearchTerm("");
    setProduct(null);
    setQtt("");
    setUnit("");
    setNotes("");
    setExpiryDate("");
    setExpiryWarning("week");
    setMinQuantity("");
    setMinQuantityWarning("week");
    setError("");
    setSuccess("");
    setLoading(false);
    onHide();
  };

  // Функция для получения стилей поля
  const getFieldStyle = (fieldName) => {
    let style = { ...fieldStyles.formGroup };
    
    if (hoveredField === fieldName) {
      style = { ...style, ...fieldStyles.formGroupHover };
    }
    
    return style;
  };

  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Поступление на склад</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger" dismissible onClose={() => setError("")}>{error}</Alert>}
        {success && <Alert variant="success">{success}</Alert>}

        <Form onSubmit={handleSubmit}>
          {/* Первая строка: Дата и Поиск */}
          <Row>
            <Col md={6}>
              <div 
                style={getFieldStyle('date')}
                onMouseEnter={() => setHoveredField('date')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Дата <span style={fieldStyles.requiredStar}>*</span>
                  </Form.Label>
                  <MyDatePicker
                    value={date}
                    onChange={(selectedDate) => setDate(selectedDate)}
                  />
                  <Form.Text className="text-muted">
                    Выберите дату поступления
                  </Form.Text>
                </Form.Group>
              </div>
            </Col>
            <Col md={6}>
              <div 
                style={{
                  ...fieldStyles.formGroup,
                  ...(searchTerm ? fieldStyles.searchHighlight : {})
                }}
                onMouseEnter={() => setHoveredField('search')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Поиск товара
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Начните вводить название товара..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={fieldStyles.input}
                  />
                  {searchTerm && Array.isArray(filteredProducts) && (
                    <Form.Text className="text-muted">
                      Найдено: {filteredProducts.length} товаров
                    </Form.Text>
                  )}
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Вторая строка: Товар и Количество */}
          <Row>
            <Col md={6}>
              <div 
                style={getFieldStyle('product')}
                onMouseEnter={() => setHoveredField('product')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Товар <span style={fieldStyles.requiredStar}>*</span>
                  </Form.Label>
                  <MySelectProduct
                    value={product?.label || ""}
                    onSelect={(selectedOption) => {
                      setProduct(selectedOption);
                      if (selectedOption?.unit) {
                        setUnit(selectedOption.unit);
                      }
                    }}
                    options={filteredProducts || []}
                    placeholder="Выберите товар из списка..."
                    required
                  />
                  <Form.Text className="text-muted">
                    {product ? `Выбран: ${product.label}` : 'Начните поиск выше или выберите из списка'}
                  </Form.Text>
                </Form.Group>
              </div>
            </Col>
            <Col md={6}>
              <div 
                style={getFieldStyle('qtt')}
                onMouseEnter={() => setHoveredField('qtt')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Количество <span style={fieldStyles.requiredStar}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0.01"
                    value={qtt}
                    onChange={(e) => setQtt(e.target.value)}
                    placeholder="Введите количество"
                    style={fieldStyles.input}
                    required
                  />
                  <Form.Text className="text-muted">
                    {unit ? `Единица измерения: ${unit}` : 'Сначала выберите товар'}
                  </Form.Text>
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Третья строка: Минимальное количество и Предупреждение */}
          <Row>
            <Col md={6}>
              <div 
                style={getFieldStyle('minQuantity')}
                onMouseEnter={() => setHoveredField('minQuantity')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Минимальное количество
                  </Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    min="0"
                    value={minQuantity}
                    onChange={(e) => setMinQuantity(e.target.value)}
                    placeholder="Введите мин. количество (необязательно)"
                    style={fieldStyles.input}
                  />
                </Form.Group>
              </div>
            </Col>
            <Col md={6}>
              <div 
                style={getFieldStyle('minQuantityWarning')}
                onMouseEnter={() => setHoveredField('minQuantityWarning')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Предупреждать о количестве за
                  </Form.Label>
                  <Form.Select
                    value={minQuantityWarning}
                    onChange={(e) => setMinQuantityWarning(e.target.value)}
                    disabled={!minQuantity}
                    style={fieldStyles.input}
                  >
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Четвертая строка: Срок реализации и Предупреждение */}
          <Row>
            <Col md={6}>
              <div 
                style={getFieldStyle('expiryDate')}
                onMouseEnter={() => setHoveredField('expiryDate')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Срок реализации
                  </Form.Label>
                  <MyDatePicker
                    value={expiryDate}
                    onChange={(selectedDate) => setExpiryDate(selectedDate)}
                  />
                </Form.Group>
              </div>
            </Col>
            <Col md={6}>
              <div 
                style={getFieldStyle('expiryWarning')}
                onMouseEnter={() => setHoveredField('expiryWarning')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Предупреждать о сроке за
                  </Form.Label>
                  <Form.Select
                    value={expiryWarning}
                    onChange={(e) => setExpiryWarning(e.target.value)}
                    disabled={!expiryDate}
                    style={fieldStyles.input}
                  >
                    <option value="week">Неделя</option>
                    <option value="month">Месяц</option>
                  </Form.Select>
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Пятая строка: Единица измерения (readonly) и Примечания */}
          <Row>
            <Col md={6}>
              <div 
                style={getFieldStyle('unit')}
                onMouseEnter={() => setHoveredField('unit')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Единица измерения <span style={fieldStyles.requiredStar}>*</span>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={unit}
                    readOnly
                    placeholder="Определяется выбранным товаром"
                    style={{
                      ...fieldStyles.input,
                      backgroundColor: '#e9ecef',
                      cursor: 'not-allowed'
                    }}
                  />
                  <Form.Text className="text-muted">
                    Берется из карточки товара
                  </Form.Text>
                </Form.Group>
              </div>
            </Col>
            <Col md={6}>
              <div 
                style={getFieldStyle('notes')}
                onMouseEnter={() => setHoveredField('notes')}
                onMouseLeave={() => setHoveredField(null)}
              >
                <Form.Group>
                  <Form.Label style={fieldStyles.label}>
                    Примечания
                  </Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={1}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Дополнительная информация (необязательно)"
                    style={fieldStyles.input}
                  />
                </Form.Group>
              </div>
            </Col>
          </Row>

          {/* Визуальная подсказка с последовательностью заполнения */}
          <Alert variant="info" className="mt-3">
            <small>
              <strong>✨ Подсказка по заполнению:</strong><br />
              1. Выберите <strong>дату</strong> поступления<br />
              2. Найдите <strong>товар</strong> через поиск или выберите из списка<br />
              3. Укажите <strong>количество</strong><br />
              4. При необходимости заполните дополнительные поля
            </small>
          </Alert>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose} disabled={loading}>
              Отменить
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? "Добавление..." : "Добавить товар"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ModalWhIn;