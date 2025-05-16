// src/pages/NotFound.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
  const navigate = useNavigate(); // Hook to navigate programmatically

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/'); // Redirect to the home page after 2 seconds
    }, 5000); // Wait for 2 seconds before redirect

    // Clean up the timeout if the component unmounts before 2 seconds
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="notfound-container">
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <img 
        src="/images/error.png" 
        alt="Page Not Found" 
        className="notfound-image" 
      />
      <p>Redirecting to Home...</p> {/* Message indicating redirection */}
    </div>
  );
};

export default NotFound;
