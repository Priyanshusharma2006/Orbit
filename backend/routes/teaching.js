import express from 'express';
import Subtopic from '../models/Subtopic.js';
import Module from '../models/Module.js';
import { generateStructuredContent, teachingBlocksSchema } from '../services/gemini_service.js';

const router = express.Router();

router.get('/teaching/:subtopicId', async (req, res) => {
  try {
    const subtopicId = req.params.subtopicId;
    
    const subtopic = await Subtopic.findOne({ id: subtopicId });
    if (!subtopic) return res.status(404).json({ detail: "Subtopic not found" });

    const mod = await Module.findOne({ id: subtopic.module_id });
    const curriculumId = mod ? mod.curriculum_id : null;

    const prompt = `You are an expert tutor designing an interactive lesson for a student.
Based on the following subtopic content, create an engaging lesson consisting of a sequence of teaching blocks.
Use a mix of paragraphs, insights, lists, and at least one interactive question (mcq or fill_in_blank) to test their understanding.
Make the tone encouraging and clear.

Subtopic Title: ${subtopic.title}

Subtopic Content:
${subtopic.content}
`;

    const data = await generateStructuredContent(prompt, teachingBlocksSchema);

    res.json({ blocks: data.blocks, cached: false, curriculum_id: curriculumId });
  } catch (error) {
    console.error("Teaching Error:", error);
    res.status(500).json({ detail: error.message });
  }
});

router.post('/teaching/ask', async (req, res) => {
  res.json({ answer: "This is a stub teaching answer from the Node backend." });
});

export default router;
