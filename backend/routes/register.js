import express from "express";

const router = express.Router();

// Example registration route
router.post("/", async (req, res) => {
  const { userType, name, email, id } = req.body;
  // Normally, save to Google Sheets or DB
  res.json({ success: true, message: `${userType} registered successfully` });
});

export default router;
