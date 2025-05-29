import React from 'react';
import { Navbar, Nav, Carousel, Container } from 'react-bootstrap';
import Header from '../../components/real-estate-test/Header';
import Footer from '../../components/real-estate-test/Footer';

const RealEstateLandingPage = () => {
  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Hero Carousel */}
      <Carousel>
          <Carousel.Item>
            <img src="/images/hero1.png" className="d-block w-100" alt="House exterior" />
            <Carousel.Caption>
              <h1>Showcasing Homes in Their Best Light</h1>
              <p>Professional real estate photography services</p>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/pic_1.png" className="d-block w-100" alt="Spacious living room" />
          </Carousel.Item>
          <Carousel.Item>
            <img src="/images/pic_2.png" className="d-block w-100" alt="Modern kitchen" />
          </Carousel.Item>
      </Carousel>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default RealEstateLandingPage;
