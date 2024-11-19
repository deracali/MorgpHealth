import mongoose from 'mongoose';

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    docId: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    userData: { type: Object, required: true },
    docData: { type: Object, required: true },
    amount: { type: Number, required: true },
    date: { type: Number },
    cancelled: { type: Boolean, required: false },
    payment: { type: Boolean, required: false },
    testResult: { type: String, required: false },
   
    labTestName: { type: String, required: false },    // Name of the lab test
    labTestResult1: { type: String, required: false },  // Result of the lab test (e.g., Positive/Negative)
    labTestResult2: { type: String, required: false },  // Result of the lab test (e.g., Positive/Negative)
    labTestResult3: { type: String, required: false },  // Result of the lab test (e.g., Positive/Negative)
    labTestResult4: { type: String, required: false },  // Result of the lab test (e.g., Positive/Negative)
    labTestResult5: { type: String, required: false },  // Result of the lab test (e.g., Positive/Negative)
    labTestDate: { type: String, required: false },    // Date when the test was performed
    labTestDetails: { type: String, required: false }, // Additional details about the lab test
    age: { type: String, required: false },
    sex: { type: String, required: false },
    meetingStart: { type: Date, required: false },      // Start time of the meeting
    meetingEnd: { type: Date, required: false },        // End time of the meeting
    meetingDuration: { type: Number, required: false }, // Duration in seconds
    callDuration: { type: Number, required: false },    // Call duration in seconds
    isCompleted: { type: Boolean, required: false },
    timer: { type: Boolean, default: true },
    status: { type: String, default: 'pending' },
    patientName: { type: String, required: false },
  patientAddress: { type: String, required: false },
  patientAge: { type: Number, required: false },
  date: { type: Date, required: false },
  medicines: [
    {
      name: { type: String, required: false },
      dosage: { type: String, required: false },
      frequency: { type: String, required: false },
    },
  ],
 
  hospitalName: { type: String, required: false },
}, { timestamps: true }); // This adds createdAt and updatedAt

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default appointmentModel;
