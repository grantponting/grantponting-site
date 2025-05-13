import React from 'react';
import { Container } from 'react-bootstrap';

export default function Modal({ open, onClose, children }) {
    if (!open) return null;
    return (
        <Container>
            {children}
        </Container>
    );
}