import express from 'express';
import { generateContent, generateStructuredContent } from '../services/gemini_service.js';

const router = express.Router();

router.post('/parse', async (req, res) => {
  try {
    // Basic stub for parsing logic
    res.json({ message: "Parse endpoint hit", curriculum_id: "stub-id" });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

export default router;
