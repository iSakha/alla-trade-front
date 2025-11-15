// WhSetDistrTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhSetDistrTable({ data, onEdit, onSave, savedProducts }) {

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
                    <th>Остаток на складе</th>
                    <th>Алла</th>
                    <th>Инна</th>
                    <th>Сохранить</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => {
                    const totalDistributed =
                        (Number(product.alla) || 0) + (Number(product.inna) || 0);
                    const isInvalid = totalDistributed > product.qtt_wh_remain;
                    const isSaved = savedProducts.has(product.id);

                    return (
                        <tr key={product.id} className={isInvalid ? "table-danger" : ""}>
                            <td className="d-none">{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.unit}</td>
                            <td>{product.price}</td>
                            <td>{product.qtt_wh_remain}</td>

                            {/* Алла */}
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={product.alla ?? ""}
                                    onChange={(e) =>
                                        onEdit({ ...product, alla: e.target.value })
                                    }
                                    disabled={isSaved} // Блокируем навсегда после сохранения
                                />
                            </td>

                            {/* Инна */}
                            <td>
                                <input
                                    type="number"
                                    className="form-control"
                                    value={product.inna ?? ""}
                                    onChange={(e) =>
                                        onEdit({ ...product, inna: e.target.value })
                                    }
                                    disabled={isSaved} // Блокируем навсегда после сохранения
                                />
                            </td>

                            <td>
                                <Button
                                    variant={isSaved ? "secondary" : "success"}
                                    disabled={isInvalid || isSaved}
                                    onClick={() => onSave(product)}
                                >
                                    {isSaved ? "Сохранено" : "Сохранить"}
                                </Button>
                                {isInvalid && (
                                    <small className="text-danger d-block">
                                        Сумма больше остатка!
                                    </small>
                                )}
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}

export default WhSetDistrTable