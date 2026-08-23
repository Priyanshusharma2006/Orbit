import express from 'express';
const router = express.Router();

router.post('/revision/generate', async (req, res) => {
  res.json({ questions: [] });
});

export default router;
