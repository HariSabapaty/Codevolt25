import React from 'react';
import { useLocation } from 'react-router-dom';
import './CommunityPage.css';

const CommunityPage = () => {
  const location = useLocation();
  const community = location.state?.community;

  if (!community) {
    return <p>No community selected.</p>;
  }

  return (
    <div className="community-page">
      <nav className="navbar">
        <h1>{community.name} Community</h1>
      </nav>

      <div className="community-details">
        <h2>Welcome to {community.name}!</h2>
        <p>{community.description}</p>
        <p><strong>Area:</strong> {community.area}</p>
      </div>
    </div>
  );
};
export default CommunityPage;