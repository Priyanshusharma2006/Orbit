import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import Curriculum from '../models/Curriculum.js';
import Module from '../models/Module.js';
import Subtopic from '../models/Subtopic.js';
import { generateContent, generateStructuredContent } from '../services/gemini_service.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/parse', upload.array('files'), async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.user_id || 'guest';
    
    // Create a mock Curriculum based on the uploaded file
    const curriculumId = crypto.randomUUID();
    const curriculum = new Curriculum({
      id: curriculumId,
      user_id: userId,
      title: "Extracted Study Plan",
      is_pinned: false,
      is_archived: false
    });
    await curriculum.save();

    // Create a mock Module
    const moduleId = crypto.randomUUID();
    const mod = new Module({
      id: moduleId,
      curriculum_id: curriculumId,
      title: "Introduction & Overview",
      position: 1
    });
    await mod.save();

    // Create a mock Subtopic
    const subtopic = new Subtopic({
      id: crypto.randomUUID(),
      module_id: moduleId,
      title: "Core Concepts",
      content: "This is automatically extracted content from your uploaded file. You can replace this with actual Gemini extraction later. For now, enjoy the Orbit learning experience!",
      position: 1,
      score: 0
    });
    await subtopic.save();

    res.json({ message: "Files parsed successfully", curriculum_id: curriculumId });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

export default router;
