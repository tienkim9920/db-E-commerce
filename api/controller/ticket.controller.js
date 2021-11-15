const express = require('express')

const router = express.Router()

const Ticket = require('../model/ticket.model')

// GET ticket all
router.get('/', async(req, res) => {

    const ticket = await Ticket.find({})

    res.json(ticket)

})

// GET Ticket User
router.get('/:userId', async(req, res) => {

    const ticket = await Ticket.find({ userId: req.params.userId }).populate('tickId');

    res.json(ticket)

})

// POST ticket
router.post('/', async(req, res) => {

    const ticket = await Ticket.create(req.body)

    const resTicket = await Ticket.findOne({ _id: ticket._id }).populate('tickId')

    res.json({
        msg: "Code 200",
        result: resTicket
    })
})

// DELETE ticket
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Ticket.deleteOne({ _id: id }, function(err, result) {
        if (err) {
            res.json({
                msg: "That bai",
                err
            })
        } else {
            res.json({
                msg: "Thanh Cong",
                result
            })
        }
    })

})

// Checking Ticket By userId, tickId
router.get('/checking/used', async (req, res) => {

    const { userId, tickId } = req.query

    // Duyệt theo điều kiện và return true false
    const checking = await Ticket.exists({ userId, tickId, status: true }) ? 'Status True' : 'Status False'

    res.json(checking)

})

// GET List Ticket Status by userId
router.get('/list/userId', async (req, res) => {

    const { status, userId } = req.query

    const ticket = await Ticket.find({ userId, status })

    res.json(ticket)

})

// PATCH update ticket
router.patch('/update/ticket/:id', async (req, res) => {

    const { id } = req.params

    const ticket = await Ticket.findByIdAndUpdate(id, req.body,{
        new: true
    });
        
    res.json({
        msg: "Update info of ticket success",
        result: ticket
    })

})

module.exports = router