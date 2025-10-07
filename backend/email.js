import express from "express";
const router = express.Router();

// Example Email route
router.post("/", (req, res) => {
  res.json({ message: "Email route working fine!" });
});

export default router;
