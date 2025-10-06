import React, { useState } from "react";
import { postMarkAttendance } from "./api";

export default function TeacherAttendance() {
  const [form, setForm] = useState({ sid: "", date: "", status: "Present" });
  const [msg, setMsg] = useState("");

  const submit = async () => {
    const res = await postMarkAttendance(form);
    setMsg(res.data.message || "Done");
  };

  return (
    <div>
      <h2>Mark Attendance</h2>
      <input placeholder="Student ID" value={form.sid} onChange={e => setForm({ ...form, sid: e.target.value })} />
      <input type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
        <option value="Present">Present</option>
        <option value="Absent">Absent</option>
      </select>
      <button onClick={submit}>Submit</button>
      {msg && <p>{msg}</p>}
    </div>
  );
}
