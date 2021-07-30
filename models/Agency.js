import mongoose from 'mongoose'

const AgencySchema = mongoose.Schema({
    name: {
        type: String
    },
    address: {
        type: String
    },
    email: {
        type: String
    },
    phone: {
        type: Number
    }
})

const agency = mongoose.model('agency', AgencySchema);
export default agency