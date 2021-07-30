import mongoose from 'mongoose';

const ExpensesSchema = mongoose.Schema({
    montant: {
        type: Number
    },
    type: {
        type: String
    }
}, {
    timestamps: true
})

const expenses = mongoose.model('expenses', ExpensesSchema);
export default expenses;