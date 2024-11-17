import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';

const RegistrationForm = () => {
  const [formData, setFormData] = useState({username:"",email: "", password: ""});
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
    if(formData.username && formData.email && formData.password) {
      navigate("/todos");
    }else{
      alert("Please fill in all fields");
    }
  };
 
  return (
    <form onSubmit={handleRegister}>
        <h2>Register</h2>
        <input
            type="text"
            placeholder="Username"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        />
        <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit">Sign Up</button>
    </form>
);
};
export default RegistrationForm;