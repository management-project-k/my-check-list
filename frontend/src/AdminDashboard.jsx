import React, { useEffect, useState } from "react";
import { getDashboardData } from "./api.js";

function AdminDashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    async function fetchData() {
      const res = await getDashboardData();
      setData(res);
    }
    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>Admin Dashboard</h2>
      <p>Total Students: {data.studentsCount}</p>
      <p>Total Teachers: {data.teachersCount}</p>
      <p>Total Classes: {data.classesCount}</p>
    </div>
  );
}

export default AdminDashboard;
