import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import attendanceRoute from "./routes/attendance.js";
import chatbotRoute from "./routes/chatbot.js";
import dashboardRoute from "./routes/dashboard.js";
import registerRoute from "./routes/register.js";
import emailRoute from "./email.js";

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow all origins for development/deployment
const corsOptions = {
  origin: process.env.CORS_ORIGIN || '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use("/api/attendance", attendanceRoute);
app.use("/api/chatbot", chatbotRoute);
app.use("/api/dashboard", dashboardRoute);
app.use("/api/register", registerRoute);
app.use("/api/email", emailRoute);

// Health check route
app.get("/", (req, res) => {
  res.json({
    status: "success",
    message: "SMS Backend is running successfully",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development"
  });
});

// API status route
app.get("/api", (req, res) => {
  res.json({
    status: "success",
    message: "API is operational",
    endpoints: [
      "/api/attendance",
      "/api/chatbot",
      "/api/dashboard",
      "/api/register",
      "/api/email"
    ]
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: "Not Found",
    message: `Route ${req.method} ${req.path} not found`,
    availableEndpoints: ["/api/attendance", "/api/chatbot", "/api/dashboard", "/api/register", "/api/email"]
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  console.error(err.stack);
  
  res.status(err.status || 500).json({
    error: "Internal Server Error",
    message: process.env.NODE_ENV === "production" 
      ? "An error occurred on the server" 
      : err.message
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌍 CORS origin: ${process.env.CORS_ORIGIN || "*"}`);
});
