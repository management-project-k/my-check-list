// backend/routes/email.js
import express from "express";
import { google } from "googleapis";
import fs from "fs";
import path from "path";

const router = express.Router();

// Load service account credentials
const credentialsPath = path.resolve("backend/routes/credentials.json");
const credentials = JSON.parse(fs.readFileSync(credentialsPath, "utf8"));

const SCOPES = ["https://www.googleapis.com/auth/gmail.send"];

const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: SCOPES,
});

const gmail = google.gmail({ version: "v1", auth });

// Test route
router.get("/", (req, res) =>
