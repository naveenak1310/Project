import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './AdminBookingsPage.css';

export default function AdminBookingsPage() {
    const { hallId } = useParams(); // Get hallId from URL parameters
    const [bookings, setBookings] = useState([]); // State to store booking data
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [error, setError] = useState(null); // State to manage error messages

    useEffect(() => {
        if (hallId) {
            const url = `http://localhost:8080/api/bookings/hall/${encodeURIComponent(hallId)}`;

            setLoading(true); // Set loading to true before making the request

            axios.get(url)
                .then(response => {
                    console.log('Response data:', response.data); // Debugging log
                    if (Array.isArray(response.data)) {
                        setBookings(response.data); // Update state with fetched bookings
                    } else {
                        throw new Error('Unexpected response format');
                    }
                    setLoading(false); // Set loading to false after data is fetched
                })
                .catch(error => {
                    console.error('Error fetching bookings:', error.response || error.message || error);
                    setError('Failed to load bookings.'); // Update error state
                    setLoading(false); // Set loading to false after an error occurs
                });
        }
    }, [hallId]); // Run effect when hallId changes

    if (loading) return <p>Loading...</p>; // Show loading message while fetching data
    if (error) return <p>Error: {error}</p>; // Show error message if any

    return (
        <div className="admin-bookings-container">
            <h1>{hallId ? `Bookings for Hall ${hallId.replace('-', ' ')}` : 'Select a Hall to View Bookings'}</h1>
            
            <div className="bookings-list">
                {bookings.length === 0 ? (
                    <p>No bookings found.</p> // Message when no bookings are available
                ) : (
                    bookings.map((booking) => (
                        <div key={booking.id} className="booking-card">
                            <p><span>Hall:</span> {booking.hallName}</p>
                            <p><span>Date:</span> {booking.date}</p>
                            <p><span>Time:</span> {booking.time}</p>
                            <p><span>Contact Email:</span> {booking.contactEmail}</p> {/* Added contactEmail */}
                            <a 
                                href={`mailto:${booking.contactEmail}`} 
                                className="contact-button"
                            >
                                Contact Customer
                            </a>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
