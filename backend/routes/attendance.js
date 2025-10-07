import express from "express";
import { google } from "googleapis";
import fs from "fs";

const router = express.Router();

// Google Sheets setup
const credentials = JSON.parse(fs.readFileSync("./credentials.json"));
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});
const sheets = google.sheets({ version: "v4", auth });

const SHEET_ID = process.env.GOOGLE_SHEETS_ID;

// Get all attendance
router.get("/", async (req, res) => {
  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: "Attendance!A1:E1000",
    });
    res.json(response.data.values || []);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch attendance" });
  }
});

export default router;
