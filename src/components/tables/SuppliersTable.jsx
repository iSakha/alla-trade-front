import React from 'react';
import { Table, Button } from "react-bootstrap";

function SuppliersTable({ data, onDelete }) {
    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }

    console.log("data: ", data);

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th className="position-sticky top-0">#</th>
                    <th className="position-sticky top-0">Наименование</th>
                    <th className="position-sticky top-0">Удалить</th>
                </tr>
            </thead>
            <tbody>
                {data.map((supplier) => (
                    <tr key={supplier.id}>
                        <td>{supplier.id}</td>
                        <td>{supplier.name}</td>
                        <td>
                            <div className="delete-button">
                                <Button
                                    variant="danger"
                                    size="sm"
                                    onClick={() => onDelete && onDelete(supplier)}
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

export default SuppliersTable;