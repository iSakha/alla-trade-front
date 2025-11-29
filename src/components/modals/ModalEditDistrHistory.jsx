// ModalEditDistrHistory
import React, { useState, useEffect } from "react";
import { Modal, Form, Button, Alert } from "react-bootstrap";
import MyDatePicker from "../../components/MyDatePicker";
import MySelectProduct from "../selects/MySelectProduct";

const URL = import.meta.env.VITE_API_URL;

function ModalEditDistrHistory({ show, onHide, product, onUpdated }) {

    const [formData, setFormData] = useState({
        id: "",
        date: "",
        product_name: "",
        unit: "",
        price: "",
        qtt_pers1: "",
        qtt_pers2: ""
    });

    // Преобразуем дату из строки в объект Date для DatePicker
    const getDateObject = (dateString) => {
        if (!dateString) return new Date();
        return new Date(dateString);
    };

    useEffect(() => {
        if (product) {
            setFormData({
                id: product.id || "",
                date: product.date || "",
                product_name: product.product_name || "",
                unit: product.unit || "",
                unit: product.price || "",
                unit: product.qtt_pers1 || "",
                unit: product.qtt_pers2 || "",
            });
        }
    }, [product]);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleDateChange = (date) => {
        console.log("Selected date:", date);
        // Сохраняем дату в формате YYYY-MM-DD
        // const formattedDate = selectedDate.toISOString().split("T")[0];
        const formattedDate = date
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
            : "";
        setFormData(prev => ({ ...prev, date: formattedDate }));
    };

    const handleProductSelect = (selectedOption) => {
        console.log("Selected product:", selectedOption);
        // Сохраняем и value (id) и label (name)
        setFormData(prev => ({ 
            ...prev, 
            name: selectedOption?.label || "",
            // Если нужно сохранить id продукта, добавь поле product_id в formData
            // product_id: selectedOption?.value || ""
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!product) return;

        console.log("formData: ", formData);

        // try {
        //     const response = await fetch(
        //         URL + `/products/update/${product.id}`,
        //         {
        //             method: "PUT",
        //             headers: { "Content-Type": "application/json" },
        //             body: JSON.stringify(formData),
        //         }
        //     );

        //     if (!response.ok) {
        //         throw new Error("Failed to update product");
        //     }

        //     console.log("Product updated successfully");
        //     alert(`Запись ${formData.product_name} успешно обновлена!`);
        //     onHide(); // close modal
        // } catch (err) {
        //     console.error(err);
        // }
    };



    return (
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>Редактирование</Modal.Title>
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
    )
}

export default ModalEditDistrHistory