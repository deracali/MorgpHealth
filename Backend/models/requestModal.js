import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema for User and Bot Input combined in one "Request" schema
const requestSchema = new Schema({
  username: {
    type: String,
    trim: true, // Trim whitespace
  },
  userEmail: {
    type: String,
    trim: true, // Trim whitespace
    lowercase: true, // Convert email to lowercase
    match: [/.+@.+\..+/, 'Please provide a valid email address'], // Email validation regex
  },
  userMessage: {
    type: String,
    trim: true, // Trim whitespace
  },
  botResponse: {
    type: String,
    trim: true, // Trim whitespace
  },
  timestamp: {
    type: Date,
    default: Date.now, // Default to current timestamp
  },
});

// Creating a model based on the schema
const Request = mongoose.model('Request', requestSchema);

export default Request;
