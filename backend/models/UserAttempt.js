import mongoose from 'mongoose';

const userAttemptSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true },
  subtopic_id: { type: String, required: true },
  score: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('UserAttempt', userAttemptSchema);
