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
          value: String(item.id),   // force to string for consistent comparison
          label: item.product_name,
        }));
        setOptions(formattedOptions);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (opt) => opt.value === selectedValue
    );
    if (onSelect) onSelect(selectedOption || null);
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
