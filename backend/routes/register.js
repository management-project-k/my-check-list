import express from "express";
const router = express.Router();

// Example Register Route
router.post("/", (req, res) => {
  const { name, email } = req.body;
  res.json({ success: true, message: `Registered user: ${name} (${email})` });
});

export default router;
