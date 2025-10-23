import React, { useState } from "react";
import Datepicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function MyDatePicker({ value, onChange }) {
  const [selectedDate, setDate] = useState(null);
  const dateFormat = "yyyy-MM-dd";

  return (
    <>
      <div>Дата</div>
      <Datepicker
        dateFormat={dateFormat}
        selected={value}
        onChange={(date) => onChange(date)}
        placeholderText="Выберите дату"
      />
    </>
  );
}

export default MyDatePicker;
