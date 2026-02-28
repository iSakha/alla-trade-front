import React, { useEffect, useState } from "react";
import { Container, Button } from "react-bootstrap";
import axios from "axios";
import WhRecalcTable from "../../components/tables/WhRecalcTable";
import { useNavigate } from 'react-router-dom';

const URL = import.meta.env.VITE_API_URL;

function WhRecalculation() {

    const [result, setResult] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const fetchResult = () => {
        axios
            .get(URL + "/wh/preview")
            .then((res) => {
                setResult(res.data);
                setLoading(false);
                console.log('res.data: ', res.data[0]);
            })
            .catch((err) => {
                console.log(err);
                setError("Error data loading");
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchResult();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    const recalc = async () => {
        axios
            .get(URL + "/wh/recalc")
            .then((res) => {
                console.log('res.data: ', res.data);
                alert('Пересчет склада выполнен успешно!');
                navigate('/wh-in-arj');
            })
            .catch((err) => {
                console.log(err);
                setError("Error data loading");
                setLoading(false);
            });
    }


    return (
        <div>
            <h3>Пересчет склада</h3>

            <Container>
                <h4>Предварительный просмотр</h4>
                <WhRecalcTable
                    data={result[0]}
                />
                <Button
                    variant="primary"
                    type="submit"
                    onClick={recalc}
                    disabled={loading}
                >
                    Пересчитать
                </Button>
            </Container>
        </div>
    )
}

export default WhRecalculation