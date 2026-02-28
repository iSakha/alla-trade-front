// CheckOutTable2
import React, { useEffect, useState } from "react";
import { Table, Button } from "react-bootstrap";

function CheckOutTable2({ data }) {
    const [sum2, setSum2] = useState(null);


    useEffect(() => {
        setSum2(data[1].sale2);
    }, []);

    if (!data[0] || data[0].length === 0) {
        return <p>Нет данных для отображения</p>;
    }

    console.log("data: ", data[0]);

    const [data1, data2] = [
        data[0].filter(item => item.seller_id === 1),
        data[0].filter(item => item.seller_id === 2)
    ];

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="d-none">id</th>
                        <th>Товар</th>
                        <th>Ед. измерения</th>
                        <th>Цена</th>
                        <th>Получено</th>
                        <th>Остатки</th>
                        <th>Продано</th>
                        <th>Выручка</th>
                    </tr>
                </thead>
                <tbody>
                    {data2.map((product) => (
                        <tr key={product.id_price}>
                            <td className="d-none">{product.id}</td>
                            <td>{product.product_name}</td>
                            <td>{product.unit}</td>
                            <td>{product.price}</td>
                            <td>{product.qtt_received}</td>
                            <td>{product.leftovers}</td>
                            <td>{product.qtt_sold}</td>
                            <td>{product.sales_revenue}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <p></p>
            <h4>Итого Инна: {sum2} р.</h4>
        </>
    )
}

export default CheckOutTable2