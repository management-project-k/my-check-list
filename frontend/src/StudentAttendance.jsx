import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendance } from "./api";

export default function StudentAttendance() {
  const { sid } = useParams();
  const [records, setRecords] = useState([]);

  useEffect(() => {
    if (!sid) return;
    getAttendance(sid).then(r => setRecords(r));
  }, [sid]);

  return (
    <div>
      <h2>Attendance</h2>
      <table border="1" cellPadding="6">
        <thead><tr><th>Date</th><th>Status</th></tr></thead>
        <tbody>
          {records.map((r, i) => <tr key={i}><td>{r[1]}</td><td>{r[2]}</td></tr>)}
        </tbody>
      </table>
    </div>
  );
}
