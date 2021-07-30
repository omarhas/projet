import mongoose from 'mongoose'

const driverSchema = mongoose.Schema({
    name: { type: String },
    permis: { type: String },
    cin: { type: String },
    dateemission: { type: Date }
})
const carSchema = mongoose.Schema({
    modele: { type: String },
    matricule: { type: String },
    chassis: { type: String }
})

const ContractSchema = mongoose.Schema({
    firstdriver: [driverSchema],
    seconddriver: [driverSchema],
    voiture: [carSchema],
    price: {
        type: Number
    },
    priceperday: {
        type: Number
    },
    bond: {
        type: Number
    },
    datedebut: {
        type: Date
    },
    datefin: {
        type: Date
    }
}, {
    timestamps: true
})

const contract = mongoose.model('contract', ContractSchema);
export default contract