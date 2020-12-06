const express = require('express');
const monk = require('monk'); // to connect with mongo
const joi = require('@hapi/joi'); // schema validation
const db = monk(process.env.MONGO_URI);
const collectionAppointment = db.get('appointments');

const schema = joi.object({
    name: joi.string().trim().required(),
    phoneNumber: joi.number().required(),
    slot: joi.string().trim().required(),
    date: joi.string().trim().required(),
    gender: joi.string().trim().required(),
    age: joi.number().required(),
    fromTime: joi.number().required(),
    toTime: joi.number().required()
})
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const items = await collectionAppointment.find({});
        res.json({ data: items })
    } catch (error) {
        res.json({ error: error });
    }
});

router.get('/:date', async (req, res) => {
    try {
        const filterDate = req.params.date;
        const items = await collectionAppointment.find({ date: filterDate });
        if (items) {
            res.json({ data: items })
        } else {
            res.json({ data: [] })
        }
    } catch (error) {
        res.json({ error: error });
    }
});

router.post('/appointment', async (req, res) => {
    try {
        const value = await schema.validateAsync(req.body);
        const inserted = await collectionAppointment.insert(value);
        if(inserted) {
            res.json({id: inserted._id});
        }
    } catch (error) {
        res.json({ error: error });
    }
});

module.exports = router;