import { Card, Form, Button, Row, Col } from 'react-bootstrap';
import ErrorPopUp from './ErrorPopUp';

const DynamicForm = ({ title, inputs, buttonText, onSubmit, error, children }) => {
    return (
        <Card>
            {error && <ErrorPopUp errorMessage={error} errorTitle="Error" />}
            {children}
            <Form onSubmit={onSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label className="h2 text-center w-100 mt-3">{title}</Form.Label>
                </Form.Group>

                {inputs.map((input, index) => (
                    <Form.Group className="mb-3" controlId={input.controlId || `input-${index}`} key={index}>
                        <Form.Label>{input.label}</Form.Label>
                        <Form.Control
                            type={input.type}
                            placeholder={input.placeholder}
                            value={input.value}
                            onChange={input.onChange}
                        />
                    </Form.Group>
                ))}

                <Form.Group as={Row} className="mb-3">
                    <Col className="d-flex justify-content-center mt-3">
                        <Button type="submit" size="lg" className='btn-info'>
                            {buttonText}
                        </Button>
                    </Col>
                </Form.Group>
            </Form>
        </Card>
    );
};

export default DynamicForm;
