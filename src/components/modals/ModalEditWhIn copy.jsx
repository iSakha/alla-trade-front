import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import MySelectProduct from "../selects/MySelectProduct";
import axios from "axios";
import MyDatePicker from "../../components/MyDatePicker";

const URL = "https://sakha.lat/alla";

function ModalEditWhIn({ show, onHide, product, onUpdated }) {
    const [formData, setFormData] = useState({
        date: "",
        name: "",
        qtt: "",
        unit: "",
        price: "",
        notes: "",
        state: "",
    });

    // Преобразуем дату из строки в объект Date для DatePicker
    const getDateObject = (dateString) => {
        if (!dateString) return new Date();
        return new Date(dateString);
    };

    useEffect(() => {
        if (product) {
            // Форматируем дату при загрузке
            const formattedDate = product.date ? product.date.split('T')[0] : "";

            setFormData({
                date: formattedDate,
                name: product.name || "",
                qtt: product.qtt || "",
                unit: product.unit || "",
                price: product.price || "",
                notes: product.notes || "",
                state: product.state || "",
            });
        }
    }, [product]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };


    const handleDateChange = (selectedDate) => {
        console.log("Selected date:", selectedDate);
        // Сохраняем дату в формате YYYY-MM-DD
        const formattedDate = selectedDate.toISOString().split("T")[0];
        setFormData(prev => ({ ...prev, date: formattedDate }));
    };

    const handleProductSelect = (selectedOption) => {
        console.log("Selected product:", selectedOption);
        setFormData(prev => ({ ...prev, name: selectedOption?.label || "" }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product) return;

        try {
            console.log("formData: ", formData);
            const response = await axios.put(
                `${URL}/wh/update/${product.id}/`,
                formData
            );
            console.log("Updated successfully:", response.data);
            alert(`Запись ${formData.name} успешно обновлена!`);

            if (onUpdated) {
                onUpdated(); // Обновляем таблицу
            }

            onHide(); // Закрываем модальное окно
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование поступления на склад</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicDate" className="mb-3">
                        <MyDatePicker
                            value={getDateObject(formData.date)}
                            onChange={handleDateChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicProduct" className="mb-3">
                        <Form.Label>Товар</Form.Label>
                        <MySelectProduct
                            value={formData.name}
                            onSelect={handleProductSelect}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicQtt" className="mb-3">
                        <Form.Label>Количество</Form.Label>
                        <Form.Control
                            type="number"
                            name="qtt"
                            value={formData.qtt}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicUnit" className="mb-3">
                        <Form.Label>Единица измерения</Form.Label>
                        <Form.Control
                            type="text"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicPrice" className="mb-3">
                        <Form.Label>Цена</Form.Label>
                        <Form.Control
                            type="number"
                            step="0.01"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicNotes" className="mb-3">
                        <Form.Label>Примечания</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={3}
                            name="notes"
                            value={formData.notes}
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <Form.Group controlId="formBasicState" className="mb-3 d-none">
                        <Form.Label>Статус</Form.Label>
                        <Form.Control
                            type="text"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Отменить
                </Button>
                <Button variant="primary" type="button" onClick={handleSubmit}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ModalEditWhIn;