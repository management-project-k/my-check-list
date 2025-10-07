import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Student Management System</h1>
      <Link to="/register">
        <button>Register</button>
      </Link>
      <Link to="/student">
        <button>Student Dashboard</button>
      </Link>
      <Link to="/teacher">
        <button>Teacher Dashboard</button>
      </Link>
      <Link to="/admin">
        <button>Admin Dashboard</button>
      </Link>
    </div>
  );
}

export default Home;
