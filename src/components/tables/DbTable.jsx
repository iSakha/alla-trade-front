// DbTable.jsx
import React from "react";
import { Table, Button } from "react-bootstrap";

function DbTable({ data, onEdit, onDelete }) {
  if (!data || data.length === 0) {
    return <p>Нет данных для отображения</p>;
  }
  console.log("data: ", data);

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th className="position-sticky top-0">#</th>
          {/* <th>idType</th> */}
          <th className="position-sticky top-0">Категория товара</th>
          <th className="position-sticky top-0">Название</th>
          <th className="position-sticky top-0">Название продукта</th>
          {/* <th>idSupplier</th> */}
          <th className="position-sticky top-0">Поставщик</th>
          <th className="position-sticky top-0">Ед. измерения</th>
          <th className="position-sticky top-0">Изменить</th>
          <th className="position-sticky top-0">Удалить</th>
        </tr>
      </thead>

      <tbody>
        {data.map((product) => (
          <tr key={product.id}>
            <td>{product.id}</td>
            <td className="d-none">{product.id_type}</td>
            <td>{product.type}</td>
            {/* <td className="d-none">{product.name}</td> */}
            <td>{product.name}</td>
            <td>{product.product_name}</td>
            <td className="d-none">{product.id_supplier}</td>
            <td>{product.supplier}</td>
            <td>{product.unit}</td>
            <td>
              <div className="update-button">
                <Button
                  variant="secondary"
                  onClick={() => onEdit && onEdit(product)}
                >
                  Изменить
                </Button>
              </div>
            </td>
            <td>
              <div className="delete-button">
                <Button
                  variant="danger"
                  onClick={() => onDelete && onDelete(product)}
                >
                  Удалить
                </Button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default DbTable;
