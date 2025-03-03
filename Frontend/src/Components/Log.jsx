import React, { useState } from 'react';
import { Container, Row, Col } from "react-bootstrap";
import contactImg from "../assets/img/contact-img.svg";
import { useNavigate } from 'react-router-dom';

const Log = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState(null);

  const onFormUpdate = (field, value) => {
    setFormDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    const url = isSignup 
      ? 'http://127.0.0.1:5000/signup' 
      : 'http://127.0.0.1:5000/login';

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formDetails),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(`${isSignup ? 'Signup' : 'Login'} successful:`, result);
        setFormDetails({ name: '', email: '', password: '' }); 
        navigate('/');
      } else {
        const errorData = await response.json();
        setError(errorData.message || `${isSignup ? 'Signup' : 'Login'} failed`);
      }
    } catch (err) {
      setError('Server error. Please try again later.');
    }
  };

  return (
    <section className="contact" id="connect">
      <Container>
        <Row className="align-items-center">
          <Col size={12} md={6}>
            <img src={contactImg} alt="Contact" />
          </Col>
          <Col size={12} md={6}>
            <h2>{isSignup ? 'Create an Account' : 'Login to Your Account'}</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="px-1 mb-3">
                <input
                  type="text"
                  value={formDetails.name}
                  placeholder="Name"
                  onChange={(e) => onFormUpdate('name', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="px-1 mb-3">
                <input
                  type="email"
                  value={formDetails.email}
                  placeholder="Email Address"
                  onChange={(e) => onFormUpdate('email', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="px-1 mb-3">
                <input
                  type="password"
                  value={formDetails.password}
                  placeholder="Password"
                  onChange={(e) => onFormUpdate('password', e.target.value)}
                  className="w-full p-2 border rounded-md"
                  required
                />
              </div>
              <div className="px-1">
                <button type="submit" className="vvd">
                  <span>{isSignup ? 'Sign Up' : 'Login'}</span>
                </button>
              </div>
            </form>
            <p 
              style={{ cursor: 'pointer', color: 'blue', marginTop: '10px' }}
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign up"}
            </p>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Log;