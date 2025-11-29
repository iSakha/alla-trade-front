// WhDistribution.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import WhDistrTable from "../../components/tables/WhDistrTable";

const URL = import.meta.env.VITE_API_URL;

function WhDistribution() {

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  const fetchProducts = () => {
    axios
      .get(URL + "/distr")
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


  return (
        <>
      <h2>Склад с учетом продаж</h2>
      <Container>
        <WhDistrTable
          data={products}
        />
      </Container>
    </>
  )
}

export default WhDistribution