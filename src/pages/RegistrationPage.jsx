import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  // Регулярные выражения для валидации
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/; // Имя пользователя (от 3 символов, только буквы, цифры и _)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; // Email
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/; // Пароль (мин 6 символов, хотя бы 1 цифра, 1 заглавная буква и спецсимвол)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Валидация при изменении
    let errorMessage = "";
    if (name === "username" && !usernameRegex.test(value)) {
      errorMessage = "Username must be at least 3 characters and can only contain letters, numbers, and underscores.";
    } else if (name === "email" && !emailRegex.test(value)) {
      errorMessage = "Please enter a valid email address.";
    } else if (name === "password" && !passwordRegex.test(value)) {
      errorMessage = "Password must be at least 6 characters long, contain a number, a capital letter, and a special character.";
    }

    setError((prevError) => ({
      ...prevError,
      [name]: errorMessage,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Финальная проверка перед отправкой формы
    if (error.username || error.email || error.password) {
      return;
    }

    // Если ошибок нет, сохраняем данные в localStorage и переходим на страницу задач
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/todos");
  };

  return (
    <div className="registration-page">
      <h1>Registration</h1>
      <form className="registration-form" onSubmit={handleSubmit}>
        <div className="registration-field">
          <label className="registration-label" htmlFor="username">Username</label>
          <input
            className="registration-input"
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
            required
          />
          {error.username && <p className="registration-error">{error.username}</p>}
        </div>
        <div className="registration-field">
          <label className="registration-label" htmlFor="email">Email</label>
          <input
            className="registration-input"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          {error.email && <p className="registration-error">{error.email}</p>}
        </div>
        <div className="registration-field">
          <label className="registration-label" htmlFor="password">Password</label>
          <input
            className="registration-input"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          {error.password && <p className="registration-error">{error.password}</p>}
        </div>
        <button
          className="registration-button"
          type="submit"
          disabled={error.username || error.email || error.password}
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegistrationPage;
