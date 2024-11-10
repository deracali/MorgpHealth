import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

// Staff Schema
const staffSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  admin:{
    type:Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  lastLogin: {
    type: Date,
    default: Date.now,
  },
  onlineDuration: {
    type: Number, // Duration in seconds
    default: 0,
  },
  // Add any other staff details here (e.g., position, role)
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Hash the password before saving
staffSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next(); // Only hash if password is modified or new
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare passwords
staffSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create Staff Model
const Staff = mongoose.model('Staff', staffSchema);

export default Staff;
