import mongoose from 'mongoose';

const subtopicSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  module_id: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  score: { type: Number, default: 0 },
  position: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Subtopic', subtopicSchema);
