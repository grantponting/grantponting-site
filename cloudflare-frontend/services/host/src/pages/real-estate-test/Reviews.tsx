import React from 'react';
import { Row, Col, Card, CardBody, Container } from 'react-bootstrap';
import Header from '../../components/real-estate-test/Header';
import Footer from '../../components/real-estate-test/Footer';

const RealEstateReviewsPage = () => {
  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Hero Carousel */}
      <Container>
          <h2 className="text-center mb-4">Customer Reviews</h2>
          <Row>
            {[
              { text: 'Absolutely amazing photos! They made our listing look incredible. Highly recommended!', author: 'Sarah M.' },
              { text: 'Professional, punctual, and talented. The drone shots were a game changer for us.', author: 'James R.' },
              { text: 'Super easy to work with, and the turnaround time was very fast. We\'ll be using them again.', author: 'Emily T.' },
              { text: 'Great quality and attention to detail. The virtual tour helped our property sell quickly.', author: 'Michael B.' }
            ].map((review, index) => (
              <Col md="6" className="mb-4" key={index}>
                <Card className="h-100 shadow-sm">
                  <CardBody>
                    <p className="mb-3">"{review.text}"</p>
                    <p className="text-end fw-bold mb-0">- {review.author}</p>
                  </CardBody>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default RealEstateReviewsPage;
