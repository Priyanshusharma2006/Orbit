import express from 'express';
const router = express.Router();

router.post('/teaching/ask', async (req, res) => {
  res.json({ answer: "This is a stub teaching answer from the Node backend." });
});

export default router;
