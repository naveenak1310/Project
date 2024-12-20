import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminPaymentPage.css';

export default function AdminPaymentsPage() {
    const { hallId } = useParams(); // Get hallId from URL parameters
    const [payments, setPayments] = useState([]); // State to store payment data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error messages

    useEffect(() => {
        if (hallId) {
            const url = `http://localhost:8080/api/payments/booking/${encodeURIComponent(hallId)}`;

            setLoading(true); // Set loading to true before making the request

            axios.get(url)
                .then(response => {
                    console.log('Response data:', response.data); // Debugging log
                    if (Array.isArray(response.data)) {
                        setPayments(response.data); // Update state with fetched payments
                    } else {
                        throw new Error('Unexpected response format');
                    }
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch(error => {
                    console.error('Error fetching payments:', error.response || error.message || error);
                    setError('Failed to load payments.'); // Update error state
                    setLoading(false); // Set loading to false after an error occurs
                });
        }
    }, [hallId]); // Run effect when hallId changes

    if (loading) return <p>Loading...</p>; // Show loading message while fetching data
    if (error) return <p>Error: {error}</p>; // Show error message if any

    return (
        <div className="admin-payments-container">
            <h1>{hallId ? `Payments for Hall ${hallId.replace('-', ' ')}` : 'Select a Hall to View Payments'}</h1>
            
            <div className="payments-list">
                {payments.length === 0 ? (
                    <p>No payments found.</p> // Message when no payments are available
                ) : (
                    payments.map((payment) => (
                        <div key={payment.id} className="payment-card">
                            <p className="amount"><span>Amount:</span> ${payment.price}</p> {/* Updated to use price */}
                            <p><span>Method:</span> {payment.paymentMethod}</p> {/* Updated to use paymentMethod */}
                            <p className="email"><span>Email:</span> {payment.contactEmail}</p>
                            <p className="status"><span>Payment Status:</span> Successful</p>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
