import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Navbar } from 'react-bootstrap';

const CommunityPage = () => {
  const [communities] = useState([
    { id: 1, name: 'Sunset Valley', area: 'North Zone' },
    { id: 2, name: 'Riverside', area: 'East Zone' },
    { id: 3, name: 'Greenfield', area: 'West Zone' },
    { id: 4, name: 'Hilltop Haven', area: 'South Zone' },
  ]);

  const handleJoinCommunity = (community) => {
    console.log('Joined Community:', community.name);
    // Add your join logic here
  };

  return (
    <Container fluid className="p-0 bg-dark min-vh-100">
      <Navbar bg="dark" variant="dark" className="justify-content-center mb-4">
        <Navbar.Brand className="fs-3 fw-bold">🌆 Community Page</Navbar.Brand>
      </Navbar>

      <h2 className="text-center text-light mb-5">Select Your Community</h2>

      <Row className="g-4 justify-content-center">
        {communities.map((community) => (
          <Col key={community.id} md={6} lg={4} xl={3}>
            <Card
              className="shadow-lg community-card"
            >
              <Card.Body className="text-center">
                <Card.Title className="fs-4 fw-bold">{community.name}</Card.Title>
                <Card.Text className="text-muted">{community.area}</Card.Text>
                <Button variant="primary" onClick={() => handleJoinCommunity(community)}>
                  Join
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      <style>
        {`
          .community-card {
            cursor: pointer;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            border: none;
            border-radius: 15px;
          }
          .community-card:hover {
            transform: translateY(-10px);
            box-shadow: 0 12px 20px rgba(255, 255, 255, 0.2);
          }
        `}
      </style>
    </Container>
  );
};

export default CommunityPage;