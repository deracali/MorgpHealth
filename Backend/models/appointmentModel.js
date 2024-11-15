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
    hospitalName: { type: String, required: false },  // Hospital name (optional)
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
    drugName1: { type: String, required: false },
    dosage1: { type: String, required: false },
    frequency1: { type: String, required: false },
    period1: { type: String, required: false },
    drugName2: { type: String, required: false },
    dosage2: { type: String, required: false },
    frequency2: { type: String, required: false },
    period2: { type: String, required: false },
    drugName3: { type: String, required: false },
    dosage3: { type: String, required: false },
    frequency3: { type: String, required: false },
    period3: { type: String, required: false },
    drugName4: { type: String, required: false },
    dosage4: { type: String, required: false },
    frequency4: { type: String, required: false },
    period4: { type: String, required: false },
    isCompleted: { type: Boolean, required: false },
    timer: { type: Boolean, default: true },
    status: { type: String, default: 'pending' }
}, { timestamps: true }); // This adds createdAt and updatedAt

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default appointmentModel;
