import React from 'react'; 
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import Model from './Model'; // Ensure the path is correct!
import { useLocation } from 'react-router-dom';

const Banner = () => {
  const location = useLocation();
  
  // Get the user_email from the state passed during navigation
  const userEmail = location.state?.user_email;

  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome to Raptee</span>
            {console.log(userEmail)}
            <p>Driving the future — where innovation meets sustainability. Powered by electric, driven by purpose...</p>
            <button onClick={() => console.log('connect')}>
              Let’s connect <ArrowRightCircle size={25} />
            </button>
          </Col>
          <Col xs={12} md={6} xl={5}>
            <Model />
          </Col>
        </Row>
      </Container>
    </section>
  )
}

export default Banner;
