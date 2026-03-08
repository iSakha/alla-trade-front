// WhSetDistrHistTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhSetDistrHistTable({ data, onEdit, onDelete }) {

    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }
    
    console.log("data: ", data);
    console.log("Всего записей:", data.length);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="d-none">id</th>
                    <th className="d-none">id_price</th>
                    <th>Дата</th>
                    <th>Товар</th>
                    <th>Ед. измерения</th>
                    <th>Цена</th>
                    <th>Продавец</th>
                    <th>Количество</th>
                    <th className="d-none">calculated</th>
                    <th>Изменить</th>
                    <th>Удалить</th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) => (
                    <tr key={`${item.id_price}_${item.date}_${item.seller_id}_${index}`}>
                        <td className="d-none">{item.id}</td>
                        <td className="d-none">{item.id_price}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.product_name}</td>
                        <td>{item.unit}</td>
                        <td>{item.price}</td>
                        <td>
                            {item.seller_id === 1 ? 'Алла' : 'Инна'}
                        </td>
                        <td>{item.qtt}</td>
                        <td className="d-none">{item.calculated}</td>
                        <td>
                            <div className="update-button">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    onClick={() => onEdit && onEdit(item)}
                                >
                                    Изменить
                                </Button>
                            </div>
                        </td>
                        <td>
                            <div className="delete-button">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete && onDelete(item)}
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

export default WhSetDistrHistTable;