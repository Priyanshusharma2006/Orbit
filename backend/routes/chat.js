import express from 'express';
const router = express.Router();

router.post('/chat/send', async (req, res) => {
  res.json({ reply: "Chat stub response" });
});

export default router;
