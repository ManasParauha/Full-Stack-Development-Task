
import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  image: String,
  name: String,
  description: String,
});

export default mongoose.models.Project || mongoose.model('Project', ProjectSchema);

