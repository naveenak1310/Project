import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; 
import './PaymentPage.css';

const PaymentPage = () => {
  const [activePayment, setActivePayment] = useState('card');
  const navigate = useNavigate();
  const location = useLocation();
  const { hallId, contactEmail, hallName, hallPrice } = location.state || {};

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const paymentData = {
      bookingId: hallId, 
      paymentMethod: activePayment,
      price: parseFloat(hallPrice.replace(/[^0-9.]/g, '')), // Convert price to number
      contactEmail: contactEmail
    };
  
    try {
      console.log('Sending payment data:', paymentData);
      await axios.post('http://localhost:8080/api/payments/add', paymentData);
      navigate('/success');
    } catch (error) {
      console.error('Error during payment submission:', error);
      if (error.response) {
        console.error('Response error:', error.response.data);
      }
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="payment-page">
      <div className="credit-card-form">
        <div className="form-header">
          <h2>PAYMENT DETAILS</h2>
          {hallName && hallPrice && (
            <div className="payment-summary">
              <p><strong>Hall Name:</strong> {hallName}</p>
              <p><strong>Contact Email:</strong> {contactEmail}</p>
              <p><strong>Hall Price:</strong> {hallPrice}</p>
            </div>
          )}
        </div>
        <div className="form-body">
          <img
            className="card-image"
            src="https://i.ibb.co/hgJ7z3J/6375aad33dbabc9c424b5713-card-mockup-01.png"
            alt="Card Mockup"
          />
          <div className="payment-options">
            <div 
              className={`payment-option ${activePayment === 'card' ? 'active' : ''}`}
              onClick={() => setActivePayment('card')}
            >
              Card
            </div>
            <div 
              className={`payment-option ${activePayment === 'gpay' ? 'active' : ''}`}
              onClick={() => setActivePayment('gpay')}
            >
              GPay
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            {activePayment === 'card' ? (
              <>
                <div className="form-group">
                  <label htmlFor="card-number">Card Number</label>
                  <input type="text" id="card-number" placeholder="1234 5678 9012 3456" />
                </div>
                <div className="form-group">
                  <label htmlFor="card-holder">Card Holder</label>
                  <input type="text" id="card-holder" placeholder="Full Name" />
                </div>
                <div className="form-row">
                  <div className="form-column">
                    <label htmlFor="expiry-date">Expiry Date</label>
                    <input type="text" id="expiry-date" placeholder="MM/YY" />
                  </div>
                  <div className="form-column">
                    <label htmlFor="cvv">CVV</label>
                    <input type="text" id="cvv" placeholder="123" />
                  </div>
                </div>
              </>
            ) : (
              <div className="form-group">
                <label htmlFor="gpay-id">Google Pay ID</label>
                <input type="text" id="gpay-id" placeholder="Enter your GPay ID" />
              </div>
            )}
            <button type="submit" className="click-button">Pay</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
