import React, { useState } from "react";
import "./style.css";
import axios from "axios";
const SignupForm = () => {
  const [data, setData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role_id: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        data
      );
      console.log(response.data);
    } catch (error) {
      console.error("Error during form submission:", error);
    }
  };

  return (
    <div className="container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
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

        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          onChange={handleChange}
          required
        />

        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          onChange={handleChange}
          required
        />

        <label htmlFor="role_id">Role:</label>
        <select id="role_id" name="role_id" onChange={handleChange} required>
          <option value="" disabled>
            Select Role
          </option>
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>

        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignupForm;
