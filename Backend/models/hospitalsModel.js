import mongoose from 'mongoose';

const { Schema, model } = mongoose;

// Define the staff schema as a subdocument within the hospital schema
const StaffSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    department: {
      type: String,
    },
    contactInfo: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Validates email format
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` for each staff member
  }
);

// Define the main hospital schema with staff field
const HospitalSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes extra whitespace
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Validates 10-digit phone numbers
        },
        message: (props) => `${props.value} is not a valid phone number!`,
      },
    },
    email: {
      type: String,
      validate: {
        validator: function (v) {
          return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v); // Validates email format
        },
        message: (props) => `${props.value} is not a valid email!`,
      },
    },
    services: {
      type: [String], // Array of strings representing services offered
      default: [],
    },
    staff: [StaffSchema], // Embedding the staff schema in the hospital schema
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Automatically add `createdAt` and `updatedAt` for the hospital
  }
);

// Export the hospital model with the name 'Hospital'
export default model('Hospital', HospitalSchema);
