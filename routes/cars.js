const router = express.Router();
import express from 'express'
import { addCar, deleteCar, updateCar, getCar, countCar, carstat } from '../controllers/carController.js'

router.post('/', addCar)
router.delete('/:id', deleteCar)
router.put('/:id', updateCar)
router.get('/', getCar)
router.get('/', countCar)
router.get('/stat', carstat)
export default router;