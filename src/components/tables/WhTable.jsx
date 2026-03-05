// WhTable
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhTable({ data }) {


    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }
    console.log("data: ", data);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Товар</th>
                    <th>Количество</th>
                    <th>Ед. измерения</th>
                    <th>Срок реализации</th>
                    <th>Минимальный запас</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id_prod}>
                        <td>{product.id_prod}</td>
                        <td>{product.name}</td>
                        <td>{product.qtt_sum}</td>
                        <td>{product.unit}</td>
                        <td>{product.expiry_date}</td>
                        <td>{product.qtt_min}</td>
                        <td className="d-none">{product.warning_expiry}</td>
                        <td className="d-none">{product.warning_qtt}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default WhTable