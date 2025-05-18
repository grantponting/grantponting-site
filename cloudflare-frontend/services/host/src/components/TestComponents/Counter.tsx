import React, { useState } from 'react';
import { Container, Button } from 'react-bootstrap';

export default function Counter() {
    const [count, setCount] = useState(0);

    return (
        <Container>
            <text data-test-id='count_text'>
                Count: {count}
            </text>
            <Button data-test-id='increment_btn' className='btn-info' onClick={() => setCount(count + 1)}>
                Increment
            </Button>
            < Button data-test-id='decrement_btn' className='btn-info' onClick={() => setCount(count - 1)}>
                Decrement
            </Button>
        </Container>
    );
}