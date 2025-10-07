import express from "express";
const router = express.Router();

// Example Chatbot Route
router.get("/", (req, res) => {
  res.json({ message: "Chatbot route active!" });
});

export default router;
