// WhSetDistribution.jsx
import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import WhSetDistrTable from "../../components/tables/WhSetDistrTable";
import MyDatePicker from "../../components/MyDatePicker";

const URL = import.meta.env.VITE_API_URL;

function WhSetDistribution() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savedProducts, setSavedProducts] = useState(new Set());
    const [selectedDate, setSelectedDate] = useState(new Date()); // Текущая дата по умолчанию

    const fetchProducts = () => {
        axios
            .get(URL + "/distr/set")
            .then((res) => {
                setProducts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
                setError("Error data loading");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    // Called on *every input change*
    const handleEdit = (updatedProduct) => {
        if (!savedProducts.has(updatedProduct.id)) {
            setProducts(prev =>
                prev.map(p =>
                    p.id === updatedProduct.id ? updatedProduct : p
                )
            );
        }
    };

    // Called when user presses "Сохранить"
    const handleSave = async (product) => {
        // Используем выбранную дату (или текущую, если не меняли)
        const formattedDate = selectedDate
            ? `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`
            : "";

        console.log("Selected date for saving:", formattedDate);

        // Добавляем дату к продукту
        const productWithDate = {
            ...product,
            date: formattedDate
        };

        try {
            const response = await fetch(URL + "/distr/set", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(productWithDate)
            });

            const result = await response.json();
            console.log("Server response:", result);

            // Добавляем продукт в множество СОХРАНЕННЫХ
            setSavedProducts(prev => new Set(prev).add(product.id));

        } catch (error) {
            console.error("Save error:", error);
        }
    };

    // Функция для сброса даты на сегодня
    const resetToToday = () => {
        setSelectedDate(new Date());
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <>
            <h2>Распределение товара</h2>
            <Container>
                <Row className="mb-3 align-items-center">
                    <Col md={6}>
                        <div className="d-flex align-items-center">
                            <span className="me-3 fw-bold">Дата распределения:</span>
                            <MyDatePicker
                                value={selectedDate}
                                onChange={(date) => {
                                    console.log("Date selected:", date);
                                    setSelectedDate(date);
                                }}
                            />
                        </div>
                    </Col>
                    <Col md={6}>
                        <button 
                            className="btn btn-outline-secondary btn-sm"
                            onClick={resetToToday}
                        >
                            Сегодня
                        </button>
                    </Col>
                </Row>
                
                <WhSetDistrTable
                    data={products}
                    onEdit={handleEdit}
                    onSave={handleSave}
                    savedProducts={savedProducts}
                />
            </Container>
        </>
    )
}

export default WhSetDistribution;