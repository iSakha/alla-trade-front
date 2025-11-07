// Database.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import DbTable from "../../../components/tables/DbTable";
import ModalEditItem from "../../../components/modals/ModalEditItem";

const URL = "https://sakha.lat/alla"
// const URL = "http://127.0.0.1:4444"

function Database() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModalEditItem, setShowModalEditItem] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    axios
      .get(URL + "/products")
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

  const handleEditItem = (product) => {
    console.log("Edit item:", product);
    setSelectedProduct(product);   // store row
    setShowModalEditItem(true);    // open modal
  };

  const handleDelete = (product) => {
    console.log("Delete item:", product);
    if (window.confirm(`Are you sure to delete "${product.product_name}"?`)) {
      axios
        .delete(`${URL}/products/delete/${product.id}/`)
        .then(() => {
          fetchProducts(); // refresh after deletion
        })
        .catch((err) => console.log(err));
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
      <h2>Ассортимент</h2>
      <Container>
        <DbTable 
          data={products} 
          onEdit={handleEditItem}
          onDelete={handleDelete}
        />
      </Container>

      {showModalEditItem && (
        <ModalEditItem 
          show={showModalEditItem}
          onHide={() => setShowModalEditItem(false)}
          product={selectedProduct}
          onUpdated={fetchProducts} // refresh after save
        />
      )}
    </>
  );
}

export default Database;
