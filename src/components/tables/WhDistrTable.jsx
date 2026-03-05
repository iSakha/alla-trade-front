// WhDistrTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhDistrTable({ data }) {

    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }
    console.log("data: ", data);

    // Функция для проверки, нужно ли подсвечивать срок реализации
    const getExpiryWarningLevel_ = (expiryDate, warningPeriod) => {
        if (!expiryDate || !warningPeriod) return null;

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const expiry = new Date(expiryDate);
        expiry.setHours(0, 0, 0, 0);

        // Просрочено
        if (today > expiry) {
            return 'expired';
        }

        // Вычисляем дату начала предупреждения
        let warningDate = new Date(expiry);

        if (warningPeriod === 'week') {
            warningDate.setDate(expiry.getDate() - 7); // За неделю до срока
        } else if (warningPeriod === 'month') {
            warningDate.setMonth(expiry.getMonth() - 1); // За месяц до срока
        }

        // В зоне предупреждения
        if (today >= warningDate && today <= expiry) {
            return 'warning';
        }

        return null;
    };
    const getExpiryWarningLevel = (expiryDate, warningPeriod) => {
    if (!expiryDate || !warningPeriod) return null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const expiry = new Date(expiryDate);
    expiry.setHours(0, 0, 0, 0);
    
    // Просрочено
    if (today > expiry) {
        return 'expired';
    }
    
    // Вычисляем дату начала предупреждения
    let warningDate = new Date(expiry);
    
    if (warningPeriod === 'week') {
        warningDate.setDate(expiry.getDate() - 7);
    } else if (warningPeriod === 'month') {
        warningDate.setMonth(expiry.getMonth() - 1);
    }
    
    // В зоне предупреждения
    if (today >= warningDate && today <= expiry) {
        return 'warning';
    }
    
    return null;
};

    // Функция для проверки уровня предупреждения по количеству (для остатка на складе)
    const getQuantityWarningLevel_ = (currentQtt, minQtt, warningPeriod) => {
        if (!minQtt || currentQtt === undefined || !warningPeriod) return null;

        // Критически мало (меньше минимального)
        if (currentQtt <= minQtt) {
            return 'critical';
        }

        // Рассчитываем пороговое значение в зависимости от периода предупреждения
        let threshold;
        if (warningPeriod === 'week') {
            threshold = minQtt * 1.2; // На 20% больше минимального за неделю
        } else if (warningPeriod === 'month') {
            threshold = minQtt * 1.5; // На 50% больше минимального за месяц
        }

        // В зоне предупреждения
        if (currentQtt <= threshold) {
            return 'warning';
        }

        return null;
    };

    const getQuantityWarningLevel = (currentQtt, minQtt, warningPeriod) => {
    // Преобразуем в числа, если пришли строки
    const current = parseFloat(currentQtt);
    const minimum = parseFloat(minQtt);
    
    // Если после преобразования получили NaN или минимум не задан — выходим
    if (isNaN(current) || isNaN(minimum) || !warningPeriod) return null;
    
    // Критически мало (меньше минимального)
    if (current <= minimum) {
        return 'critical';
    }
    
    // Рассчитываем пороговое значение
    let threshold;
    if (warningPeriod === 'week') {
        threshold = minimum * 1.2; // На 20% больше
    } else if (warningPeriod === 'month') {
        threshold = minimum * 1.5; // На 50% больше
    } else {
        return null;
    }
    
    // В зоне предупреждения
    if (current <= threshold) {
        return 'warning';
    }
    
    return null;
};

    // Функция для получения стилей ячейки в зависимости от уровня предупреждения
    const getCellStyle = (warningLevel) => {
        switch (warningLevel) {
            case 'expired':
            case 'critical':
                return { backgroundColor: '#f8d7da', fontWeight: 'bold', color: '#721c24' }; // Красный для критического
            case 'warning':
                return { backgroundColor: '#fff3cd', fontWeight: 'bold', color: '#856404' }; // Желтый для предупреждения
            default:
                return {};
        }
    };

    // Функция для получения иконки в зависимости от уровня
    const getIcon = (level) => {
        switch (level) {
            case 'expired':
                return '⚠️ Просрочено!';
            case 'critical':
                return '🔴 Критично!';
            case 'warning':
                return '🟡 Внимание!';
            default:
                return '';
        }
    };

    // Функция для форматирования даты
    const formatDate = (dateString) => {
        if (!dateString) return '-';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    // Проверка распределения (если есть остаток, но нет распределения)
    const isDistributionWarning = (whRemain, pers1Qtt, pers2Qtt) => {
        return whRemain > 0 && pers1Qtt === 0 && pers2Qtt === 0;
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Товар</th>
                    <th>Ед. измерения</th>
                    <th>Остаток на складе</th>
                    <th>Алла</th>
                    <th>Инна</th>
                    <th>Срок реализации</th>
                    <th>Минимальный запас</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => {
                    const expiryLevel = getExpiryWarningLevel(product.expiry_date, product.warning_expiry);
                    const quantityLevel = getQuantityWarningLevel(
                        product.qtt_wh_remain,
                        product.qtt_min,
                        product.warning_qtt
                    );

                    console.log({
                        product: product.name,
                        остаток: product.qtt_wh_remain,
                        минимум: product.qtt_min,
                        период: product.warning_qtt,
                        уровень: quantityLevel
                    });

                    const distributionWarning = isDistributionWarning(
                        product.qtt_wh_remain,
                        product.qtt_pers1,
                        product.qtt_pers2
                    );

                    return (
                        <tr key={product.id}>
                            <td>{product.id}</td>
                            <td>
                                {product.name}
                                {distributionWarning &&
                                    <span className="text-warning ms-2" title="Товар не распределен">
                                        🟡
                                    </span>
                                }
                            </td>
                            <td>{product.unit}</td>
                            <td style={getCellStyle(quantityLevel)}>
                                {product.qtt_wh_remain}
                                {quantityLevel &&
                                    <span className="ms-2" title={getIcon(quantityLevel)}>
                                        {quantityLevel === 'critical' ? '🔴' : '🟡'}
                                    </span>
                                }
                            </td>
                            <td style={product.qtt_pers1 === 0 && product.qtt_wh_remain > 0 ? { backgroundColor: '#e2e3e5' } : {}}>
                                {product.qtt_pers1}
                                {product.qtt_pers1 === 0 && product.qtt_wh_remain > 0 &&
                                    <span className="ms-2 text-muted">⏸️</span>
                                }
                            </td>
                            <td style={product.qtt_pers2 === 0 && product.qtt_wh_remain > 0 ? { backgroundColor: '#e2e3e5' } : {}}>
                                {product.qtt_pers2}
                                {product.qtt_pers2 === 0 && product.qtt_wh_remain > 0 &&
                                    <span className="ms-2 text-muted">⏸️</span>
                                }
                            </td>
                            <td style={getCellStyle(expiryLevel)}>
                                {formatDate(product.expiry_date)}
                                {expiryLevel &&
                                    <span className="ms-2" title={getIcon(expiryLevel)}>
                                        {expiryLevel === 'expired' ? '⚠️' : '🟡'}
                                    </span>
                                }
                            </td>
                            <td>{product.qtt_min || '-'}</td>
                            <td className="d-none">{product.warning_expiry}</td>
                            <td className="d-none">{product.warning_qtt}</td>
                        </tr>
                    );
                })}
            </tbody>
        </Table>
    )
}

export default WhDistrTable;