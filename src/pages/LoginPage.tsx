import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.scss";
import { LoginFormData, LoginError } from "../types";

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({ email: "", password: "" });
  const [error, setError] = useState<LoginError>({ email: "", password: "" });
  const [generalError, setGeneralError] = useState<string>("");
  const [isPageLoaded, setIsPageLoaded] = useState<boolean>(false);
  const navigate = useNavigate();

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
    if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Invalid email.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must contain at least 6 characters.";
    }

    setError((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (error.email || error.password || !formData.email || !formData.password) {
      setGeneralError("Please fix the errors before proceeding.");
      return;
    }

    const isAuthenticated = formData.email === "admin@example.com" && formData.password === "password123";
    localStorage.setItem("isAuthenticated", "true");
    navigate(isAuthenticated ? "/admin" : "/todos");
  };

  return (
    <div className={`login-page ${isPageLoaded ? "loaded" : ""}`}>
      <div className="login-left-side">
        <h1 className="login-title">Welcome Back!</h1>
        <p className="login-text">Log in to continue.</p>
      </div>
      <div className="login-right-side">
        <h2 className="form-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          {[{ field: "email", label: "Email", type: "text" }, { field: "password", label: "Password", type: "password" }].map(({ field, label, type }) => (
            <div key={field} className="login-field">
              <label htmlFor={field}>{label}</label>
              <input
              className="form-input"
                type={type}
                id={field}
                name={field}
                value={formData[field as keyof LoginFormData]}
                onChange={handleInputChange}
              />
              {error[field as keyof LoginError] && <p className="error-text">{error[field as keyof LoginError]}</p>}
            </div>
          ))}
          {generalError && <p className="error-text">{generalError}</p>}
          <button type="submit" className="form-button">Log In</button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
