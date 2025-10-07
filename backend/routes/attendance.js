import express from "express";
const router = express.Router();

// Example Attendance Route
router.get("/", (req, res) => {
  res.json({ message: "Attendance route working!" });
});

export default router;
