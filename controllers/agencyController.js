import express from 'express';
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Agency from '../models/Agency.js';

const addAgency = asyncHandler(async (req, res) => {
    const { name, address, email, phone } = req.body;
    try {
        let agency = await Agency.findOne({ name });
        if (agency) {
            return res.status(400).json({ msg: "L'agence existe déjà" });
        } else {
            agency = new Agency({
                name, address, email, phone
            })
        }
        await agency.save();
        res.send('Agence Enregistrée');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur Serveur');
    }
});

const getAgency = asyncHandler(async (req, res) => {
    const agence = await Agency.find({})
    if (agence) {
        res.send(agence)
    }
})

export { addAgency, getAgency }