import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

import attendanceRoute from "./routes/attendance.js";
import chatbotRoute from "./routes/chatbot.js";
import dashboardRoute from "./routes/dashboard.js";
import registerRoute from "./routes/register.js";
import emailRoute from "./routes/email.js"; // only once!

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Routes
app.use("/api/attendance", attendanceRoute);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/register", registerRoute);
app.use("/api/email", emailRoute);

// Default route
app.get("/", (req, res) => {
  res.send("✅ SMS Backend is running successfully on Render!");
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
