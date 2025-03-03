import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Communities.css';

const CommunitySelect = () => {
  const [communities, setCommunities] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/communities')
      .then(response => {
        setCommunities(response.data);
      })
      .catch(error => {
        console.error('Error fetching communities:', error);
      });
  }, []);

  const handleSelectCommunity = (community) => {
    navigate(`/community/${community.id}`, { state: { community } });
  };

  return (
    <div className="communities-page">
      <nav className="navbar">
        <h1>Community Page</h1>
      </nav>

      <h2>Select Your Community</h2>

      <div className="community-grid">
        {communities.map((community) => (
          <div 
            key={community.id} 
            className="community-card"
            onClick={() => handleSelectCommunity(community)}
          >
            <h3>{community.name}</h3>
            <p>{community.area}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunitySelect;
