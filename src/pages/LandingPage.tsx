import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.scss';

const LandingPage: React.FC = () => {
    const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
    const [isShaken, setIsShaken] = useState<boolean>(false); // додано стан для "shake" анімації
    const navigate = useNavigate();

    useEffect(() => {
        const timer = setTimeout(() => setIsPageLoaded(true), 500);
        return () => clearTimeout(timer);
    }, []);

    const handleButtonClick = (route: string) => {
        setIsShaken(true);  // запускає анімацію shake
        setTimeout(() => {
            navigate(route);
            setIsShaken(false);  // зупиняє анімацію після переходу
        }, 300);  // Затримка, щоб анімація встигла пройти
    };

    return (
        <div className={`landing-page ${isPageLoaded ? "loaded" : ""}`}>
            <div className="landing-left-side">
                <h1 className="landing-title">Welcome to Our Platform!</h1>
                {/* <p className="landing-text">
                Join and save your time
                </p> */}
            </div>
            <div className="landing-right-side">
            <h2 className="form-title">Join and save your time</h2>
            {/* <p className="form-text"> Join and save your time</p> */}
                <div className="button-container">
                    <button
                        className={`landing-button register-button ${isShaken ? 'shake' : ''}`}
                        onClick={() => handleButtonClick('/register')}
                    >
                        Register
                    </button>
                    <button
                        className={`landing-button login-button ${isShaken ? 'shake' : ''}`}
                        onClick={() => handleButtonClick('/login')}
                    >
                        Login
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
