// WhSetDistribution.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import WhSetDistrTable from "../../components/tables/WhSetDistrTable";

const URL = "https://sakha.lat/alla"

function WhSetDistribution() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savedProducts, setSavedProducts] = useState(new Set()); // Для отслеживания СОХРАНЕННЫХ продуктов

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
        // Разрешаем редактирование только если продукт еще не сохранен
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
        const date = new Date();
        console.log("date:", date);
        const formattedDate = date
            ? `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}` : "";

        product.date = formattedDate;

        try {
            const response = await fetch(URL + "/distr/set", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(product)
            });

            const result = await response.json();
            console.log("Server response:", result);
            
            // Добавляем продукт в множество СОХРАНЕННЫХ
            setSavedProducts(prev => new Set(prev).add(product.id));
            
        } catch (error) {
            console.error("Save error:", error);
        }
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

export default WhSetDistribution