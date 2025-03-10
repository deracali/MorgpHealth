import mongoose from 'mongoose';

const doctorSchema = new mongoose.Schema({
    name: { type: String }, // Optional field
    phone: { type: Number }, // Optional field
    email: { type: String, unique: true, required: true }, // Required
    password: { type: String, required: true }, // Required
    pin: { type: String, required: true },
   services: [
    {
        name: { type: String, required: true }, // Name of the service (e.g., "Headache", "Malaria")
        fee: { type: Number, required: true }, // Fee for the service
        time: { type: String, required: true }, // Time for the appointment
        category: { type: String, required: true }, // Category for the service (e.g., "Family Medicine")
    },
],
    image: {
        type: String,
        default: 'https://example.com/placeholder-image.jpg' // Placeholder image
    }, // Optional field
    availability: {
        Monday: { active: { type: Boolean, default: false }, hours: [{ start: String, end: String }] },
        Tuesday: { active: { type: Boolean, default: false }, hours: [{ start: String, end: String }] },
        Wednesday: { active: { type: Boolean, default: false }, hours: [{ start: String, end: String }] },
        Thursday: { active: { type: Boolean, default: false }, hours: [{ start: String, end: String }] },
        Friday: { active: { type: Boolean, default: false }, hours: [{ start: String, end: String }] },
        Saturday: { active: { type: Boolean, default: false }, hours: [{ start: String, end: String }] },
        Sunday: { active: { type: Boolean, default: false }, hours: [{ start: String, end: String }] },
    },
    speciality: { type: String }, // Optional field
    degree: { type: String }, // Optional field
    experience: { type: String }, // Optional field
    gender: { type: String }, // Optional field
    about: { type: String }, // Optional field
    available: { type: Boolean, default: true },
    timer: { type: Boolean, default: true },
    fees: { type: Number }, // Optional field
    balance: { type: Number, default: 0 },
    balanceHistory: [
        {
            amount: { type: Number },
            type: { type: String, enum: ['added', 'withdrawn'] },
            date: { type: Date, default: Date.now }, // Optional: to track the date of each transaction
        },
    ],
    address: { type: Object }, // Optional field
    docaddress: { type: String },
    slots_booked: { type: Object }, // Optional field
    region: { type: String }, // Optional field
    age: { type: Number }, // Optional field
    universityName: { type: String }, // Optional field
    universityCountry: { type: String }, // Optional field
    medicalCouncilName: { type: String }, // Optional field
    medicalCouncilCountry: { type: String }, // Optional field
    graduationYear: { type: Number }, // Optional field
    medicalLicense: { type: String, default: 'https://example.com/placeholder-image.jpg' }, // Optional field
    diplomaCertificates: { type: String, default: 'https://example.com/placeholder-image.jpg' },
    proofOfID: { type: String, default: 'https://example.com/placeholder-image.jpg' },
    reviews: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User',  // Reference to the User model
                required: false
            },
            userName: { type: String, required: false }, // User's name is optional
            userEmail: { type: String, required: false }, // User's email is optional
            rating: { type: Number, required: false, min: 1, max: 5 },
            reviewText: { type: String, required: false }, // Review text is optional
            reviewDate: { type: Date, default: Date.now }
        }
    ],
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // Track which users have liked this doctor
    likeCount: { type: Number, default: 0 }, // Total count of likes (for efficiency)
    passwordResetOtp: {
        type: String, // OTP will be a string (it can contain numbers, but we store it as a string for simplicity)
        required: false, // Optional initially, as it will be set after a user requests to reset password
    },
    otpExpiration: {
        type: Date, // Expiration time for OTP, which is a date value
        required: false, // Optional initially, as it will be set when OTP is generated
    },
    paymentMethods: [
        {
            method: { type: String, required: true }, // Name of the payment method (e.g., "PayPal", "Bank Transfer")
            details: {
                bankName:{type:String},
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
}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model('doctor', doctorSchema);

export default doctorModel;
