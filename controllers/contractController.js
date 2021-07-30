import express from 'express';
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Contract from '../models/Contract.js';

const addContract = asyncHandler(async (req, res) => {
    const { firstdriver, seconddriver, voiture, price, priceperday, bond, datedebut, datefin } = req.body;
    const contract = new Contract({
        firstdriver, seconddriver, voiture, price, priceperday, bond, datedebut, datefin
    })
    const createdContract = await contract.save();
    res.json({ msg: "Contrat ajouté" });
});

const getContract = asyncHandler(async (req, res) => {
    try {
        const allContracts = await Contract.find({});
        res.send(allContracts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
})

const deleteContract = asyncHandler(async (req, res) => {
    const findContract = await Contract.findByIdAndRemove(req.params.id)
    if (!findContract) {
        return res.status(404).send("le contrat n'existe pas");
    }
    return res.send('Contrat supprimé');
})

const getMontant = asyncHandler(async (req, res) => {
    try {
        const contracts = await Contract.find({})
        var montant = null
        for (var i = 0; i < contracts.length; i++) {
            montant += contracts[i].price
        }
        res.json({ montant })
    } catch (error) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
})

const getCalendardates = asyncHandler(async (req, res) => {
    try {
        const allContracts = await Contract.find({});
        // console.log('dddd', allContracts)
        // const forcalendar = () => {
        //     var data = {
        //         datedeb: '',
        //         datefn: ''
        //     };
        // for (var i = 0; i < allContracts.length; i++) {
        var i = 0;
        do {
            console.log('hhhh', allContracts.length)
            i++

        }
        while (i < allContracts.length)
        // if (allContracts[i].datefin != '') {
        //     data.datedeb = allContracts[i].datedebut
        //     console.log('debut', data.datedeb)
        // }
        // if (allContracts[i].datedebut != '') {
        //     data.datefn = allContracts[i].datefin
        //     console.log('fin', data.datefn)
        // }
        // }
        //     return {
        //         data
        //     }
        // }
        // res.send(forcalendar())
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
})

export { addContract, getContract, deleteContract, getMontant, getCalendardates }