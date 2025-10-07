// backend/routes/email.js
import express from "express";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";

const router = express.Router();

// Load credentials from credentials.json
const credentialsPath = path.resolve("backend/routes/credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

// Create transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // or another email service
  auth: {
    user: credentials.email, // your email
    pass: credentials.password, // your email password or app password
  },
});

// Test route
router.get("/", (req, res) => {
  res.send("✅ Email route is working!");
});

// Send email route
router.post("/send", async (req, res) => {
  try {
    const { to, subject, text } = req.body;

    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Please provide to, subject, and text." });
    }

    const mailOptions = {
      from: credentials.email,
      to,
      subject,
      text,
    };

    const info = await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "Email sent successfully!", info });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Failed to send email.", details: error.message });
  }
});

export default router;
