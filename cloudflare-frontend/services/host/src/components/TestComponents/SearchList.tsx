import React, { useState } from 'react';
import { Container } from 'react-bootstrap';

const items = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];

export default function SearchList() {
    const [query, setQuery] = useState('');
    const filtered = items.filter(
        i => i.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <Container>
            <input
                placeholder="Search..."
                value={query}
                onChange={e => setQuery(e.target.value)}
                data-test-id='search_input'
            />
            <ul>
                {filtered.map((item, idx) => (
                    <li data-test-id='search_item' key={idx}>{item}</li>
                ))}
            </ul>
        </Container>
    );
}