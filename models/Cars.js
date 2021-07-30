import mongoose from 'mongoose';

const CarsSchema = mongoose.Schema({
    modele: {
        type: String,
        required: true
    },
    matricule: {
        type: String,
        required: true
    },
    chassis: {
        type: String,
        required: true
    },
    status: {
        type: String
    }
}, {
    timestamps: true
})
const cars = mongoose.model('cars', CarsSchema);
export default cars