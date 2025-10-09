import express from "express";
import { google } from "googleapis";
import fs from "fs";

const router = express.Router();

// Google Sheets setup with environment variable support
let credentials;
let auth;
let sheets;

// Check if credentials are provided via environment variable (for production)
if (process.env.GOOGLE_CREDENTIALS) {
  try {
    credentials = JSON.parse(process.env.GOOGLE_CREDENTIALS);
    auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ["https://www.googleapis.com/auth/spreadsheets"],
    });
    sheets = google.sheets({ version: "v4", auth });
  } catch (err) {
    console.error("Failed to parse GOOGLE_CREDENTIALS:", err.message);
  }
} else if (fs.existsSync("./credentials.json")) {
  // Fallback to local credentials file for development
  credentials = JSON.parse(fs.readFileSync("./credentials.json"));
  auth = new google.auth.GoogleAuth({
    credentials,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });
  sheets = google.sheets({ version: "v4", auth });
} else {
  console.warn("No Google credentials found. Attendance routes will return mock data.");
}

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

// Get all attendance
router.get("/", async (req, res) => {
  // Check if sheets is configured
  if (!sheets || !SHEET_ID) {
    return res.status(500).json({ 
      error: "Google Sheets not configured",
      message: "Please configure GOOGLE_CREDENTIALS and GOOGLE_SHEETS_ID environment variables."
    });
  }

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Attendance!A1:E1000",
    });
    res.json(response.data.values || []);
  } catch (err) {
    console.error("Attendance fetch error:", err.message);
    res.status(500).json({ 
      error: "Failed to fetch attendance",
      message: err.message
    });
  }
});

export default router;
