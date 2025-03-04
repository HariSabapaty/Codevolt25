import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { Container, Row, Col, Card, Navbar, Button } from 'react-bootstrap';

const CommunitySelect = () => {
  const location = useLocation();
  const userEmail = location.state?.user_email;  // Access the user email
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetching the list of communities
    axios.get('http://127.0.0.1:5000/communityselect')
      .then(response => {
        setCommunities(response.data);
      })
      .catch(error => {
        console.error('Error fetching communities:', error);
      });
  }, []);

  const handleJoinCommunity = (community) => {
    console.log("now");
    console.log(userEmail);  // Log the user email for verification


    // Sending the community_id and user_email to the backend
    axios.post('http://127.0.0.1:5000/join_community', { community_id: community.id, user_email: userEmail })
      .then((response) => {
        // Navigate to CommunityPage, passing community data and user_email
        navigate('/communitypage', {
          state: { 
            community: response.data.community,  // Pass the community details
            user_email: userEmail                // Pass the user email as well
          }
        });
      })
      .catch(error => {
        console.error('Error joining community:', error);
      });
  };

  return (
    <Container fluid className="p-0">
      <Navbar bg="dark" variant="dark" className="justify-content-center mb-4">
        <Navbar.Brand>Community Page</Navbar.Brand>
      </Navbar>

      <h2 className="text-center mb-4">Select Your Community</h2>

      <Row className="g-4 justify-content-center">
        {communities.map((community) => (
          <Col key={community.id} md={4} lg={3}>
            <Card className="shadow-sm">
              <Card.Body>
                <Card.Title>{community.name}</Card.Title>
                <Card.Text>{community.area}</Card.Text>
                <Button 
                  variant="outline-success"
                  onClick={() => handleJoinCommunity(community)}
                >
                  Join
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CommunitySelect;
