// WhSetDistrTable.jsx
import React from 'react'
import { Table, Button, OverlayTrigger, Tooltip } from "react-bootstrap";

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
                    
                    // Определяем, есть ли последняя цена
                    const hasLastPrice = product.last_price !== null && product.last_price !== undefined;
                    const lastPrice = hasLastPrice ? parseFloat(product.last_price).toFixed(2) : null;

                    return (
                        <tr key={product.id} className={isInvalid ? "table-danger" : ""}>
                            <td className="d-none">{product.id}</td>
                            <td>{product.name}</td>
                            <td>{product.unit}</td>

                            {/* price */}
                            <td>
                                {hasLastPrice ? (
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip id={`tooltip-${product.id}`}>
                                                Последняя использованная цена: {lastPrice} ₽
                                            </Tooltip>
                                        }
                                    >
                                        <div className="d-flex align-items-center">
                                            <input
                                                type="number"
                                                step="0.01"
                                                min="0"
                                                className="form-control"
                                                value={product.price ?? lastPrice ?? ""}
                                                onChange={(e) =>
                                                    onEdit({ ...product, price: e.target.value })
                                                }
                                                disabled={isSaved}
                                                style={{
                                                    borderColor: hasLastPrice && !product.price ? '#28a745' : undefined,
                                                    backgroundColor: hasLastPrice && !product.price ? '#f0fff0' : undefined
                                                }}
                                            />
                                            {!product.price && hasLastPrice && (
                                                <span className="text-success ms-2" style={{ fontSize: '1.2rem' }}>↻</span>
                                            )}
                                        </div>
                                    </OverlayTrigger>
                                ) : (
                                    <input
                                        type="number"
                                        step="0.01"
                                        min="0"
                                        className="form-control"
                                        value={product.price ?? ""}
                                        onChange={(e) =>
                                            onEdit({ ...product, price: e.target.value })
                                        }
                                        disabled={isSaved}
                                        placeholder="Введите цену"
                                    />
                                )}
                                {hasLastPrice && !product.price && (
                                    <small className="text-success d-block">
                                        Будет использована цена {lastPrice} ₽
                                    </small>
                                )}
                            </td>

                            <td>{product.qtt_wh_remain}</td>

                            {/* Алла */}
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    inputMode="decimal"
                                    className="form-control"
                                    value={product.alla ?? ""}
                                    onChange={(e) =>
                                        onEdit({ ...product, alla: e.target.value })
                                    }
                                    disabled={isSaved}
                                    placeholder="0"
                                />
                            </td>

                            {/* Инна */}
                            <td>
                                <input
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    inputMode="decimal"
                                    className="form-control"
                                    value={product.inna ?? ""}
                                    onChange={(e) =>
                                        onEdit({ ...product, inna: e.target.value })
                                    }
                                    disabled={isSaved}
                                    placeholder="0"
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

export default WhSetDistrTable;