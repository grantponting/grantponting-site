import React from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Header from '../../components/real-estate-test/Header';
import Footer from '../../components/real-estate-test/Footer';

const RealEstateGalleryPage = () => {
  return (
    <>
      {/* Navbar */}
      <Header />

        <Container>
          <h2 className="mb-4 text-center">Gallery</h2>
          <Row>
            {['hero1.png','pic_1.png','pic_2.png', 'hero1.png'].map((img, idx) => (
              <Col key={idx} className="col-sm-6 col-lg-4">
                <img src={`/images/${img}`} alt="Property shot" className="img-fluid rounded" />
              </Col>
            ))}
          </Row>
        </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default RealEstateGalleryPage;
