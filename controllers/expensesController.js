import express from 'express'
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Expenses from '../models/Expenses.js';
import auth from '../middleware/auth.js';
import Admin from '../middleware/admin.js';

const addExpense = asyncHandler(async (req, res) => {
    const { type, montant } = req.body;
    try {
        const expenses = new Expenses({
            type, montant
        })
        await expenses.save();
        res.send('Dépense ajoutée');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur Serveur');
    }
});

const getExpenses = asyncHandler(async (req, res) => {
    try {
        const AllExpenses = await Expenses.find({});
        res.send(AllExpenses);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
})

const getExp = asyncHandler(async (req, res) => {
    try {
        const AllExpenses = await Expenses.find({});
        console.log('cccc', Expenses.length)

        const forchart = () => {
            var data = {
                Bureau: 0,
                Leasing: 0,
                Salaires: 0,
                Maintenance: 0,
                Autres: 0,
                all: 0,
            };
            var i;
            for (i = 0; i < AllExpenses.length; i++) {
                if (AllExpenses[i].type === 'bureau') {
                    data.Bureau += AllExpenses[i].montant
                } else if (AllExpenses[i].type === 'leasing') {
                    data.Leasing += AllExpenses[i].montant
                } else if (AllExpenses[i].type === 'salaires') {
                    data.Salaires += AllExpenses[i].montant
                } else if (AllExpenses[i].type === 'maintenance') {
                    data.Maintenance += AllExpenses[i].montant
                } else {
                    data.Autres += AllExpenses[i].montant
                }
            }
            data.all = data.Bureau + data.Leasing + data.Salaires + data.Maintenance + data.Autres
            return {
                data
            }
        }
        res.send(forchart())

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
})

const updateExpense = asyncHandler(async (req, res) => {
    const { type, montant } = req.body
    const expenses = await Expenses.findById(req.params.id)
    if (expenses) {
        expenses.type = type || expenses.type,
            expenses.montant = montant || expenses.montant
        const UpdatedExpense = await expenses.save()

        res.json({
            id: UpdatedExpense.id,
            type: UpdatedExpense.type,
            montant: UpdatedExpense.montant
        })
    } else {
        res.status(404).json({ message: "Dépense n'existe pas" })
    }
})


const deleteExpense = asyncHandler(async (req, res) => {
    const findExpense = await Expenses.findByIdAndRemove(req.params.id);
    if (!findExpense) {
        return res.status(404).send("la dépense n'existe pas");
    }
    return res.send('dépense supprimé');
})


export { addExpense, getExpenses, updateExpense, deleteExpense, getExp }