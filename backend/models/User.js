import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, // UUID from frontend/auth
  name: { type: String, required: true },
  is_guest: { type: Boolean, default: false },
  created_at: { type: Date, default: Date.now }
});

export default mongoose.model('User', userSchema);
