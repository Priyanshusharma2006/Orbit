import express from 'express';
const router = express.Router();

router.post('/voice/transcribe', async (req, res) => {
  res.json({ text: "Voice transcribed stub" });
});

export default router;
