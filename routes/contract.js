const router = express.Router();
import express from 'express'
import { addContract, deleteContract, getCalendardates, getContract, getMontant } from '../controllers/contractController.js'

router.post('/', addContract)
router.get('/', getContract)
router.get('/montant', getMontant)
router.delete('/:id', deleteContract)
router.get('/calendardates', getCalendardates)

export default router;