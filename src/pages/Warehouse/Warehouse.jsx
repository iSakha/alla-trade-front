// Wrehouse.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import WhTable from "../../components/tables/WhTable";

const URL = import.meta.env.VITE_API_URL;


function Warehouse() {

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchProducts = () => {
    axios
      .get(URL + "/wh/stock")
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
      <h2>Наличие на складе</h2>
      <Container>
        <WhTable
          data={products}
        />
      </Container>
    </>
  )
}

export default Warehouse