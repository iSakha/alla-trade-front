// WhSetDistrHistTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhSetDistrHistTable({ data, onEdit, onDelete }) {

    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }
    console.log("data: ", data);

    // Группируем данные по id_price и дате
    const groupedData = data.reduce((acc, item) => {
        const key = `${item.id_price}_${item.date}`;
        if (!acc[key]) {
            acc[key] = {
                id_price: item.id_price,
                date: item.date,
                product_name: item.product_name,
                unit: item.unit,
                price: item.price,
                calculated: item.calculated,
                seller1_qtt: null,
                seller2_qtt: null
            };
        }
        // Распределяем количество по продавцам
        if (item.seller_id === 1) {
            acc[key].seller1_qtt = item.qtt;
        } else if (item.seller_id === 2) {
            acc[key].seller2_qtt = item.qtt;
        }
        return acc;
    }, {});

    // Преобразуем объект в массив для отображения
    const displayData = Object.values(groupedData);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="d-none">id_price</th>
                    <th>Дата</th>
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
                {displayData.map((item, index) => (
                    <tr key={`${item.id_price}_${item.date}_${index}`}>
                        <td className="d-none">{item.id_price}</td>
                        <td>{new Date(item.date).toLocaleDateString()}</td>
                        <td>{item.product_name}</td>
                        <td>{item.unit}</td>
                        <td>{item.price}</td>
                        <td>{item.seller1_qtt !== null ? item.seller1_qtt : '-'}</td>
                        <td>{item.seller2_qtt !== null ? item.seller2_qtt : '-'}</td>
                        <td className="d-none">{item.calculated}</td>
                        <td>
                            <div className="update-button">
                                <Button
                                    variant="secondary"
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

export default WhSetDistrHistTable