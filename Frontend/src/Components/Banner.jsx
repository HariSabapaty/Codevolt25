import React from 'react'; 
import { Container, Row, Col } from "react-bootstrap";
import { ArrowRightCircle } from "react-bootstrap-icons";
import Model from './Model'; // Ensure the path is correct!

const Banner = () => {
  return (
    <section className="banner" id="home">
      <Container>
        <Row className="align-items-center">
          <Col xs={12} md={6} xl={7}>
            <span className="tagline">Welcome to EVConnect</span>
            <p>Welcome to EVConnect, your all-in-one platform for navigating the world of electric vehicles! Whether you're considering making the switch to an EV or you're a seasoned EV driver, EVConnect provides the resources and community you need to make the most of your electric journey.</p>
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
