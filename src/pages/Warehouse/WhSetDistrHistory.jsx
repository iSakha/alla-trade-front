// WhSetDistrHistory.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import WhSetDistrHistTable from "../../components/tables/WhSetDistrHistTable";

const URL = "https://sakha.lat/alla"

function WhSetDistrHistory() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        />
      </Container>
    </>
  )
}

export default WhSetDistrHistory