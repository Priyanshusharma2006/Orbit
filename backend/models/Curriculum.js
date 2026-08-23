import mongoose from 'mongoose';

const curriculumSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID
  user_id: { type: String, required: true },
  title: { type: String, required: true },
  is_pinned: { type: Boolean, default: false },
  is_archived: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('Curriculum', curriculumSchema);
