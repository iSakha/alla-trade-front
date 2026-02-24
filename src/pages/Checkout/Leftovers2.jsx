// Leftovers2.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import LeftoversTable2 from "../../components/tables/LeftoversTable2";

const URL = import.meta.env.VITE_API_URL;

function Leftovers2() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [savedProducts, setSavedProducts] = useState(new Set());

    // console.log('VITE_API_URL:', import.meta.env.VITE_API_URL);
    // console.log('MODE:', import.meta.env.MODE);
    // console.log('PROD:', import.meta.env.PROD);
    // console.log('DEV:', import.meta.env.DEV);

    const fetchProducts = () => {
        axios
            .get(URL + "/checkout/leftovers/2")
            .then((res) => {
                const productsWithInputs = res.data.map(product => ({
                    ...product,
                    price: "",
                    alla_qtt: "",
                    inna_qtt: ""
                }));
                setProducts(productsWithInputs);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Ошибка загрузки данных:", err);
                setError("Ошибка загрузки данных");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleEdit = (updatedProduct) => {
        if (!savedProducts.has(updatedProduct.id_prod)) {
            setProducts(prev =>
                prev.map(p =>
                    p.id_prod === updatedProduct.id_prod ? updatedProduct : p
                )
            );
        }
    };

    const handleSave = async (product) => {
        if (!product.price || !product.inna_qtt) {
            alert("Пожалуйста, заполните все поля: цена, количество у Инны");
            return;
        }

        console.log("product :", product);

        const dataToSend = {
            id_prod: product.id_prod,
            product_name: product.product_name,
            unit: product.unit,
            price: parseFloat(product.price),
            alla_qtt: parseFloat(product.alla_qtt),
            inna_qtt: parseFloat(product.inna_qtt),
            date: new Date().toISOString().split('T')[0]
        };

        try {
            const response = await axios.post(URL + "/checkout/leftovers", dataToSend, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            alert(`Данные по ${product.product_name} сохранены!`);
            setSavedProducts(prev => new Set(prev).add(product.id_prod));

        } catch (error) {
            console.error("Ошибка сохранения:", error);
            alert("Ошибка при сохранении данных");
        }
    };

    if (loading) {
        return <div className="text-center p-5">Загрузка данных...</div>;
    }

    if (error) {
        return <div className="alert alert-danger">Ошибка: {error}</div>;
    }

    return (
        <>
            <h1>Инна</h1>
            <h2>Остатки за неделю</h2>
            <p className="text-muted">Заполните цену и количество у каждого продавца, затем нажмите "Сохранить"</p>
            <Container>
                {products.length > 0 ? (
                    <LeftoversTable2
                        data={products}
                        onEdit={handleEdit}
                        onSave={handleSave}
                        savedProducts={savedProducts}
                        seller = {1}
                    />
                ) : (
                    <div className="alert alert-warning">
                        Нет данных для отображения
                    </div>
                )}
            </Container>
        </>
    );
}

export default Leftovers2;