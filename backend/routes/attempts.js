import express from 'express';
import UserAttempt from '../models/UserAttempt.js';

const router = express.Router();

router.post('/attempts', async (req, res) => {
  try {
    const { user_id, subtopic_id, score } = req.body;
    const attempt = new UserAttempt({
      id: crypto.randomUUID(),
      user_id,
      subtopic_id,
      score
    });
    await attempt.save();
    res.json({ message: "Attempt recorded" });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

export default router;
