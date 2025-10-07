import express from "express";

const router = express.Router();

// Sample dashboard data
router.get("/", (req, res) => {
  res.json({
    studentsCount: 120,
    teachersCount: 10,
    classesCount: 8,
  });
});

export default router;
