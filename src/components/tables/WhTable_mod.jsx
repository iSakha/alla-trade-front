// WhTable.jsx
import React from 'react'
import { Table, Button } from "react-bootstrap";

function WhTable({ data }) {

    if (!data || data.length === 0) {
        return <p>Нет данных для отображения</p>;
    }
    console.log("data: ", data);

    // Функция для проверки уровня предупреждения по сроку реализации
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

    // Функция для проверки уровня предупреждения по количеству
    const getQuantityWarningLevel = (currentQtt, minQtt, warningPeriod) => {
        // Преобразуем строки в числа
        const current = parseFloat(currentQtt);
        const minimum = parseFloat(minQtt);
        
        // Если после преобразования получили NaN или минимум не задан - выходим
        if (isNaN(current) || isNaN(minimum) || !warningPeriod) return null;
        
        // Критически мало (меньше минимального)
        if (current <= minimum) {
            return 'critical';
        }
        
        // Рассчитываем пороговое значение в зависимости от периода предупреждения
        let threshold;
        if (warningPeriod === 'week') {
            threshold = minimum * 1.2; // На 20% больше минимального за неделю
        } else if (warningPeriod === 'month') {
            threshold = minimum * 1.5; // На 50% больше минимального за месяц
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
        switch(warningLevel) {
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
        switch(level) {
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

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Товар</th>
                    <th>Количество</th>
                    <th>Ед. измерения</th>
                    <th>Срок реализации</th>
                    <th>Минимальный запас</th>
                </tr>
            </thead>
            <tbody>
                {data.map((product) => {
                    // Преобразуем строковые значения в числа для сравнения
                    const currentQtt = parseFloat(product.qtt_sum);
                    const minQtt = parseFloat(product.qtt_min);
                    
                    const expiryLevel = getExpiryWarningLevel(product.expiry_date, product.warning_expiry);
                    const quantityLevel = getQuantityWarningLevel(
                        product.qtt_sum, 
                        product.qtt_min, 
                        product.warning_qtt
                    );
                    
                    // Добавляем отладку в консоль
                    console.log({
                        product: product.name,
                        остаток: product.qtt_sum,
                        остаток_число: currentQtt,
                        минимум: product.qtt_min,
                        минимум_число: minQtt,
                        период: product.warning_qtt,
                        уровень_количества: quantityLevel,
                        срок: product.expiry_date,
                        уровень_срока: expiryLevel
                    });
                    
                    return (
                        <tr key={product.id_prod}>
                            <td>{product.id_prod}</td>
                            <td>{product.name}</td>
                            <td style={getCellStyle(quantityLevel)}>
                                {product.qtt_sum}
                                {quantityLevel && 
                                    <span className="ms-2" title={getIcon(quantityLevel)}>
                                        {quantityLevel === 'critical' ? '🔴' : '🟡'}
                                    </span>
                                }
                            </td>
                            <td>{product.unit}</td>
                            <td style={getCellStyle(expiryLevel)}>
                                {formatDate(product.expiry_date)}
                                {expiryLevel && 
                                    <span className="ms-2" title={getIcon(expiryLevel)}>
                                        {expiryLevel === 'expired' ? '⚠️' : '🟡'}
                                    </span>
                                }
                                {expiryLevel === 'expired' && 
                                    <span className="text-danger ms-2">(просрочено)</span>
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

export default WhTable;