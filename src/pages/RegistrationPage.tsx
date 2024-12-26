import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegistrationPage.scss";
import "../styles/main.scss";
import { RegistrationFormData, RegistrationError } from "../types";

const RegistrationPage: React.FC = () => {
  const [formData, setFormData] = useState<RegistrationFormData>({ username: "", email: "", password: "" });
  const [error, setError] = useState<RegistrationError>({ username: "", email: "", password: "" });
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^[A-Za-z\d]{6,}$/;

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage = "Invalid username.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Invalid email.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must contain at least 6 characters.";
    }

    setError((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (Object.values(error).some((err) => err) || Object.values(formData).some((value) => !value)) {
      return;
    }

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
          {[{ field: "username", label: "Username", type: "text" }, { field: "email", label: "Email", type: "text" }].map(({ field, label, type }) => (
            <div key={field} className="registration-field">
              <label className="form-label" htmlFor={field}>{label}</label>
              <input
                className="form-input"
                type={type}
                id={field}
                name={field}
                value={formData[field as keyof RegistrationFormData]}
                onChange={handleInputChange}
                required
              />
              <div className="error-container">
                {error[field as keyof RegistrationError] && <p className="registration-error">{error[field as keyof RegistrationError]}</p>}
              </div>
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
            <div className="error-container">
              {error.password && <p className="registration-error">{error.password}</p>}
            </div>
          </div>
          <div className="button-group">
            <button className="form-button register-button" type="submit" disabled={Object.values(error).some((err) => err) || Object.values(formData).some((value) => !value)}>
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
