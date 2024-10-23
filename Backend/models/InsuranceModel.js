import mongoose from 'mongoose'

const insuranceSchema = new mongoose.Schema({
    name: { type: String },
    userId: { type: String },
    spouseName: { type: String },
    motherName: { type: String },
    fatherName: { type: String },
    childName: { type: String },
    age: { type: String },
    insured: { type: Boolean, default: false },
    spouseAge: { type: String },
    motherAge: { type: String },
    fatherAge: { type: String },
    childAge: { type: String },
    location: { type: String },
    country: { type: String },
    title: { type: String }, // Added title field
    price: { type: Number }, // Added price field
    value: { type: String },
    price2: { type: String }
}, { timestamps: true })

const insuranceModel = mongoose.models.user || mongoose.model('insurance', insuranceSchema)

export default insuranceModel