import mongoose from 'mongoose';
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema({
    nom: {
        type: String,
        required: true
    },
    prenom: {
        type: String,
    },
    phone: {
        type: Number
    },
    adresse: {
        type: String
    },
    salaire: {
        type: Number
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    motdepasse: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
    }
})


UserSchema.pre('save', async function (next) {
    if (!this.isModified('motdepasse')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.motdepasse = await bcrypt.hash(this.motdepasse, salt)

})


const User = mongoose.model('user', UserSchema);
export default User;