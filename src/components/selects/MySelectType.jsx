import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

const URL = import.meta.env.VITE_API_URL;

function MySelectType({ onSelect, value = "" }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get(URL + "/types")
      .then((res) => {
        const formattedOptions = res.data.map((item) => ({
          value: item.id,
          label: item.type,
        }));
        setOptions(formattedOptions);
      })
      .catch((err) => console.error("Error fetching types:", err));
  }, []);

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    if (onSelect) onSelect(selectedValue);
  };

  return (
    <Form.Select onChange={handleChange} value={value || ""}>
      <option value="" disabled>
        Выбрать категорию продукта
      </option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
}


export default MySelectType;
