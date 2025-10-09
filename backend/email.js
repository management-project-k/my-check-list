// backend/email.js
import express from "express";
import nodemailer from "nodemailer";

const router = express.Router();

// Test route
router.get("/", (req, res) => {
  res.json({ message: "Email service is available" });
});

// Send email route
router.post("/send", async (req, res) => {
  const { to, subject, text } = req.body;

  // Validate input
  if (!to || !subject || !text) {
    return res.status(400).json({ 
      error: "Missing required fields", 
      message: "to, subject, and text are required" 
    });
  }

  // Check for email configuration
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
    return res.status(500).json({ 
      error: "Email not configured",
      message: "Email service credentials not set. Please configure EMAIL_USER and EMAIL_PASS environment variables."
    });
  }

  try {
    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Send email
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject,
      text,
    });

    res.json({ 
      success: true, 
      message: "Email sent successfully",
      messageId: info.messageId
    });
  } catch (err) {
    console.error("Email error:", err.message);
    res.status(500).json({ 
      error: "Failed to send email",
      message: err.message
    });
  }
});

export default router;
