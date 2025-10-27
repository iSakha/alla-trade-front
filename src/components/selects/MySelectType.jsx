import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import axios from "axios";

// function MySelectType({ onSelect, value = "" }) {
//   const [options, setOptions] = useState([]);

//   useEffect(() => {
//     axios
//       .get("https://sakha.lat/alla/products/types")
//       .then((res) => {
//         const data = res.data;
//         const formattedOptions = data.map((item) => ({
//           value: item.id,
//           label: item.type,
//         }));
//         setOptions(formattedOptions);
//       })
//       .catch((err) => console.error("Error fetching types:", err));
//   }, []);

//   const handleChange = (e) => {
//     const selectedValue = e.target.value;
//     onSelect(selectedValue);
//   };

//   return (
//     <div>
//       <Form.Select onChange={handleChange} defaultValue="">
//         <option value="" disabled>
//           Select type
//         </option>
//         {options.map((option) => (
//           <option key={option.value} value={option.value}>
//             {option.label}
//           </option>
//         ))}
//       </Form.Select>
//     </div>
//   );
// }

function MySelectType({ onSelect, value = "" }) {
  const [options, setOptions] = useState([]);

  useEffect(() => {
    axios
      .get("https://sakha.lat/alla/types/")
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
