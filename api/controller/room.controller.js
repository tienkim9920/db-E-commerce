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
        result: room
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

    const rooms = await Room.find({ clientId: id }).populate(['shopId', 'checkingId'])

    res.json(rooms)

})

// GET List Room by shopId
router.get('/list/shopId/:id', async (req, res) => {
    
    const { id } = req.params

    // Mutiple populate
    const rooms = await Room.find({ shopId: id }).populate([{
        path: 'clientId',
        populate: {
            path: 'userId',
            model: 'User'
        },
    }, 'checkingId'])

    res.json(rooms)

})

// Checking
router.get('/checking', async (req, res) => {

    const { clientId, shopId } = req.query

    const room = await Room.findOne({ clientId, shopId })

    const checking = await Room.exists({ clientId, shopId }) ? room : false

    res.json(checking)

})

module.exports = router