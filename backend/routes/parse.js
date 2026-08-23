import express from 'express';
import multer from 'multer';
import crypto from 'crypto';
import Curriculum from '../models/Curriculum.js';
import Module from '../models/Module.js';
import Subtopic from '../models/Subtopic.js';
import { generateContent, generateStructuredContent } from '../services/gemini_service.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

import officeParser from 'officeparser';
import fs from 'fs';
import { curriculumSchema } from '../services/gemini_service.js';

router.post('/parse', upload.array('files'), async (req, res) => {
  try {
    const userId = req.headers['x-user-id'] || req.body.user_id || 'guest';
    
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ detail: "No files uploaded" });
    }

    let extractedText = '';
    for (const file of req.files) {
      try {
        const text = await officeParser.parseOfficeAsync(file.path);
        extractedText += text + '\n\n';
      } catch (err) {
        console.error("Error parsing file:", err);
      }
      // Clean up uploaded file
      fs.unlinkSync(file.path);
    }

    if (!extractedText.trim()) {
      return res.status(400).json({ detail: "Could not extract any text from the uploaded files." });
    }

    // Call Gemini to generate the curriculum structure
    const prompt = `You are an expert curriculum designer. Based on the following raw text extracted from a user's uploaded document, create a comprehensive and logical study curriculum. 
Break the content down into 2-5 major modules.
For each module, break it down into 2-5 subtopics (lessons).
For each subtopic, provide the complete, detailed raw text content that belongs to that subtopic. DO NOT summarize the content too much; we need the full details so the student can learn from it.

Raw Document Text:
${extractedText.substring(0, 500000)} // Limit to roughly 500k chars for safety
`;

    const curriculumData = await generateStructuredContent(prompt, curriculumSchema);

    // Save Curriculum
    const curriculumId = crypto.randomUUID();
    const curriculum = new Curriculum({
      id: curriculumId,
      user_id: userId,
      title: curriculumData.title || "Extracted Study Plan",
      is_pinned: false,
      is_archived: false
    });
    await curriculum.save();

    // Save Modules & Subtopics
    for (let mIndex = 0; mIndex < curriculumData.modules.length; mIndex++) {
      const mData = curriculumData.modules[mIndex];
      const moduleId = crypto.randomUUID();
      
      const mod = new Module({
        id: moduleId,
        curriculum_id: curriculumId,
        title: mData.title,
        position: mIndex + 1
      });
      await mod.save();

      for (let sIndex = 0; sIndex < mData.subtopics.length; sIndex++) {
        const sData = mData.subtopics[sIndex];
        const subtopic = new Subtopic({
          id: crypto.randomUUID(),
          module_id: moduleId,
          title: sData.title,
          content: sData.content,
          position: sIndex + 1,
          score: 0
        });
        await subtopic.save();
      }
    }

    res.json({ message: "Files parsed successfully", curriculum_id: curriculumId });
  } catch (error) {
    console.error("Parse Error:", error);
    res.status(500).json({ detail: error.message });
  }
});

export default router;
