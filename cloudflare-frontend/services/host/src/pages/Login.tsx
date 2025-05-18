import React from 'react';
import LoginForm from '../components/LoginForm';
import CreateUserForm from '../components/CreateUserForm';
import {
    Container, Row
} from 'react-bootstrap';
import { useState } from 'react';

function Login() {
    const [accountCreated, setAccountCreated] = useState(true);

    const handleClick = async () => {
        setAccountCreated(false);
    }

    return (
        <Container>
            {!accountCreated &&
                <Row className="justify-content-md-center mt-5">
                    <CreateUserForm />
                </Row>
            }
            {accountCreated &&
                <Row className="justify-content-md-center mt-5">
                    <LoginForm />
                    <a onClick={handleClick} className="link-info">
                        New User? Create Account Here
                    </a>
                </Row>
            }
        </Container>
    );
}

export default Login;