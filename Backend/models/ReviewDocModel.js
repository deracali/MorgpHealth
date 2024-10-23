import mongoose from 'mongoose';

const ReviewdoctorSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    image: { type: String, required: true },
    speciality: { type: [String], required: true }, // Changed to an array of strings
    degree: { type: String, required: true },
    experience: { type: String, required: true },
    about: { type: String, required: true },
    available: { type: Boolean, default: true },
    fees: { type: Number, required: true },
    balance: { type: Number, required: true },
    address: { type: Object, required: true },
    date: { type: Number, required: true },
    slots_booked: { type: Object },

    // New fields added to the schema
    dateOfBirth: { type: Date, required: true }, // Date of birth
    universityName: { type: String, required: true }, // University name
    universityCountry: { type: String, required: true }, // University country
    medicalCouncilName: { type: String, required: true }, // Medical council name
    medicalCouncilCountry: { type: String, required: true }, // Medical council country
    graduationYear: { type: Number, required: true }, // Graduation year
    medicalLicense: { type: String, required: true }, // Path to uploaded medical license
    diplomaCertificates: { type: String, required: true }, // Path to uploaded diploma certificates
    proofOfID: { type: String, required: true } // Path to uploaded proof of ID
}, { minimize: false });

const ReviewdoctorModel = mongoose.models.doctor || mongoose.model('Reviewdoctor', ReviewdoctorSchema);

export default ReviewdoctorModel;
