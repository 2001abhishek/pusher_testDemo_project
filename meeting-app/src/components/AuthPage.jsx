import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api";

const AuthPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [isRegistering, setIsRegistering] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const apiCall = isRegistering ? registerUser : loginUser;
      const response = await apiCall(form);
      localStorage.setItem("token", response.data.token); // Store token
      localStorage.setItem("email", form.email); // Store email
      navigate("/profile");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
      alert("Error occurred. Please try again.");
    }
  };
  

  return (
    <div>
      <h1>{isRegistering ? "Register" : "Login"}</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering ? "Switch to Login" : "Switch to Register"}
      </button>
    </div>
  );
};

export default AuthPage;
