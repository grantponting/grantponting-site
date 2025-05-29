import React from 'react';
import { Navbar, Nav, Container, Row, Col, Card, Button, Image } from 'react-bootstrap';

function BookTest() {
  const books = [
    {
      title: 'Book Title 1',
      description: 'Brief description of Book 1.',
      image: '/assets/images/book1.jpg',
      link: '#',
    },
    {
      title: 'Book Title 2',
      description: 'Brief description of Book 2.',
      image: '/assets/images/book2.jpg',
      link: '#',
    },
    // Add more books as needed
  ];

  return (
    <>
      {/* Navigation Bar */}
      <Navbar bg="light" expand="lg" fixed="top">
        <Container>
          <Navbar.Brand href="#home">Author Name</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbar-nav" />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="#books">Books</Nav.Link>
              <Nav.Link href="#about">About</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Hero Section */}
      <section id="home" className="hero-section d-flex align-items-center">
        <Container className="text-center text-white">
          <h1>Welcome to Author Name's World</h1>
          <p>Explore captivating stories and unforgettable characters.</p>
        </Container>
      </section>

      {/* Books Section */}
      <section id="books" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Books</h2>
          <Row>
            {books.map((book, idx) => (
              <Col md={4} key={idx} className="mb-4">
                <Card>
                  <Card.Img variant="top" src={book.image} />
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <Card.Text>{book.description}</Card.Text>
                    <Button variant="primary" href={book.link} target="_blank" rel="noopener noreferrer">
                      Buy Now
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* About Section */}
      <section id="about" className="py-5 bg-light">
        <Container>
          <h2 className="text-center mb-4">About Me</h2>
          <Row className="align-items-center">
            <Col md={4}>
              <Image src="/assets/images/author.jpg" rounded fluid />
            </Col>
            <Col md={8}>
              <p>
                [Author Name] is a passionate writer known for weaving intricate tales that captivate readers. With a background in [relevant background], [he/she/they] brings characters to life in vivid detail.
              </p>
              <p>
                When not writing, [Author Name] enjoys [hobbies or interests], drawing inspiration from everyday experiences to craft compelling narratives.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-5">
        <Container>
          <h2 className="text-center mb-4">Contact</h2>
          <Row className="justify-content-center">
            <Col md={6}>
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" className="form-control" id="name" placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email address</label>
                  <input type="email" className="form-control" id="email" placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea className="form-control" id="message" placeholder="Your Message"></textarea>
                </div>
                <Button variant="primary" type="submit">
                  Send
                </Button>
              </form>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-light py-4">
        <Container>
          <Row>
            <Col className="text-center">
              <p>&copy; {new Date().getFullYear()} Author Name. All rights reserved.</p>
              <p>
                <a href="#contact">Contact</a> | <a href="#privacy">Privacy Policy</a>
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
}

export default BookTest;
