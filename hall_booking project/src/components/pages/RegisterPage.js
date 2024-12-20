import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);
    const handleAgreeTermsChange = (e) => setAgreeTerms(e.target.checked);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (username && email && password && agreeTerms) {
            try {
                await axios.post(`http://localhost:8080/api/users/register`, { username, email, password ,roles:"USER"});
                navigate('/home'); // Redirect after successful signup
            } catch (error) {
                console.error("There was an error signing up!", error);
                alert('An error occurred during registration. Please try again.');
            }
        } else {
            alert('Please fill out all fields and agree to the terms.');
        }
    };

    // Function to navigate to the admin login page
    const navigateToAdminLogin = () => {
        navigate('/admin-login');
    };

    return (
        <div className="text-center m-5-auto">
            <h2>Join us</h2>
            <h5>Create your personal account</h5>
            <form onSubmit={handleSubmit}>
                <p>
                    <label>Username</label><br/>
                    <input type="text" name="username" value={username} onChange={handleUsernameChange} required />
                </p>
                <p>
                    <label>Email address</label><br/>
                    <input type="email" name="email" value={email} onChange={handleEmailChange} required />
                </p>
                <p>
                    <label>Password</label><br/>
                    <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
                </p>
                <p>
                    <input 
                        type="checkbox" 
                        name="checkbox" 
                        id="checkbox" 
                        checked={agreeTerms}
                        onChange={handleAgreeTermsChange} 
                        required 
                    /> 
                    <span>I agree to all statements in <a href="https://google.com" target="_blank" rel="noopener noreferrer">terms of service</a>.</span>
                </p>
                <p>
                    <button id="sub_btn" type="submit">Register</button>
                </p>
            </form>
            <footer>
                <p><Link to="/">Back to Homepage</Link>.</p>
            </footer>
            {/* Admin Login Button */}
            <div className="admin-login-button">
                <button onClick={navigateToAdminLogin}>Admin Login</button>
            </div>
        </div>
    );
}
