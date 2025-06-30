
import mongoose from 'mongoose';

const ClientSchema = new mongoose.Schema({
  image: String,
  name: String,
  designation: String,
  description: String,
});

export default mongoose.models.Client || mongoose.model('Client', ClientSchema);
