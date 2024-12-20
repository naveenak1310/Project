import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';
import BackgroundImage1 from '../../assets/images/hd.jpg';

export default function LandingPage() {
  const [animate, setAnimate] = useState(false);
  const backgroundImage = BackgroundImage1;

  useEffect(() => {
    setAnimate(true);
  }, []);

  const adaptiveColor = '#eb5757'; // Custom color

  return (
    <header style={{ ...HeaderStyle, backgroundImage: `url(${backgroundImage})` }}>
      <div className="overlay"></div> {/* Gradient overlay */}
      <div className={`content ${animate ? 'animate' : ''}`}>
        <h1 className="main-title text-center">
          <span className="letter" style={{ marginRight: '5px', color: adaptiveColor }}>Radiant</span>
          <span className="letter" style={{ marginLeft: '5px', color: adaptiveColor }}>Halls</span>
        </h1>
        <p className="main-para text-center">Welcome to Radiant Halls, where comfort meets luxury.</p>
        <div className="buttons text-center">
          <Link to="/login">
            <button className="primary-button"><span>Log In</span></button>
          </Link>
          <Link to="/register">
            <button className="primary-button" id="reg_btn"><span>Register</span></button>
          </Link>
        </div>
      </div>
    </header>
  );
}

const HeaderStyle = {
  width: "100%",
  height: "100vh",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  transition: "background-image 1s ease-in-out",
  overflow: "hidden",
  position: "relative",
  color: "#fff",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center"
};
