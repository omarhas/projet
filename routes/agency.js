const router = express.Router();
import express from 'express'
import { addAgency, getAgency } from '../controllers/agencyController.js'

router.post('/', addAgency)
router.get('/', getAgency)

export default router;