// MySelectProduct.jsx
import React from 'react';
import Select from 'react-select';

function MySelectProduct({ value, onSelect, options = [], placeholder = "Выберите товар...", required = false }) {
  // Преобразуем данные в формат react-select
  const selectOptions = Array.isArray(options) 
    ? options.map(option => ({
        value: option.id,
        label: option.product_name,
        unit: option.unit
      }))
    : [];

  // Находим выбранный элемент
  const selectedOption = selectOptions.find(option => 
    option.label === value || option.value === value
  ) || null;

  const handleChange = (selected) => {
    onSelect(selected);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      minHeight: '38px',
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999, // Чтобы список был поверх других элементов
    }),
  };

  return (
    <Select
      options={selectOptions}
      value={selectedOption}
      onChange={handleChange}
      placeholder={placeholder}
      isClearable
      isSearchable
      styles={customStyles}
      required={required}
      noOptionsMessage={() => "Товары не найдены"}
      // Важно! Отключаем внутреннюю фильтрацию, так как мы передаем уже отфильтрованные options
      filterOption={null}
    />
  );
}

export default MySelectProduct;