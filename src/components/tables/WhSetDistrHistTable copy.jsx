// WhSetDistrHistTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhSetDistrHistTable({ data, onEdit, onDelete }) {

    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }
    console.log("data: ", data);


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="d-none">id</th>
                    <th>Дата</th>
                    <th className="d-none">wh_sum_id</th>
                    <th>Товар</th>
                    <th>Ед. измерения</th>
                    <th>Цена</th>
                    <th>Алла</th>
                    <th>Инна</th>
                    <th className="d-none">calculated</th>
                    <th>Изменить</th>
                    <th>Удалить</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => (
                    <tr key={product.id}>
                        <td className="d-none">{product.id}</td>
                        <td>{product.date}</td>
                        <td className="d-none">{product.wh_sum_id}</td>
                        <td>{product.product_name}</td>
                        <td>{product.unit}</td>
                        <td>{product.price}</td>
                        <td>{product.qtt_pers1}</td>
                        <td>{product.qtt_pers2}</td>
                        <td className="d-none">{product.calculated}</td>
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
    )
}

export default WhSetDistrHistTable