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
    imgSignature: { type: String },
    cancelled: { type: Boolean, required: false },
    payment: { type: Boolean, required: false },
    testResult: { type: String, required: false },
    hospitalName: { type: String, required: false },
    age: { type: String, required: false },
    sex: { type: String, required: false },
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
}, { timestamps: true }); // This adds createdAt and updatedAt

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema);
export default appointmentModel;
