import express from 'express';
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Cars from '../models/Cars.js';
import auth from '../middleware/auth.js'
import Admin from '../middleware/admin.js'

const getCar = asyncHandler(async (req, res) => {
    try {
        const FindCars = await Cars.find({});
        res.send(FindCars);
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }
})

//@route     POST api/cars
//@desc      Add new car
//@access    Public 
const addCar = asyncHandler(async (req, res) => {
    const { modele, matricule, chassis, status } = req.body;
    try {
        let cars = await Cars.findOne({ matricule });
        if (cars) {
            return res.send('Voiture déja existe');
        } else {
            cars = new Cars({
                modele,
                matricule,
                chassis,
                status
            })
        }
        await cars.save();
        res.send('Voiture ajoutée');
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Erreur Serveur');
    }
});

//@route     PUT api/cars/:id
//@desc      Update car
//@access    Private 
const updateCar = asyncHandler(async (req, res) => {
    const { modele, matricule, chassis, status } = req.body
    const car = await Cars.findById(req.params.id)
    if (car) {
        car.modele = modele || car.modele,
            car.matricule = matricule || car.matricule,
            car.chassis = chassis || car.chassis,
            car.status = status || car.status

        const updatedCar = await car.save()

        res.json({
            id: updatedCar.id,
            status: updatedCar.status,
            modele: updatedCar.modele,
            matricule: updatedCar.matricule,
            chassis: updatedCar.chassis
        })
    } else {
        res.status(404).json({ message: "Voiture n'existe pas" })
    }
});

const deleteCar = asyncHandler(async (req, res) => {
    const DeleteCar = await Cars.findByIdAndRemove(req.params.id);
    if (!DeleteCar) {
        return res.status(404).send("voiture n'existe pas");
    }
    return res.send('voiture supprimé')
});

const countCar = asyncHandler(async (req, res) => {
    const nb = await Cars.length;
    res.send(nb)
})

const carstat = asyncHandler(async (req, res) => {
    try {
        const car = await Cars.find({})
        const forchart = () => {
            var data = {
                louee: 0,
                disponible: 0,
                reservee: 0,
                enpanne: 0,
            };
            var i;
            for (i = 0; i < car.length; i++) {
                if (car[i].status === 'en panne') {
                    data.enpanne++
                } else if (car[i].status === 'disponible') {
                    data.disponible++
                } else if (car[i].status === 'reservée') {
                    data.reservee++
                } else if (car[i].status === 'louée') {
                    data.louee++
                }
            }
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

export { addCar, deleteCar, updateCar, getCar, countCar, carstat }