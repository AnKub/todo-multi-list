import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/RegistrationPage.scss"; // Использование модуля SCSS через импорт

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

  // Регулярные выражения для проверки
  const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/;

  // Эффект для установки класса .loaded
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPageLoaded(true); // Устанавливаем флаг после загрузки
    }, 100);

    return () => clearTimeout(timer); // Очистка таймера при размонтировании
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

    // Проверяем валидность формы
    setIsFormValid(
      usernameRegex.test(formData.username) &&
        emailRegex.test(formData.email) &&
        passwordRegex.test(formData.password)
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid) return;

    // Сохраняем данные в localStorage и переходим на страницу To-Do
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/todos");
  };

  return (
    <div className={`${styles.registrationPage} ${isPageLoaded ? styles.loaded : ""}`}>
      <div className={styles.registrationLeftSide}>
        <h1 className={styles.registrationTitle}>Turn your ideas into reality</h1>
        <p className={styles.registrationText}>Start for free</p>
      </div>
      <div className={styles.registrationRightSide}>
        <h2 className={styles.formTitle}>Welcome</h2>
        <p className={styles.formText}>Join and save your time</p>
        <form className={styles.registrationForm} onSubmit={handleSubmit}>
          <div className={styles.registrationField}>
            <label className={styles.formLabel} htmlFor="username">
              Username
            </label>
            <input
              className={styles.formInput}
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              required
            />
            {error.username && (
              <p className={styles.registrationError}>{error.username}</p>
            )}
          </div>
          <div className={styles.registrationField}>
            <label className={styles.formLabel} htmlFor="email">
              Email
            </label>
            <input
              className={styles.formInput}
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
            {error.email && (
              <p className={styles.registrationError}>{error.email}</p>
            )}
          </div>
          <div className={styles.registrationField}>
            <label className={styles.formLabel} htmlFor="password">
              Password
            </label>
            <input
              className={styles.formInput}
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
            {error.password && (
              <p className={styles.registrationError}>{error.password}</p>
            )}
          </div>
          <button
            className={styles.formButton}
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
