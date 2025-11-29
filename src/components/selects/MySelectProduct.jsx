// MySelectProduct
import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function MySelectProduct({ onSelect, value = "" }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(URL + "/products")
      .then((res) => {
        const formattedOptions = res.data.map((item) => ({
          value: String(item.id),
          label: item.product_name,
        }));
        setOptions(formattedOptions);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // Находим option по label (названию товара)
  const findOptionByLabel = (label) => {
    return options.find(opt => opt.label === label);
  };

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    const selectedOption = options.find(
      (opt) => opt.value === selectedValue
    );
    if (onSelect) onSelect(selectedOption || null);
  };

  // Получаем value для select на основе переданного label
  const getSelectValue = () => {
    if (!value) return "";
    const option = findOptionByLabel(value);
    return option ? option.value : "";
  };

  return (
    <Form.Select onChange={handleChange} value={getSelectValue()}>
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