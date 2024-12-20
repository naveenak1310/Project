import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './AdminHomePage.css';
import BackgroundImage3 from '../../assets/images/wall1.jpg';
import hall1 from '../../assets/images/hall1.jpg';
import hall2 from '../../assets/images/hall2.jpg';
import hall3 from '../../assets/images/hall3.jpg';
import hall4 from '../../assets/images/hall4.jpg';
import hall5 from '../../assets/images/hall5.jpg';
import hall6 from '../../assets/images/hall6.jpg';

export default function AdminHomePage() {
    const rooms = [
        {
            id: 'jennis-hall',
            image: hall1,
            title: "Jennis Hall",
            description: "Manage and view bookings for Jennis Hall. This grand space is ideal for large-scale events.",
        },
        {
            id: 'harrys-hall',
            image: hall2,
            title: "Harry's Hall",
            description: "Manage and view bookings for Harry's Hall. Perfect for hosting large gatherings.",
        },
        {
            id: 'grant-hall',
            image: hall3,
            title: "Grant Hall",
            description: "Manage and view bookings for Grant Hall. Ideal for elaborate events and celebrations.",
        },
        {
            id: 'richie-hall',
            image: hall4,
            title: "Richie Hall",
            description: "Manage and view bookings for Richie Hall. Ideal for high-profile events and corporate functions.",
        },
        { 
            id: 'golden-hall', 
            image: hall5, 
            title: "Golden Hall", 
            description: "Manage and view bookings for Golden Hall. Ideal for luxury and corporate functions."
        },
        { 
            id: 'durian-hall', 
            image: hall6, 
            title: "Durian Hall",
            description: "Manage and view bookings for Durian Hall. Ideal for service quality."
        }
    ];

    const observerRef = useRef(null);

    useEffect(() => {
        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('pop-out');
                    observerRef.current.unobserve(entry.target);
                }
            });
        });

        document.querySelectorAll('.room-card').forEach(card => {
            observerRef.current.observe(card);
        });

        return () => observerRef.current.disconnect();
    }, []);

    return (
        <div
            className="admin-homepage-container"
            style={{ backgroundImage: `url(${BackgroundImage3})` }}
        >
            <div className="rooms-section">
                {rooms.map((room, index) => (
                    <div className="room-card" key={index}>
                        <img src={room.image} alt={room.title} className="room-image" />
                        <h2 className="room-title">{room.title}</h2>
                        <p className="room-description">{room.description}</p>
                        <div className="admin-buttons">
                            <Link to={`/admin/bookings/${room.id}`} className="admin-button">
                                View Bookings
                            </Link>
                            <Link to={`/admin/payments/${room.id}`} className="admin-button">
                                View Payments
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
