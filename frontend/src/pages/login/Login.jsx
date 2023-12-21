import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);

    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        data
      );
      console.log(response.data);

      if (response.data.token) {
        const header = response.data.token;

        localStorage.setItem("jwtToken", header);
        console.log(localStorage);
        if (response.data.user.role_id === 1) {
          navigate(`/survey`);
        } else {
          navigate(`/get`);
        }
      }
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="container">
      <form className="login-form" onSubmit={handleSubmit}>
        <Link className="home" to={"/"}>
          Sign Up
        </Link>
        <h2>Login</h2>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
