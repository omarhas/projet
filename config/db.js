import mongoose from 'mongoose'

const connectDB = () => {
    mongoose.connect('mongodb://localhost/DigiRentDB', { useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false, useUnifiedTopology: true });
    mongoose.connection.once('open', function () {
        console.log('MongoDB connected');
    }).on('error', function (error) {
        console.log('error is', error)
    })
}

export default connectDB;