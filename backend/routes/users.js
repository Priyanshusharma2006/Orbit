import express from 'express';
import User from '../models/User.js';
import UserAttempt from '../models/UserAttempt.js';
import Subtopic from '../models/Subtopic.js';

const router = express.Router();

router.post('/users', async (req, res) => {
  try {
    const { id, name, is_guest } = req.body;
    let user = await User.findOne({ id });
    
    if (user) {
      return res.json({ message: "User already exists", id: user.id });
    }
    
    user = new User({ id, name, is_guest });
    await user.save();
    
    res.json({ message: "User created successfully", id: user.id, name: user.name });
  } catch (error) {
    console.error("Create user error:", error);
    res.status(500).json({ detail: error.message });
  }
});

router.get('/users/:user_id/stats', async (req, res) => {
  try {
    const { user_id } = req.params;
    
    // Lessons completed (score >= 70)
    const completedAttempts = await UserAttempt.find({ user_id, score: { $gte: 70 } }).distinct('subtopic_id');
    const completed = completedAttempts.length;
    
    const total = await Subtopic.countDocuments();
    
    // Practice Score
    const attempts = await UserAttempt.find({ user_id });
    const avg_score = attempts.length > 0 
      ? Math.floor(attempts.reduce((acc, curr) => acc + curr.score, 0) / attempts.length)
      : 0;
      
    // Streak (Simplified)
    let streak = 0;
    if (attempts.length > 0) {
      // Very basic streak logic
      streak = 1; 
    }
    
    const remaining = Math.max(0, total - completed);
    const minutes_left = remaining * 15;
    const hours = Math.floor(minutes_left / 60);
    const mins = minutes_left % 60;
    
    const time_left = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
    
    res.json({
      streak,
      lessonsCompleted: completed,
      totalLessons: total,
      practiceScore: avg_score,
      estimatedTimeLeft: time_left
    });
  } catch (error) {
    console.error("Stats Error:", error);
    res.status(500).json({ detail: error.message });
  }
});

export default router;
