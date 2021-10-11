const express = require('express')

const router = express.Router()

const Room = require('../model/room.model')

// GET room all
router.get('/', async(req, res) => {

    const room = await Room.find({}).populate('clientId').populate('shopId')

    res.json(room)

})

// POST room
router.post('/', async(req, res) => {

    const room = await Room.create(req.body)

    res.json({
        msg: "Thanh Cong",
        room
    })

})

// DELETE room
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const room = await Room.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        room
    })

})

module.exports = router