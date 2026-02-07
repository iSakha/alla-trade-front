// CheckOutTable
import React from 'react'
import { Table, Button } from "react-bootstrap";

function CheckOutTable({ data }) {

    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }

    console.log("data: ", data);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="d-none">id</th>
                    <th>Товар</th>
                    <th>Ед. измерения</th>
                    <th>Цена</th>
                    <th>Кол-во Алла</th>
                    <th>Кол-во Инна</th>
                    <th>Сумма Алла</th>
                    <th>Сумма Инна</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id_price}>
                        <td className="d-none">{product.id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.unit}</td>
                        <td>{product.price}</td>
                        <td>{product.total_qtt_pers1}</td>
                        <td>{product.total_qtt_pers2}</td>
                        <td>{product.sale1}</td>
                        <td>{product.sale2}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default CheckOutTable