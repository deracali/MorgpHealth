import mongoose from 'mongoose';

const ReviewdoctorSchema = new mongoose.Schema({
    name: { type: String }, // Optional field
    email: { type: String, unique: true, required: true }, // Required
    password: { type: String, required: true }, // Required
    services: [
        {
            name: { type: String, required: true }, // Name of the service (e.g., "Headache", "Malaria")
            fee: { type: Number, required: true }, // Fee for the service
            time: { type: String, required: true }, // Time for the appointment
        },
    ],
    image: {
        type: String,
        default: 'https://example.com/placeholder-image.jpg' // Placeholder image
    }, // Optional field
    speciality: { type: String }, // Optional field
    degree: { type: String }, // Optional field
    experience: { type: String }, // Optional field
    gender: { type: String }, // Optional field
    about: { type: String }, // Optional field
    available: { type: Boolean, default: true },
    cancelled: { type: Boolean, default: false },
    fees: { type: Number }, // Optional field
    phone: { type: Number }, // Optional field
    balance: { type: Number, default: 0 }, // Optional field
    address: { type: Object }, // Optional field
    docaddress: { type: String },
    slots_booked: { type: Object }, // Optional field
    region: { type: String }, // Optional field
    age: { type: Date }, // Optional field
    universityName: { type: String }, // Optional field
    universityCountry: { type: String }, // Optional field
    medicalCouncilName: { type: String }, // Optional field
    medicalCouncilCountry: { type: String }, // Optional field
    graduationYear: { type: Number }, // Optional field
    medicalLicense: { type: String, default: 'https://example.com/placeholder-image.jpg' }, // Optional field
    diplomaCertificates: { type: String, default: 'https://example.com/placeholder-image.jpg' },
    proofOfID: { type: String, default: 'https://example.com/placeholder-image.jpg' },
    paymentMethods: [
        {
            method: { type: String, required: true }, // Name of the payment method (e.g., "PayPal", "Bank Transfer")
            details: {
                paypalEmail: { type: String }, // Optional for PayPal
                accountHolder: { type: String }, // Optional for bank accounts
                bankAccount: { type: String }, // Optional for bank accounts
                iban: { type: String } // Optional for international bank accounts
            }
        }
    ],
    hospital: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Hospital' // Reference to the hospital the doctor is associated with
    }
}, { timestamps: true });

const ReviewdocModel = mongoose.model('Reviewdoctor', ReviewdoctorSchema);

export default ReviewdocModel;
