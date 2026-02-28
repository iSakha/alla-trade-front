// WhRecalcTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhRecalcTable({ data }) {

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
                    <th>Склад до перерасчета</th>
                    <th>Продано</th>
                    <th>Остатки</th>
                    <th>Склад после перерасчета</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                            <tr key={product.id_prod}>
                                <td className="d-none">{product.id_prod}</td>
                                <td>{product.product_name}</td>
                                <td>{product.unit}</td>
                                <td>{product.qtt_before}</td>
                                <td>{product.qtt_sold}</td>
                                <td>{product.leftovers}</td>
                                <td>{product.qtt_after}</td>
                            </tr>
                        ))}
            </tbody>
        </Table>
    )
}

export default WhRecalcTable