// CheckOutRealTable
import React from 'react'
import { Table, Button } from "react-bootstrap";

function CheckOutRealTable({ data }) {

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
                    <th>Количество Алла</th>
                    <th>Количество Инна</th>
                    <th>Сумма Алла</th>
                    <th>Сумма Инна</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id}>
                        <td className="d-none">{product.id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.unit}</td>
                        <td>{product.price}</td>
                        <td>{product.sum_qtt1}</td>
                        <td>{product.sum_qtt2}</td>
                        <td>{product.earn1}</td>
                        <td>{product.earn2}</td>
                    </tr>
                ))}
            </tbody>
        </Table>

    )
}

export default CheckOutRealTable