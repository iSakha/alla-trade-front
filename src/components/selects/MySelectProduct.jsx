import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

function MySelectProduct({ onSelect, value = "" }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://sakha.lat/alla/products/")
      .then((res) => {
        const formattedOptions = res.data.map((item) => ({
          value: item.id,
          label: item.product_name,
        }));
        setOptions(formattedOptions);
      })
      .catch((err) => console.error("Error fetching suppliers:", err));
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (onSelect) onSelect(selectedValue);
  };

  return (
    <Form.Select onChange={handleChange} value={value || ""}>
      <option value="" disabled>
        Выбрать товар
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
}

export default MySelectProduct;
