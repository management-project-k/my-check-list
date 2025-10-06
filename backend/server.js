import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import registerRoute from "./routes/register.js";
import dashboardRoute from "./routes/dashboard.js";
import attendanceRoute from "./routes/attendance.js";
import chatbotRoute from "./routes/chatbot.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Routes
app.use("/register", registerRoute);
app.use("/dashboard", dashboardRoute);
app.use("/attendance", attendanceRoute);
app.use("/chatbot", chatbotRoute);

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => res.send("SMS Backend Running"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
