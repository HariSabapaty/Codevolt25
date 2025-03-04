// Components/Footer.js
import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="text-center text-md-left">
          {/* Left Section - Logo & About */}
          <Col md={4} className="mb-3">
            <h4 className="text-uppercase">EVConnect</h4>
            <p>Your trusted platform for EV insights, savings, and community engagement.</p>
          </Col>

          {/* Center Section - Quick Links */}
          <Col md={4} className="mb-3">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li><Link to="/" className="text-light text-decoration-none">Home</Link></li>
              <li><Link to="/insights" className="text-light text-decoration-none">Insights</Link></li>
              <li><Link to="/communityselect" className="text-light text-decoration-none">Community</Link></li>
              <li><Link to="/login" className="text-light text-decoration-none">Login</Link></li>
            </ul>
          </Col>

          {/* Right Section - Social Media */}
          <Col md={4} className="mb-3">
            <h5>Follow Us</h5>
            <div className="d-flex gap-3 justify-content-center justify-content-md-start">
              <a href="https://facebook.com" className="text-light" target="_blank" rel="noopener noreferrer"><FaFacebook size={24} /></a>
              <a href="https://twitter.com" className="text-light" target="_blank" rel="noopener noreferrer"><FaTwitter size={24} /></a>
              <a href="https://instagram.com" className="text-light" target="_blank" rel="noopener noreferrer"><FaInstagram size={24} /></a>
              <a href="https://linkedin.com" className="text-light" target="_blank" rel="noopener noreferrer"><FaLinkedin size={24} /></a>
            </div>
          </Col>
        </Row>

        {/* Copyright Section */}
        <Row className="mt-4">
          <Col className="text-center">
            <p className="mb-0">&copy; {new Date().getFullYear()} EVConnect. All Rights Reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
