
import mongoose from 'mongoose';

const SubscriberSchema = new mongoose.Schema({
  email: String,
});

export default mongoose.models.Subscriber || mongoose.model('Subscriber', SubscriberSchema);
