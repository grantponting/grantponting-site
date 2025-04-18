import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useAuth } from '../contexts/authContext';

const Header = () => {
    const { user, isLoggedIn } = useAuth();

    return (
        <Navbar expand="lg" className="bg-body-tertiary" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">Grant Ponting</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/Login">Login Page</Nav.Link>
                        {isLoggedIn &&
                            <Nav.Link href={`/profile/${user?.id || "invalid_user"}`}>User Profile</Nav.Link>
                        }
                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">
                                Separated link
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        // <nav className="navbar">
        //     <Link to="/" className="navbar-link">
        //         Home
        //     </Link>
        //     <Link to="/Login" className="navbar-link">
        //         Login
        //     </Link>
        //     {/* 
        //     NEED TO IMPLEMENT ACCESS TOKEN
        //     <Link to="/" className="navbar-link">
        //         User Profile
        //     </Link> */}
        // </nav>
    );
};

export default Header;
