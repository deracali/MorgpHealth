import mongoose from 'mongoose';

const WithdrawalSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    bankName: { type: String, required: true },
    accountNumber: { type: String, required: true },
    amount: { type: Number, required: true },  // New field for amount
    expMonth: { type: String, required: true },
    expYear: { type: Number, required: true },
    cvv: { type: String, required: true },
});

export default mongoose.model('Withdrawal', WithdrawalSchema);
