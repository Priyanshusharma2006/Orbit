import mongoose from 'mongoose';

const moduleSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true },
  curriculum_id: { type: String, required: true },
  title: { type: String, required: true },
  position: { type: Number, required: true },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Module', moduleSchema);
