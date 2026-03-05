import React, { useState, useEffect } from "react";
import { Container, Form, Button, Row, Col, Alert } from "react-bootstrap";
import SuppliersTable from "../../../components/tables/SuppliersTable";
import axios from "axios";

function Suppliers() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newSupplierName, setNewSupplierName] = useState("");
  const [addError, setAddError] = useState("");
  const [addSuccess, setAddSuccess] = useState("");
  const [deleteSuccess, setDeleteSuccess] = useState("");

  const URL = import.meta.env.VITE_API_URL;

  const fetchSuppliers = () => {
    axios
      .get(URL + "/suppliers")
      .then((res) => {
        setSuppliers(res.data);
        setLoading(false);
        console.log('get-suppliers: ', res.data)
      })
      .catch((err) => {
        console.log(err);
        setError("Ошибка загрузки данных");
        setLoading(false);
      });
  };

  const handleAddSupplier = async (e) => {
    e.preventDefault();
    
    if (!newSupplierName.trim()) {
      setAddError("Введите имя поставщика");
      return;
    }

    setAddError("");
    setAddSuccess("");

    try {
      await axios.post(URL + "/suppliers", {
        name: newSupplierName.trim()
      });
      
      setNewSupplierName("");
      setAddSuccess("Поставщик успешно добавлен!");
      fetchSuppliers();
      setTimeout(() => setAddSuccess(""), 3000);
      
    } catch (err) {
      console.error("Ошибка при добавлении поставщика:", err);
      setAddError(err.response?.data?.message || "Ошибка при добавлении поставщика");
    }
  };

  // Функция удаления поставщика
  const handleDeleteSupplier = async (supplier) => {
    // Спрашиваем подтверждение
    if (!window.confirm(`Вы уверены, что хотите удалить поставщика "${supplier.name}"?`)) {
      return;
    }

    try {
      await axios.delete(`${URL}/suppliers/${supplier.id}`);
      
      setDeleteSuccess(`Поставщик "${supplier.name}" успешно удален!`);
      
      // Обновляем список
      fetchSuppliers();
      
      // Скрываем сообщение через 3 секунды
      setTimeout(() => setDeleteSuccess(""), 3000);
      
    } catch (err) {
      console.error("Ошибка при удалении поставщика:", err);
      alert(err.response?.data?.message || "Ошибка при удалении поставщика");
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  return (
    <div>
      <h2 className="mb-4">Список поставщиков</h2>
      <Container>
        {/* Форма добавления поставщика */}
        <Form onSubmit={handleAddSupplier} className="mb-4">
          <Row>
            <Col md={8} lg={9}>
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Введите имя нового поставщика"
                  value={newSupplierName}
                  onChange={(e) => setNewSupplierName(e.target.value)}
                  isInvalid={!!addError}
                />
                <Form.Control.Feedback type="invalid">
                  {addError}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={4} lg={3}>
              <Button 
                variant="primary" 
                type="submit" 
                className="w-100"
              >
                Добавить поставщика
              </Button>
            </Col>
          </Row>
          
          {/* Сообщения об успехе */}
          {addSuccess && (
            <Alert variant="success" className="mt-3">
              {addSuccess}
            </Alert>
          )}
          {deleteSuccess && (
            <Alert variant="info" className="mt-3">
              {deleteSuccess}
            </Alert>
          )}
        </Form>

        {/* Таблица поставщиков */}
        {loading ? (
          <p>Загрузка...</p>
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : (
          <SuppliersTable 
            data={suppliers} 
            onDelete={handleDeleteSupplier}
          />
        )}
      </Container>
    </div>
  )
}

export default Suppliers;