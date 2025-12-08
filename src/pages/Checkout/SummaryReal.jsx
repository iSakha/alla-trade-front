// SummaryReal.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import CheckOutRealTable from "../../components/tables/CheckOutRealTable";

const URL = import.meta.env.VITE_API_URL;

function SummaryReal() {

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  const fetchResult = () => {
    axios
      .get(URL + "/checkout/real")
      .then((res) => {
        setResult(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setError("Error data loading");
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchResult();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <>
      <h2>Итого за неделю фактически</h2>
      <Container>
        <CheckOutRealTable
          data={result}
        />
      </Container>
    </>
  )
}

export default SummaryReal