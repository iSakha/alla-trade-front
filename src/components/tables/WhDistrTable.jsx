// WhDistrTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhDistrTable({ data }) {

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
                        <th className="d-none">Цена</th>
                        <th>Остаток на складе</th>
                        <th>Алла</th>
                        <th>Инна</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((product) => (
                        <tr key={product.id}>
                            <td className="d-none">{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.unit}</td>
                            <td className="d-none">{product.price}</td>
                            <td>{product.qtt_wh_remain}</td>
                            <td>{product.qtt_pers1}</td>
                            <td>{product.qtt_pers2}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
  )
}

export default WhDistrTable