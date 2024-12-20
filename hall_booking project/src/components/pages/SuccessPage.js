import React from 'react';
import './SuccessPage.css';

const SuccessPage = () => {
  return (
    <div className="success-page">
      <div className="success-content">
        <h1>Thank You for Booking!</h1>
        <p>Your booking has been successfully received.</p>
        <p>We will contact you through email with further details.</p>
        <a href="/" className="home-link">Back to Home</a>
      </div>
    </div>
  );
}

export default SuccessPage;
