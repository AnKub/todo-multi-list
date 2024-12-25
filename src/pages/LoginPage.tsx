// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/LoginPage.scss";
// import "../styles/main.scss";

// const LoginPage = () => {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState({ email: "", password: "" });
//   const [generalError, setGeneralError] = useState(""); // Для помилки авторизації
//   const [isPageLoaded, setIsPageLoaded] = useState(false);
//   const navigate = useNavigate();

//   const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
//   const passwordRegex = /^[A-Za-z\d]{6,}$/;

//   useEffect(() => {
//     const timer = setTimeout(() => setIsPageLoaded(true), 500);
//     return () => clearTimeout(timer);
//   }, []);

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({ ...prevData, [name]: value }));

//     let errorMessage = "";
//     if (name === "email" && !emailRegex.test(value)) {
//       errorMessage = "Invalid email.";
//     } else if (name === "password" && !passwordRegex.test(value)) {
//       errorMessage = "Password must contain at least 6 characters.";
//     }

//     setError((prevError) => ({ ...prevError, [name]: errorMessage }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     if (error.email || error.password || !formData.email || !formData.password) {
//       setGeneralError("Please fix the errors before proceeding.");
//       return;
//     }

//     // Мок-логіка авторизації
//     if (formData.email === "admin@example.com" && formData.password === "password123") {
//       localStorage.setItem("isAuthenticated", "true");
//       navigate("/admin");
//     } else if (formData.email && formData.password) {
//       localStorage.setItem("isAuthenticated", "true");
//       navigate("/todos");
//     } else {
//       setGeneralError("Invalid email or password.");
//     }
//   };

//   return (
//     <div className={`login-page ${isPageLoaded ? "loaded" : ""}`}>
//       <div className="login-left-side">
//         <h1 className="login-title">Welcome Back!</h1>
//         <p className="login-text">Log in to continue.</p>
//       </div>
//       <div className="login-right-side">
//         <h2 className="form-title">Login</h2>
//         <form className="login-form" onSubmit={handleSubmit}>
//           {["email", "password"].map((field) => (
//             <div key={field} className="login-field">
//               <label className="form-label" htmlFor={field}>
//                 {field.charAt(0).toUpperCase() + field.slice(1)}
//               </label>
//               <input
//                 className="form-input"
//                 type={field === "password" ? "password" : "text"}
//                 id={field}
//                 name={field}
//                 value={formData[field]}
//                 onChange={handleInputChange}
//                 required
//               />
//               <div className="error-container">
//                 {error[field] && <p className="login-error">{error[field]}</p>}
//               </div>
//             </div>
//           ))}
//           {generalError && <p className="login-error">{generalError}</p>}
//           <button className="form-button login-button" type="submit">
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;
