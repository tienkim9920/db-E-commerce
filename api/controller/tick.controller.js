const express = require('express')

const router = express.Router()

const Tick = require('../model/tick.model')

// GET tick all
router.get('/', async(req, res) => {

    const tick = await Tick.find({})

    res.json(tick)

})

// POST tick
router.post('/', async(req, res) => {

    const tick = await Tick.create(req.body)

    res.json({
        msg: "Thanh Cong",
        tick
    })

})

// DELETE tick
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const tick = await Tick.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        tick
    })

})

// GET detail Tick
router.get('/:id', async (req, res) => {

    const { id } = req.params

    const tick = await Tick.findOne({ _id: id })

    res.json(tick)

})

module.exports = router