import express from "express";
import { google } from "googleapis";
import { sendEmail } from "../email.js";

const router = express.Router();

const auth = new google.auth.GoogleAuth({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS || "credentials.json",
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const spreadsheetId = process.env.SPREADSHEET_ID;
const otpStore = {}; // ephemeral; for production use Redis or DB

const genOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

router.post("/", async (req, res) => {
  // send OTP
  const { role, userId, name, email } = req.body;
  if (!role || !userId || !email) return res.status(400).json({ success: false, message: "Missing fields" });
  const otp = genOTP();
  otpStore[userId] = otp;
  try {
    await sendEmail(email, "Your SMS Registration OTP", `Your OTP is: ${otp}`);
    return res.json({ success: true, message: "OTP sent to email" });
  } catch (err) {
    console.error("OTP send error:", err);
    return res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

router.post("/verify", async (req, res) => {
  const { role, userId, name, email, password, otp } = req.body;
  if (!otp || !userId) return res.status(400).json({ success: false, message: "Missing OTP or UserId" });
  if (otpStore[userId] !== otp) return res.json({ success: false, message: "Invalid OTP" });
  delete otpStore[userId];

  try {
    const client = await auth.getClient();
    const sheets = google.sheets({ version: "v4", auth: client });

    let values = [];
    let range = "";
    if (role === "student") {
      range = "Students!A2:K"; // A: SID, B:Name, C:DOB, D:Dept, E:ParentName, F:Mobile, G:ParentMobile, H:Email, I:Password, J:Fees, K:Fines
      values = [userId, name, "", "", "", "", "", email, password, "0", "0"];
    } else if (role === "teacher") {
      range = "Teachers!A2:F";
      values = [userId, name, "", email, "", "Active"];
    } else if (role === "admin") {
      range = "Admin!A2:C";
      values = [userId, name, password];
    } else return res.status(400).json({ success: false, message: "Invalid role" });

    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range,
      valueInputOption: "RAW",
      resource: { values: [values] }
    });

    return res.json({ success: true, message: "Registered successfully" });
  } catch (err) {
    console.error("Register verify error:", err);
    return res.status(500).json({ success: false, message: "Registration failed" });
  }
});

export default router;
