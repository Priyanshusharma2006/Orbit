import express from 'express';
import UserAttempt from '../models/UserAttempt.js';

const router = express.Router();

import Subtopic from '../models/Subtopic.js';

router.post('/attempts/score', async (req, res) => {
  try {
    const { user_id, subtopic_id, score, final_score } = req.body;
    const actualScore = final_score !== undefined ? final_score : score;
    
    // Save the attempt record
    const attempt = new UserAttempt({
      id: crypto.randomUUID(),
      user_id,
      subtopic_id,
      score: actualScore
    });
    await attempt.save();

    // Update the subtopic's score and mark it as completed
    await Subtopic.findOneAndUpdate(
      { id: subtopic_id },
      { $set: { score: actualScore, status: 'completed' } },
      { new: true }
    );

    res.json({ message: "Attempt recorded and subtopic completed" });
  } catch (error) {
    res.status(500).json({ detail: error.message });
  }
});

export default router;
