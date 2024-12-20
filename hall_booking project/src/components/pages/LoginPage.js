import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../App.css';

const SignInPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email && password) {
            try {
                const response = await axios.get(`http://localhost:8080/api/users/login`, {
                    params: { email, password }
                });

                if (response.status === 200) {
                    // Redirect to home page if login is successful
                    navigate('/home');
                } else {
                    alert('Invalid email or password');
                }
            } catch (error) {
                console.error('Login error:', error);
                alert('An error occurred during login. Please try again.');
            }
        } else {
            alert('Please enter both email and password.');
        }
    };

    return (
        <div style={{ backgroundColor: '#F4E7D4', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '2rem' }}>
            <div className="text-center m-5-auto">
                <h2>Sign in to your account</h2>
                <form onSubmit={handleSubmit}>
                    <p>
                        <label>Email address</label><br/>
                        <input type="email" name="email" value={email} onChange={handleEmailChange} required />
                    </p>
                    <p>
                        <label>Password</label>
                        <Link to="/reset"><label className="right-label">Forgot password?</label></Link>
                        <br/>
                        <input type="password" name="password" value={password} onChange={handlePasswordChange} required />
                    </p>
                    <p>
                        <button id="sub_btn" type="submit">Login</button>
                    </p>
                </form>
                <footer>
                    <p>First time? <Link to="/register">Create an account</Link>.</p>
                    <p><Link to="/">Back to Homepage</Link>.</p>
                </footer>
            </div>
        </div>
    );
};

export default SignInPage;
