import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FormData {
  username: string;
  email: string;
  password: string;
}

const RegistrationForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.username && formData.email && formData.password) {
      navigate("/todos");
    } else {
      alert("Please fill in all fields");
    }
  };

  return (
    <form onSubmit={handleRegister} className="registration-form">
      <h2 className="registration-title">Register</h2>
      <input
        type="text"
        placeholder="Username"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        className="registration-input"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="registration-input"
      />
      {/* <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        className="registration-input"
      /> */}
      <button type="submit" className="registration-button">
        Sign Up
      </button>
    </form>
  );
};

export default RegistrationForm;
