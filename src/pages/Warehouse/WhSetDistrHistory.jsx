// WhSetDistrHistory.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import WhSetDistrHistTable from "../../components/tables/WhSetDistrHistTable";
import ModalEditDistrHistory from "../../components/modals/ModalEditDistrHistory";

const URL = import.meta.env.VITE_API_URL;

function WhSetDistrHistory() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [showModalEditDistrHistory, setShowModalEditDistrHistory] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const fetchProducts = () => {
    axios
      .get(URL + "/distr/history")
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
    setShowModalEditDistrHistory(true);    // open modal
  };

  const handleDelete = (product) => {
    // console.log("Delete item:", product);
    // if (window.confirm(`Are you sure to delete "${product.product_name}"?`)) {
    //   axios
    //     .delete(`${URL}/products/delete/${product.id}/`)
    //     .then(() => {
    //       fetchProducts(); // refresh after deletion
    //     })
    //     .catch((err) => console.log(err));
    // }
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <h2>История кому, когда и сколько</h2>
      <Container>
        <WhSetDistrHistTable
          data={products}
          onEdit={handleEditItem}
          onDelete={handleDelete}
        />
      </Container>

      {showModalEditDistrHistory && (
        <ModalEditDistrHistory
          show={showModalEditDistrHistory}
          onHide={() => setShowModalEditDistrHistory(false)}
          product={selectedProduct}
          onUpdated={fetchProducts} // refresh after save
        />
      )}
    </>
  )
}

export default WhSetDistrHistory