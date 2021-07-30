import express from 'express';
import asyncHandler from 'express-async-handler';
const router = express.Router();
import Equipe from '../models/User.js'

router.get('/', asyncHandler(async (req, res) => {
    const equipes = await Equipe.find({});
    res.json(equipes)
}));

router.get('/:id', asyncHandler(async (req, res) => {
    const equipes = await Equipe.find({ _id: req.params.id })
    if (equipes) {
        res.json(equipes)
    } else {
        res.status(404).json({ message: "Utilisateur n'existe pas" })
    }
}))

export default router