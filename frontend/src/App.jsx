import React, { useEffect, useState } from "react";
import { getStudents, loginUser } from "./api";

function App() {
  const [students, setStudents] = useState([]);
  const [loginData, setLoginData] = useState({ role: "", userId: "", password: "" });
  const [loginResult, setLoginResult] = useState(null);

  useEffect(() => {
    getStudents().then(data => setStudents(data));
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const result = await loginUser(loginData.role, loginData.userId, loginData.password);
    setLoginResult(result);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Student Management System</h1>

      {/* Login Form */}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <select value={loginData.role} onChange={e => setLoginData({...loginData, role: e.target.value})}>
          <option value="">Select Role</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" placeholder="User ID" value={loginData.userId} onChange={e => setLoginData({...loginData, userId: e.target.value})} />
        <input type="password" placeholder="Password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} />
        <button type="submit">Login</button>
      </form>

      {loginResult && (
        <div>
          {loginResult.success ? (
            <p>Login Success! Welcome {loginResult.user[1]}</p>
          ) : (
            <p>{loginResult.message}</p>
          )}
        </div>
      )}

      {/* Students Table */}
      <h2>Students List</h2>
      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>SID</th>
            <th>Name</th>
            <th>DOB</th>
            <th>Department</th>
            <th>Parent Name</th>
            <th>Mobile</th>
            <th>Parent Mobile</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {students.map((s, i) => (
            <tr key={i}>
              <td>{s[0]}</td>
              <td>{s[1]}</td>
              <td>{s[2]}</td>
              <td>{s[3]}</td>
              <td>{s[4]}</td>
              <td>{s[5]}</td>
              <td>{s[6]}</td>
              <td>{s[7]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;