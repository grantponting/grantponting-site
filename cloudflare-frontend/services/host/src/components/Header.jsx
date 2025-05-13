import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../contexts/authContext';

const Header = () => {
    const { user, isLoggedIn } = useAuth();

    return (
        <Navbar expand="lg" className="bg-body-tertiary" fixed="top">
            <Container>
                <Navbar.Brand href="/">
                    <img
                        src="/assets/GP_1.png"
                        alt=""
                        width="35"
                        height="35"
                        className='me-3'
                    />
                    Grant Ponting
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ms-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        {!isLoggedIn &&
                            <Nav.Link href="/Login">Login</Nav.Link>
                        }
                        {isLoggedIn &&
                            <Nav.Link href={`/profile/${user?.id || "invalid_user"}`}>User Profile</Nav.Link>
                        }
                        <Nav.Link href="/automation-test">Automation Test</Nav.Link>
                        <NavDropdown title="Projects" id="basic-nav-dropdown">
                            <NavDropdown.Item href="/test-service">Microservices Test</NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
