// Summary.jsx
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import CheckOutTable from "../../components/tables/CheckOutTable";

const URL = import.meta.env.VITE_API_URL;

function Summary() {

  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sum1, setSum1] = useState(null);
  const [sum2, setSum2] = useState(null);


  const fetchResult = () => {
    axios
      .get(URL + "/checkout")
      .then((res) => {
        setResult(res.data);
        setLoading(false);
        // console.log('res.data: ', res.data);
        setSum1(res.data[1].sale1);
        setSum2(res.data[1].sale2);
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
      <h2>Итого за неделю</h2>
      <Container>
        <CheckOutTable
          data={result[0]}
        />
        <p></p>
        <h4>Итого Алла: {sum1} р.</h4>
        <h4>Итого Инна: {sum2} р.</h4>
      </Container>
    </>
  )
}

export default Summary