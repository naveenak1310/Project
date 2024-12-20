import React from 'react';
import './Facilities.css';

export default function Facilities() {
    const facilities = [
        {
            name: "Catering Service",
            description: "Delicious and customizable catering options to suit every palate. Our professional chefs ensure a delightful dining experience.",
            icon: "🍽️"
        },
        {
            name: "Audio-Visual Equipment",
            description: "State-of-the-art audio and visual equipment for presentations, music, and entertainment. Perfect for corporate events and celebrations.",
            icon: "🔊"
        },
        {
            name: "Decorations",
            description: "Elegant and personalized decoration services to make your event visually stunning and memorable.",
            icon: "🎨"
        },
        {
            name: "Parking",
            description: "Ample parking space with valet services available for the convenience of your guests.",
            icon: "🚗"
        },
        {
            name: "Wi-Fi",
            description: "High-speed Wi-Fi connectivity throughout the venue, ensuring your event runs smoothly without any connectivity issues.",
            icon: "📶"
        },
        {
            name: "Security",
            description: "24/7 security services to ensure the safety and privacy of your event and guests.",
            icon: "🔒"
        }
    ];

    return (
        <div className="facilities-container">
            <h1 className="facilities-title">Our Facilities</h1>
            <div className="facilities-list">
                {facilities.map((facility, index) => (
                    <div className="facility-card" key={index}>
                        <div className="facility-icon">{facility.icon}</div>
                        <h2 className="facility-name">{facility.name}</h2>
                        <p className="facility-description">{facility.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
