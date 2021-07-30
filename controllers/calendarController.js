import express from 'express';
import asyncHandler from 'express-async-handler'
const router = express.Router();
import Event from '../models/Calendar.js'
import moment from 'moment'

const addEvent = asyncHandler(async (req, res) => {
    const event = Event(req.body)
    await event.save()
    res.sendStatus(201)
})

const getEvent = asyncHandler(async (req, res) => {
    try {
        const events = await Event.find({
            // start: { $gte: moment(req.query.start).toDate() },
            // end: { $lte: moment(req.query.end).toDate() },
        })
        res.send(events)
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Erreur Serveur");
    }


})

export { addEvent, getEvent }