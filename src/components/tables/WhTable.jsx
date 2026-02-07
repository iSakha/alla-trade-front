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
                    <th className="d-none">id</th>
                    <th>Товар</th>
                    <th>Количество</th>
                    <th>Ед. измерения</th>
                    <th className="d-none">Сумма</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id}>
                        <td className="d-none">{product.id}</td>
                        <td>{product.name}</td>
                        <td>{product.qtt_sum}</td>
                        <td>{product.unit}</td>
                        <td className="d-none">{product.money_sum}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

export default WhTable