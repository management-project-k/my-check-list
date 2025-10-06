import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const API = import.meta.env.VITE_API_BASE || "http://localhost:5000";

export default function StudentDashboard() {
  const { sid } = useParams();
  const [student, setStudent] = useState(null);

  useEffect(() => {
    if (!sid) return;
    axios.get(`${API}/dashboard/student/${sid}`).then(r => setStudent(r.data));
  }, [sid]);

  if (!student) return <p>Loading...</p>;
  return (
    <div>
      <h2>{student[1]}</h2>
      <p>Dept: {student[3]}</p>
      <p>Email: {student[7]}</p>
      <p>Fees: {student[9]}</p>
      <p>Fines: {student[10]}</p>
    </div>
  );
}
