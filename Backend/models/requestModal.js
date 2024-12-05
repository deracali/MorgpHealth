import mongoose from 'mongoose';
const { Schema } = mongoose;

// Schema for User and Bot Input combined in one "Request" schema

const requestSchema = new Schema({
    username: {
      type: String,
      trim: true, // Trim whitespace
      required: true, // Username is required
    },
    userEmail: {
      type: String,
      trim: true, // Trim whitespace
      lowercase: true, // Convert email to lowercase
      match: [/.+@.+\..+/, 'Please provide a valid email address'], // Email validation regex
      required: true, // User email is required
    },
    chatMessages: {
      type: [messageSchema], // Array of message objects
      required: true, // Chat messages are required
    },
    createdAt: {
      type: Date,
      default: Date.now, // Default to the current timestamp
    },
  });

// Creating a model based on the schema
const Request = mongoose.model('Request', requestSchema);

export default Request;
