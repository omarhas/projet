const router = express.Router();
import express from 'express'
import { addEvent, getEvent } from '../controllers/calendarController.js'

router.post('/', addEvent)
router.get('/', getEvent)

export default router