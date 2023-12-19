import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SignupForm = () => {
  const navigate = useNavigate();
  const [formdata, setFromdata] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role_id: "",
  });
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    setFromdata({ ...formdata, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formdata);
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/register",
        formdata
      );
      console.log(response.data.message);
      navigate("/login");
    } catch (error) {
      console.error("Error during form submission:", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during registration.");
      }
      console.log(errorMessage);
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
        <label className="redError">{errorMessage}</label>
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
          <option disabled selected>
            Select Role
          </option>
          <option value="1">Admin</option>
          <option value="2">User</option>
        </select>
        <button type="submit">Sign Up</button>
        <Link to="/login">Already have account?</Link>
      </form>
    </div>
  );
};

export default SignupForm;
