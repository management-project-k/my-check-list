import express from "express";
import OpenAI from "openai";

const router = express.Router();

// Validate API key exists
if (!process.env.OPENAI_API_KEY) {
  console.error("FATAL: OPENAI_API_KEY environment variable is not set");
  throw new Error("OPENAI_API_KEY is required for chatbot functionality");
}

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

router.post("/", async (req, res) => {
  const { message } = req.body;
  
  // Validate input
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return res.status(400).json({ 
      error: "Invalid request", 
      message: "Message is required and must be a non-empty string" 
    });
  }
  
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [{ role: "user", content: message.trim() }],
      max_tokens: 1000,
      temperature: 0.7
    });
    
    // Validate response structure
    if (!response.choices || !response.choices[0] || !response.choices[0].message) {
      throw new Error("Invalid response structure from OpenAI API");
    }
    
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error("Chatbot error:", err.message);
    
    // Handle specific error types
    if (err.status === 401) {
      return res.status(500).json({ 
        error: "Authentication error",
        message: "Failed to authenticate with OpenAI API" 
      });
    }
    
    if (err.status === 429) {
      return res.status(429).json({ 
        error: "Rate limit exceeded",
        message: "Too many requests. Please try again later." 
      });
    }
    
    if (err.code === 'ECONNREFUSED' || err.code === 'ETIMEDOUT') {
      return res.status(503).json({ 
        error: "Service unavailable",
        message: "Unable to connect to OpenAI service" 
      });
    }
    
    // Generic error response for production
    res.status(500).json({ 
      error: "Chatbot error",
      message: "An error occurred while processing your request" 
    });
  }
});

export default router;
