import mongoose from 'mongoose'

const insuranceSchema = new mongoose.Schema({
    name: {type: String, required:true},
    userId: {type: String, required:true},
    spouseName: {type: String},
    motherName: {type: String},
    fatherName: {type: String},
    childName: {type: String},
    age: {type: String, required:true},
    spouseAge: {type: String},
    motherAge: {type: String},
    fatherAge: {type: String},
    childAge: {type: String},
    location: {type: String, required:true},
    premiumCover: {type: Boolean, default:false},
    goldCover: {type: Boolean, default:false},
    platinumCover: {type: Boolean, default:false},
    country: {type: String, required:true},
}, { timestamps: true })

const insuranceModel = mongoose.models.user || mongoose.model('insurance', insuranceSchema)

export default insuranceModel