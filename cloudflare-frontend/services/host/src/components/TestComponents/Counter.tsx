import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <Container>
            Count: {count}
            <Button onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            < Button onClick={() => setCount(count - 1)}>
                Decrement
            </Button>
        </Container>
    );
}