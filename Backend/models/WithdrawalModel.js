import mongoose from 'mongoose';

const WithdrawalSchema = new mongoose.Schema({
    fullName: { type: String },
    email: { type: String },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    zipCode: { type: String },
    bankName: { type: String },
    accountNumber: { type: String },
    amount: { type: Number },  // New field for amount
    remark: {type:String},
    expMonth: { type: String },
    expYear: { type: Number },
    cvv: { type: String },
});

export default mongoose.model('Withdrawal', WithdrawalSchema);
