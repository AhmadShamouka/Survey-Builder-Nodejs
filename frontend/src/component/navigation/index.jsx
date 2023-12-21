import { Link } from "react-router-dom";
import React from "react";
import "./styles.css";
const Navigation = () => {
  return (
    <nav className="navigation">
      <ul>
        <li>
          <Link to="/get">Home</Link>
        </li>
        <li>
          <Link to="/survey">New Survey</Link>
        </li>
        <li>
          <Link to="/get">Get All Surveys</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
