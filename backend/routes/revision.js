import express from 'express';
const router = express.Router();

router.post('/revision/generate', async (req, res) => {
  res.json({ questions: [] });
});

router.post('/revision/check-milestone', async (req, res) => {
  // Stub for check-milestone
  res.json({ success: true, message: "Milestone checked!" });
});

export default router;
