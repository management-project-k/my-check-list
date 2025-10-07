import React, { useEffect, useState } from "react";
import { getAttendance } from "./api.js";

function TeacherDashboard() {
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const res = await getAttendance();
      setAttendance(res);
    }
    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Teacher Dashboard</h2>
      <h3>Class Attendance</h3>
      <table border="1" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Student</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {attendance.map((row, index) => (
            <tr key={index}>
              <td>{row[0]}</td>
              <td>{row[1]}</td>
              <td>{row[2]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TeacherDashboard;
