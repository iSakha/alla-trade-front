// MyDatePicker.jsx
import React from "react";
import Form from "react-bootstrap/Form";

function MyDatePicker({ value, onChange }) {
    
    const handleChange = (e) => {
        const selectedDate = new Date(e.target.value);
        if (onChange) {
            onChange(selectedDate);
        }
    };

    // Форматируем дату для input[type="date"]
    const formatDateForInput = (date) => {
        if (!date) return "";
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <Form.Control
            type="date"
            value={formatDateForInput(value)}
            onChange={handleChange}
            style={{ width: "auto", display: "inline-block" }}
        />
    );
}

export default MyDatePicker;