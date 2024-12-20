import React, { useState } from 'react';
import './Contact.css';

export default function Contact() {
    const [notification, setNotification] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Simulate sending the message
        setNotification('Message sent successfully!');
        // Clear the notification after a few seconds
        setTimeout(() => setNotification(''), 3000);
    };

    return (
        <div className="contact-container">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-description">We'd love to hear from you! Fill out the form below and we'll get in touch with you shortly.</p>
            {notification && <div className="contact-notification">{notification}</div>}
            <form className="contact-form" onSubmit={handleSubmit}>
                <label className="contact-label">
                    Name:
                    <input type="text" className="contact-input" placeholder="Your Name" required />
                </label>
                <label className="contact-label">
                    Email:
                    <input type="email" className="contact-input" placeholder="Your Email" required />
                </label>
                <label className="contact-label">
                    Message:
                    <textarea className="contact-textarea" placeholder="Your Message" required></textarea>
                </label>
                <button type="submit" className="contact-button">Send Message</button>
            </form>
        </div>
    );
}
