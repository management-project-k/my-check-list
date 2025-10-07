import express from "express";
const router = express.Router();

// Example Dashboard Route
router.get("/", (req, res) => {
  res.json({ message: "Dashboard route connected!" });
});

export default router;
