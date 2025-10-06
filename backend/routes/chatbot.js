import express from "express";
import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ success: false, message: "Missing message" });
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or gpt-4 if available
      messages: [{ role: "user", content: message }],
      max_tokens: 600
    });
    const reply = completion.choices[0].message.content;
    res.json({ success: true, reply });
  } catch (err) {
    console.error("Chatbot error:", err);
    res.status(500).json({ success: false, message: "Chatbot error" });
  }
});

export default router;
