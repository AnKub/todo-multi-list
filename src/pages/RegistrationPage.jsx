import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationPage.scss";
import "../styles/main.scss";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState({ username: "", email: "", password: "" });
  const [isFormValid, setIsFormValid] = useState(false);
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^[A-Za-z\d]{6,}$/;

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage = "Invalid username.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Invalid email.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must contain at least 6 characters with letters and numbers.";
    }

    setError((prevError) => ({ ...prevError, [name]: errorMessage }));
    setIsFormValid(
      usernameRegex.test(formData.username) &&
      emailRegex.test(formData.email) &&
      passwordRegex.test(formData.password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    localStorage.setItem("currentUser", formData.username);
    localStorage.setItem(`todoLists_${formData.username}`, JSON.stringify([]));
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
          {["username", "email"].map((field) => (
            <div key={field} className="registration-field">
              <label className="form-label" htmlFor={field}>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              <input
                className="form-input"
                type="text"
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleInputChange}
                required
              />
              {error[field] && <p className="registration-error">{error[field]}</p>}
            </div>
          ))}
          <div className="registration-field">
            <label className="form-label" htmlFor="password">Password</label>
            <div className="password-container">
              <span
                className="password-toggle-icon"
                onClick={() => setShowPassword(!showPassword)}
                title={showPassword ? "Hide Password" : "Show Password"}
              >
                {showPassword ? "👁️" : "🙈"}
              </span>
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                required
              />
            </div>
            {error.password && <p className="registration-error">{error.password}</p>}
          </div>
          <div className="button-group">
            <button className="form-button register-button" type="submit" disabled={!isFormValid}>
              Register
            </button>
              <button
              className="form-button login-button"
              type="button"
              onClick={() => navigate("/login")}>
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
