import mongoose from 'mongoose';

const insuranceSchema = new mongoose.Schema({
    userId: { type: String},
    name: { type: String },
    spouseName: { type: String },
    motherName: { type: String },
    fatherName: { type: String },
    childName: { type: String },
    age: { type: String },
    location: { type: String },
    insured: { type: Boolean, default: false },
    spouseAge: { type: String },
    motherAge: { type: String },
    fatherAge: { type: String },
    childAge: { type: String },
    plan: { type: String }, // Monthly or Yearly plan title
    planType: { type: String }, // Monthly or Yearly
    planPrice: { type: Number },
    addOns: [{
        title: { type: String },
        price: { type: Number }
    }],
    totalPrice: { type: Number },
    country: { type: String },
    title: { type: String }, // Added title field
    price: { type: Number }, // Added price field
    value: { type: String },
    price2: { type: String }
}, { timestamps: true });

const insuranceModel = mongoose.models.insurance || mongoose.model('insurance', insuranceSchema);

export default insuranceModel;
