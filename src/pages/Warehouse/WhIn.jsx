// WhIn.jsx
import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import WhInTable from "../../components/tables/WhInTable";
import axios from "axios";
import ModalEditWhIn from "../../components/modals/ModalEditWhIn";

const URL = import.meta.env.VITE_API_URL;

function WhIn() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModalEditWhIn, setShowModalEditWhIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    axios
      .get(URL + "/wh")
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
        console.log('get-wh-n products: ', res.data)
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

  const handleEditItem = (product) => {
    console.log("Edit item:", product);
    setSelectedProduct(product);   // store row
    setShowModalEditWhIn(true);    // open modal
  };

  const handleDelete = (product) => {
    console.log("Delete item:", product);
    if (window.confirm(`Are you sure to delete "${product.name}"?`)) {
      axios
        .delete(`${URL}/wh/delete/${product.id}/`)
        .then(() => {
          fetchProducts(); // refresh after deletion
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <h2>Поступления на склад</h2>
      <Container>
        <WhInTable
          data={products}
          onEdit={handleEditItem}
          onDelete={handleDelete} />
      </Container>

      {showModalEditWhIn && (
        <ModalEditWhIn
          show={showModalEditWhIn}
          onHide={() => setShowModalEditWhIn(false)}
          product={selectedProduct}
          onUpdated={fetchProducts} // Добавь этот пропс
        />
      )}
    </>
  );
}

export default WhIn;
