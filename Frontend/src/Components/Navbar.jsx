import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from '../assets/img/logo-logo.png';
import navIcon1 from '../assets/img/nav-icon1.svg';
import navIcon2 from '../assets/img/nav-icon2.svg'; // Ensure correct file references
import navIcon3 from '../assets/img/nav-icon3.svg';
import { Link, useLocation } from 'react-router-dom';

const CustomNavbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Access the user_email from location state
  const userEmail = location.state?.user_email;

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <Navbar expand="lg" className={scrolled ? "scrolled" : ""}>
      <Container>
        <Navbar.Brand href="#home">
          <img src={logo} alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link 
              href="#home" 
              className={activeLink === 'home' ? 'active navbar-link' : 'navbar-link'} 
              onClick={() => onUpdateActiveLink("home")}
            >
              Home
            </Nav.Link>
            <Nav.Link 
              href="#skills" 
              className={activeLink === 'skills' ? 'active navbar-link' : 'navbar-link'} 
              onClick={() => onUpdateActiveLink("skills")}
            >
              Skills
            </Nav.Link>
            <Nav.Link 
              as={Link}
              to="/login"
              className={activeLink === 'login' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink("login")}
            >
              Login
            </Nav.Link>
            <Nav.Link 
              as={Link}
              to="/communityselect"
              className={activeLink === 'community' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink("community")}
              state={{ user_email: userEmail}} // Pass the user_email in the state here
            >
            Community
            </Nav.Link>
            <Nav.Link 
              as={Link}
              to="/insights"
              className={activeLink === 'insights' ? 'active navbar-link' : 'navbar-link'}
              onClick={() => onUpdateActiveLink("insights")}
            >
            Insights
            </Nav.Link>

          </Nav>
          <span className="navbar-text" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span className="social-icon">
              <a href="#"><img src={navIcon1} alt="Icon 1" /></a>
              <a href="#"><img src={navIcon2} alt="Icon 2" /></a>
              <a href="#"><img src={navIcon3} alt="Icon 3" /></a>
            </span>
            <button className="vvd" onClick={() => console.log("Hello")}>
              <span>Let's Connect</span>
            </button>
          </span>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;
