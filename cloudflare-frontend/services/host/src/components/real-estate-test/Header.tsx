import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const Header = () => {
    return (
        <>
        <Navbar bg="light" fixed="top" className='pb-1'>
        <Container>
          <Navbar.Brand href="/real-estate-test">
            <img src="/images/clp_logo.png" width="40" height="40"></img>
            Canyon Light Photography
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
                <Nav.Link href="/real-estate-test">Home</Nav.Link>
              <Nav.Link href="/real-estate-test/gallery">Gallery</Nav.Link>
              <Nav.Link href="/real-estate-test/reviews">Reviews</Nav.Link>
              <Nav.Link href="/real-estate-test/prices">Prices</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      </>
    );
};

export default Header;
