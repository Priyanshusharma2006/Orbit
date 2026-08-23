import mongoose from 'mongoose';
import Curriculum from './backend/models/Curriculum.js';
import Module from './backend/models/Module.js';
import Subtopic from './backend/models/Subtopic.js';

async function check() {
  await mongoose.connect('mongodb://127.0.0.1:27017/orbit');
  console.log("Curriculums:", await Curriculum.find({}));
  console.log("Modules:", await Module.find({}));
  console.log("Subtopics:", await Subtopic.find({}));
  process.exit(0);
}
check().catch(console.error);
