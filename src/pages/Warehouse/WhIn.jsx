import React, { useState, useEffect } from "react";
import { Button, Form, Container } from "react-bootstrap";
import MyDatePicker from "../../components/MyDatePicker";
import MySelectProduct from "../../components/selects/MySelectProduct";
import MySelectSupplier from "../../components/selects/MySelectSupplier";

function WhIn() {
  const [formData, setFormData] = useState({
    id_type: "",
    id_supplier: "",
    product_name: "",
    unit: "",
  });

  return (
    <>
      <h2>Поступление на склад</h2>
      <Container>
        <MyDatePicker />
        <MySelectProduct />
        <MySelectSupplier />
      </Container>
    </>
  );
}

export default WhIn;
