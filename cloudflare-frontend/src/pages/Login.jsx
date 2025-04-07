import LoginForm from '../components/LoginForm';
import CreateUserForm from '../components/CreateUserForm';
import NavigateToProfile from '../components/NavigateToProfile';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Login() {
    return (
        <Container data-bs-theme="dark">
            <Row className="justify-content-md-center">
                <h1>My Auth App</h1>
            </Row>
            <Row className="justify-content-md-center">
                <CreateUserForm />
            </Row>
            <Row className="justify-content-md-center">
                <LoginForm />
            </Row>
            <Row className="justify-content-md-center">
                <NavigateToProfile />
            </Row>
        </Container>
    );
}

export default Login;