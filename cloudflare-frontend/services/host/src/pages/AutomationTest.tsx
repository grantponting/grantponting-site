import React, { useState } from 'react';
import Counter from '../components/TestComponents/Counter';
import SearchList from '../components/TestComponents/SearchList';
import Form from '../components/TestComponents/Form';
import ApiData from '../components/TestComponents/ApiData';
import Modal from '../components/TestComponents/Modal';
import {
    Container, Row, Button
} from 'react-bootstrap';

function AutomationTest() {
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <Container>
            <Row className="justify-content-md-center mt-5">
                <Counter />
            </Row>
            <Row className="justify-content-md-center mt-5">
                <SearchList />
            </Row>
            <Row className="justify-content-md-center mt-5">
                <Form />
            </Row>
            <Row className="justify-content-md-center mt-5">
                <ApiData />
            </Row>
            <Row className="justify-content-md-center mt-5">
                {!isModalOpen &&
                    <Button data-test-id='open_btn' className='btn-info' onClick={() => setModalOpen(true)}>
                        Open Modal
                    </Button>
                }
                <Modal open={isModalOpen} onClose={() => setModalOpen(false)}>
                    Test Modal
                    <Button data-test-id='modal_btn' className='btn-info' onClick={() => setModalOpen(false)}>
                        Close
                    </Button>
                </Modal>
            </Row>
        </Container>
    );
}

export default AutomationTest;