import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';

export default function ApiData() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(res => res.json())
            .then(json => setData(json))
            .catch(console.error)
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Container>Loading...</Container>;
    if (!data) return <Container>No data</Container>;
    return (
        <Container>
            Todo Item
            {JSON.stringify(data, null, 2)}
        </Container>
    );
}