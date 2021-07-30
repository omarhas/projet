import asyncHandler from 'express-async-handler'
import generateToken from '../utils/generateToken.js'
import User from '../models/User.js'
import bcrypt from 'bcryptjs'

const authUser = asyncHandler(async (req, res) => {
    const { email, motdepasse } = req.body
    const user = await User.findOne({ email })
    if (!user) {
        return res.status(400).json({ message: " Utilisateur n'existe pas " })
    }

    const isMatch = await bcrypt.compare(motdepasse, user.motdepasse);
    if (!isMatch) {
        return res.status(400).json({ message: 'Mot de passe incorrecte' })
    }
    if (user && isMatch) {
        res.json({
            _id: user._id,
            nom: user.nom,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(401).json({ message: 'email ou mot de passe incorrect' })
    }
})

const registerUser = asyncHandler(async (req, res) => {
    const { nom, prenom, phone, adresse, salaire, email, motdepasse, isAdmin } = req.body
    const userExists = await User.findOne({ email })
    if (userExists) {
        return res.status(400).json({ message: " Utilisateur existe déja" })
    }

    const user = await User.create({
        nom, prenom, phone, adresse, salaire, email, motdepasse, isAdmin
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            nom: user.nom,
            prenom: user.prenom,
            phone: user.phone,
            adresse: user.adresse,
            email: user.email,
            isAdmin: user.isAdmin,
            token: generateToken(user._id),
        })
    } else {
        res.status(400)
        throw new Error('Donnée invalides')
    }
})

const updateUserProfile = asyncHandler(async (req, res) => {
    const { nom, email, motdepasse } = req.body
    const user = await User.findById(req.params.id)
    if (user) {
        console.log("user", user)
        user.nom = nom || user.nom,
            user.email = email || user.email
        if (req.body.motdepasse) {
            user.motdepasse = motdepasse
        }

        const UpdatedUser = await user.save()
        console.log('up', UpdatedUser)
        res.json({
            _id: UpdatedUser._id,
            nom: UpdatedUser.nom,
            email: UpdatedUser.email,
            isAdmin: UpdatedUser.isAdmin,
            token: generateToken(UpdatedUser._id),
        })
    } else {
        res.status(404).json({ message: "Utilisateur n'existe pas" })
    }
})

const getUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)
    if (user) {
        res.json({
            _id: user._id,
            nom: user.nom,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404).json({ message: "Utilisateur 111 n'existe pas" })
    }
})

const deleteUser = asyncHandler(async (req, res) => {
    const findUser = await User.findByIdAndRemove(req.params.id);
    if (!findUser) {
        return res.status(404).send("l'Utilisateur n'existe pas");
    }
    return res.send('Utilisateur supprimé');
})

const getUsers = asyncHandler(async (req, res) => {
    const users = await User.find({});
    res.json(users)
})

export { authUser, registerUser, updateUserProfile, getUserProfile, deleteUser, getUsers }