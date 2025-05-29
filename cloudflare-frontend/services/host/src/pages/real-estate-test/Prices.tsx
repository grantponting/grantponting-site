import React from 'react';
import { Navbar, Nav, Carousel, Container } from 'react-bootstrap';
import Header from '../../components/real-estate-test/Header';
import Footer from '../../components/real-estate-test/Footer';

const RealEstatePricingPage = () => {
  return (
    <>
      {/* Navbar */}
      <Header />

      {/* Pricing Section */}
        <Container>
          <h2 className="mb-4 text-center">Pricing</h2>
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Basic</h3>
                  <h4 className="card-price">$150</h4>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>20 Edited Photos</li>
                    <li>24-Hour Delivery</li>
                    <li>Digital Download</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Standard</h3>
                  <h4 className="card-price">$250</h4>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>40 Edited Photos</li>
                    <li>Drone Shots</li>
                    <li>Custom Flyers</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card mb-4 shadow-sm">
                <div className="card-body">
                  <h3 className="card-title">Premium</h3>
                  <h4 className="card-price">$400</h4>
                  <ul className="list-unstyled mt-3 mb-4">
                    <li>80 Edited Photos</li>
                    <li>Twilight Shots</li>
                    <li>Virtual Tour</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </Container>

      {/* Footer */}
      <Footer />
    </>
  );
};

export default RealEstatePricingPage;
