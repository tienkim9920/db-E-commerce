const express = require('express')

const router = express.Router()

const Room = require('../model/room.model')

// GET room all
router.get('/', async (req, res) => {
    
    const room = await Room.find({})

    res.json(room)

})

// POST room
router.post('/', async (req, res) => {

    const room = await Room.create(req.body)

    res.json({
        msg: "Thanh Cong",
        room
    })

})

// DELETE room
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const room = await Room.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        room
    })
    
})

// GET List Room by clientId
router.get('/list/clientId/:id', async (req, res) => {

    const { id } = req.params

    const rooms = await Room.find({ clientId: id })

    res.json(rooms)

})

// GET List Room by shopId
router.get('/list/shopId/:id', async (req, res) => {
    
    const { id } = req.params

    const rooms = await Room.find({ shopId: id })

    res.json(rooms)

})

module.exports = router