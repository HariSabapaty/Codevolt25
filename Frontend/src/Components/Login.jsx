import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";

const Login = () => {
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    message: ''
  });

  const onFormUpdate = (field, value) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formDetails.name);
    try {
      const response = await fetch('http://127.0.0.1:5000', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },

        body: JSON.stringify(formDetails),
      });
  
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        setFormDetails({ name: '', email: '', message: '' }); // Reset form
      } else {
        console.error('Failed to submit form');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
    <section className="contact" id="connect">
        <Container>
            <Row className="align-items-center">
                <Col size={12} md={6}>
                    <img src={contactImg} alt="image"></img>
                </Col>
                <Col size={12} md={6}>
                    <h2>Get In Touch</h2>
                  <form onSubmit={handleSubmit}>
                  <div className="px-1 mb-3">
                    <input
                      type="text"
                      value={formDetails.name}
                      placeholder="Name"
                      onChange={(e) => onFormUpdate('name', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="px-1 mb-3">
                    <input
                      type="email"
                      value={formDetails.email}
                      placeholder="Email Address"
                      onChange={(e) => onFormUpdate('email', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="px-1 mb-3">
                    <textarea
                      value={formDetails.message}
                      placeholder="Message"
                      onChange={(e) => onFormUpdate('message', e.target.value)}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div className="px-1">
                    <button type="submit" className="vvd">
                      <span>Submit</span>
                    </button>
                  </div>
                </form>
                </Col>
            </Row>
        </Container>
    </section>
    
    </>
  );
};
export default Login;