// LeftoversTable2.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function LeftoversTable2({ data, onEdit, onSave, savedProducts }) {

    
    if (!data || data.length === 0) {
        return <p className="text-center p-3">Нет данных для отображения</p>;
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="d-none">id</th>
                    <th>Товар</th>
                    <th>Ед. измерения</th>
                    <th>Цена</th>
                    {/* <th>Кол-во Алла</th> */}
                    <th>Кол-во Инна</th>
                    <th>Сохранить</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => {
                    const isSaved = savedProducts.has(product.id_prod);
                    
                    return (
                        <tr key={product.id_prod}>
                            <td className="d-none">{product.id_prod}</td>
                            <td>{product.product_name}</td>
                            <td>{product.unit}</td>
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    value={product.price || ""}
                                    onChange={(e) =>
                                        onEdit({ ...product, price: e.target.value })
                                    }
                                    disabled={isSaved}
                                    placeholder="0.00"
                                />
                            </td>
                            {/* <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    value={product.alla_qtt || ""}
                                    onChange={(e) =>
                                        onEdit({ ...product, alla_qtt: e.target.value })
                                    }
                                    disabled={isSaved}
                                    placeholder="0.00"
                                />
                            </td> */}
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    className="form-control"
                                    value={product.inna_qtt || ""}
                                    onChange={(e) =>
                                        onEdit({ ...product, inna_qtt: e.target.value })
                                    }
                                    disabled={isSaved}
                                    placeholder="0.00"
                                />
                            </td>
                            <td>
                                <Button
                                    variant={isSaved ? "secondary" : "primary"}
                                    onClick={() => onSave && onSave(product)}
                                    disabled={isSaved}
                                >
                                    {isSaved ? "✓ Сохранено" : "Сохранить"}
                                </Button>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    );
}

export default LeftoversTable2;