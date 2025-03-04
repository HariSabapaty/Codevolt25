import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

const CommunityPage = () => {
  const location = useLocation();
  const community = location.state?.community;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isVerified, setIsVerified] = useState(false); // Tracks if the user is verified

  if (!community) {
    return <p>No community selected.</p>;
  }

  // Handles question input
  const handleMessageChange = (e) => {
    setNewMessage(e.target.value);
  };

  // Submits a question (open to all users)
  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (newMessage.trim() === '') return;

    const question = {
      id: messages.length + 1,
      text: newMessage,
      user: 'User',
      timestamp: new Date().toLocaleTimeString(),
      type: 'question',
      answers: [],
    };

    setMessages([...messages, question]);
    setNewMessage('');
  };

  // Submits an answer (restricted to verified users)
  const handleAnswerSubmit = (e, questionId) => {
    e.preventDefault();
  
    const answerText = e.target.answer.value.trim();
    if (answerText === '') return;
  
    if (!isVerified) {
      const verifiedUser = window.confirm('Are you an EV user?');
      if (verifiedUser) {
        setIsVerified(true); // Mark user as verified
      } else {
        alert('Only verified users can answer questions.');
        return; // Exit if user declines
      }
    }
  
    // Proceed to submit the answer if verified
    const newAnswer = {
      id: `answer-${Date.now()}`,
      text: answerText,
      user: 'Verified User',
      timestamp: new Date().toLocaleTimeString(),
    };
  
    setMessages((prevMessages) =>
      prevMessages.map((msg) =>
        msg.id === questionId
          ? { ...msg, answers: [...msg.answers, newAnswer] }
          : msg
      )
    );
  
    e.target.answer.value = ''; // Clear input field
  };
  

  return (
    <div style={{ fontFamily: 'Arial', padding: '20px', maxWidth: '800px', margin: 'auto' }}>
      <h1>{community.name} Community</h1>
      <p>{community.description}</p>

      {/* Question submission form (available for all users) */}
      <form onSubmit={handleMessageSubmit} style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={newMessage}
          onChange={handleMessageChange}
          placeholder="Ask a question..."
          style={{ padding: '10px', width: '80%' }}
        />
        <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>Ask</button>
      </form>

      {/* Display questions and answers */}
      {messages.map((message) => (
        <div key={message.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
          <p><strong>Question:</strong> {message.text}</p>
          <small>{message.user} - {message.timestamp}</small>

          <div style={{ marginTop: '10px', paddingLeft: '20px' }}>
            <h4>Answers:</h4>
            {message.answers.length === 0 ? (
              <p>No answers yet. Be the first to answer!</p>
            ) : (
              message.answers.map((answer) => (
                <div key={answer.id} style={{ background: '#f4f4f4', padding: '10px', marginBottom: '10px' }}>
                  <p>{answer.text}</p>
                  <small>{answer.user} - {answer.timestamp}</small>
                </div>
              ))
            )}

            {/* Answer submission form (only for verified users) */}
            <form onSubmit={(e) => handleAnswerSubmit(e, message.id)}>
              <input type="text" name="answer" placeholder="Write your answer..." style={{ padding: '10px', width: '70%' }} />
              <button type="submit" style={{ padding: '10px', marginLeft: '10px' }}>Answer</button>
            </form>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommunityPage;



