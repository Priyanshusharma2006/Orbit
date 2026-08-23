import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './routes/users.js';
import curriculumRoutes from './routes/curriculum.js';
import parseRoutes from './routes/parse.js';
import teachingRoutes from './routes/teaching.js';
import attemptsRoutes from './routes/attempts.js';
import revisionRoutes from './routes/revision.js';
import chatRoutes from './routes/chat.js';
import cameraRoutes from './routes/camera.js';
import voiceRoutes from './routes/voice.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orbit';
mongoose.connect(MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use('/api', userRoutes);
app.use('/api', curriculumRoutes);
app.use('/api', parseRoutes);
app.use('/api', teachingRoutes);
app.use('/api', attemptsRoutes);
app.use('/api', revisionRoutes);
app.use('/api', chatRoutes);
app.use('/api', cameraRoutes);
app.use('/api', voiceRoutes);

// Fallback route to match original Python check route
app.get('/', (req, res) => {
    res.json({ status: "running fine test number - someting 2" });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
