import express from 'express';
const router = express.Router();

router.post('/camera/process', async (req, res) => {
  res.json({ status: "processed" });
});

export default router;
