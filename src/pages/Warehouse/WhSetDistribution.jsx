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


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const handleEditItem_ = (product) => {
        // console.log("Edit item:", product);
        // setSelectedProduct(product);   // store row
        // setShowModalEditItem(true);    // open modal
    };

    // Called on *every input change*
    const handleEdit = (updatedProduct) => {
        setProducts(prev =>
            prev.map(p =>
                p.id === updatedProduct.id ? updatedProduct : p
            )
        );
    };

    const handleSave_ = (product) => {
        // console.log("Delete item:", product);
        // if (window.confirm(`Are you sure to delete "${product.product_name}"?`)) {
        //     axios
        //         .delete(`${URL}/products/delete/${product.id}/`)
        //         .then(() => {
        //             fetchProducts(); // refresh after deletion
        //         })
        //         .catch((err) => console.log(err));
        // }
    };

    // Called when user presses "Сохранить"
    const handleSave = async (product) => {
        console.log("Saving:", product);

        const response = await fetch(URL + "/distr/set", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(product)
        });

        const result = await response.json();
        console.log("Server response:", result);
    };


    return (
        <>
            <h2>Распределение товара</h2>
            <Container>
                <WhSetDistrTable
                    data={products}
                    onEdit={handleEdit}
                    onSave={handleSave}
                />
            </Container>
        </>
    )
}

export default WhSetDistribution