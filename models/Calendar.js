import mongoose from 'mongoose';

const EventSchema = mongoose.Schema({
    start: Date,
    end: Date,
    title: String,
    nomprenom: String,
    phone: String
})

const event = mongoose.model('event', EventSchema)
export default event