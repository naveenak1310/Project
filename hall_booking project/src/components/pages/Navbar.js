import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Ensure you have this CSS file in your project

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/" className="navbar-logo">
                    {/* Replace with your actual image URL or path */}
                    <img src='https://cdn3.emoji.gg/emojis/9768_Radiant_Valorant.png' alt="Logo" />
                    <p className="main-title">Radient Halls</p>
                </Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/gallery">Gallery</Link></li>
                <li><Link to="/facilities">Facilities</Link></li>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
            </ul>
        </nav>
    );
}

export default Navbar;
