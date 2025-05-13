import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

export default function Form() {
    const [name, setName] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = e => {
        e.preventDefault();
        if (!name) {
            setError('Name is required');
        } else {
            setError('');
            setSubmitted(true);
        }
    };

    return (
        <Container>
            Name:
            <input
                value={name}
                onChange={e => {
                    setSubmitted(false);
                    setName(e.target.value);
                }
                }
            />
            <Button onClick={handleSubmit}>Submit</Button>
            {error && <Container> {error}</Container>}
            {submitted && <Container>Thank you, {name}!</Container>}
        </Container>
    );
}