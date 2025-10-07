import React, { useEffect, useState } from "react";
import { getAttendance } from "./api.js";

function StudentDashboard() {
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
      <h2>Student Dashboard</h2>
      <h3>Your Attendance</h3>
      <table border="1" style={{ margin: "0 auto" }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Subject</th>
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

export default StudentDashboard;
