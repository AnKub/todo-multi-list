import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.scss';

const LandingPage: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="landing-page">
            <h1 className="landing-title">Welcome!</h1>
            <div className="button-container">
                <button
                    className="landing-button register-button"
                    onClick={() => navigate('/register')}
                >
                    Register
                </button>
                <button
                    className="landing-button login-button"
                    onClick={() => navigate('/login')}
                >
                    Login
                </button>
            </div>
        </div>
    );
};

export default LandingPage;
