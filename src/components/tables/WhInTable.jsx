import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhInTable({ data, onEdit, onDelete }) {
    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }
    console.log("data: ", data);


    return (
       <Table striped bordered hover>
        <thead>
            <tr>
                <th>#</th>
                <th>Дата</th>
                <th>Товар</th>
                <th>Количество</th>
                <th>Ед. измерения</th>
                <th>Цена за ед.</th>
                <th>Примечания</th>
                <th className="d-none">Статус</th>
            </tr>
        </thead>
        <tbody>
                    {data.map((product) => (
                      <tr key={product.id}>
                        <td>{product.id}</td>
                        <td>{product.date.split('T')[0]}</td>
                        <td>{product.name}</td>
                        <td>{product.qtt}</td>
                        <td>{product.unit}</td>
                        <td>{product.price}</td>
                        <td>{product.notes}</td>
                        <td className="d-none">{product.state}</td>
                      </tr>
                    ))}
        </tbody>
       </Table>
    )
}

export default WhInTable