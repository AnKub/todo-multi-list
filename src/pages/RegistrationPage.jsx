import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationPage.scss"; 

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const navigate = useNavigate();

  // Regex for validation
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; 
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; 
  const passwordRegex =/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/; 

  // Animation effect when the component mounts
  useEffect(() => {
    setTimeout(() => setIsPageLoaded(true), 100); // Delay to trigger CSS animation
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage =
        "Username must be at least 3 characters and can only contain letters, numbers, and underscores.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage =
        "Password must be at least 6 characters long, contain a number, a capital letter, and a special character.";
    }

    setError((prevError) => ({
      ...prevError,
      [name]: errorMessage,
    }));

    // Check if form is valid
    setIsFormValid(
      usernameRegex.test(formData.username) &&
        emailRegex.test(formData.email) &&
        passwordRegex.test(formData.password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    // Save data to localStorage and navigate
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/todos");
  };

  return (
    <div className={`registration-page ${isPageLoaded ? "loaded" : ""}`}>
      <div className="registration-left-side">
        <h1 className="registration-title">Turn your ideas into reality</h1>
        <p className="registration-text">Start for free</p>
      </div>
      <div className="registration-right-side">
        <h2 className="form-title">Welcome</h2>
        <p className="form-text">Join and save your time</p>
        <form className="registration-form" onSubmit={handleSubmit}>
          <div className="registration-field">
            <label className="form-label" htmlFor="username">
              Username
            </label>
            <input
              className="form-input"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {error.username && (
              <p className="registration-error">{error.username}</p>
            )}
          </div>
          <div className="registration-field">
            <label className="form-label" htmlFor="email">
              Email
            </label>
            <input
              className="form-input"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {error.email && (
              <p className="registration-error">{error.email}</p>
            )}
          </div>
          <div className="registration-field">
            <label className="form-label" htmlFor="password">
              Password
            </label>
            <input
              className="form-input"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {error.password && (
              <p className="registration-error">{error.password}</p>
            )}
          </div>
          <button
            className="form-button"
            type="submit"
            disabled={!isFormValid}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};
export default RegistrationPage;  
