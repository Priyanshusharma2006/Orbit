import express from 'express';
import Curriculum from '../models/Curriculum.js';
import Module from '../models/Module.js';
import Subtopic from '../models/Subtopic.js';

const router = express.Router();

router.get('/curriculums/:user_id', async (req, res) => {
  try {
    const curriculums = await Curriculum.find({ user_id: req.params.user_id }).sort({ created_at: -1 });
    res.json(curriculums);
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

router.get('/curriculum/:curriculum_id', async (req, res) => {
  try {
    const curriculum = await Curriculum.findOne({ id: req.params.curriculum_id });
    if (!curriculum) return res.status(404).json({ detail: "Not found" });
    
    const modules = await Module.find({ curriculum_id: curriculum.id }).sort({ position: 1 });
    
    // Group subtopics by module
    const allModules = await Promise.all(modules.map(async (mod) => {
      const subtopics = await Subtopic.find({ module_id: mod.id }).sort({ position: 1 });
      return {
        id: mod.id,
        title: mod.title,
        position: mod.position,
        subtopics: subtopics
      };
    }));
    
    res.json({
      ...curriculum.toObject(),
      modules: allModules
    });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

router.delete('/curriculum/:curriculum_id', async (req, res) => {
  try {
    await Curriculum.deleteOne({ id: req.params.curriculum_id });
    // Should also delete associated modules and subtopics, but keeping simple for now
    res.json({ message: "Deleted successfully" });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

export default router;
