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

    const ticket = await Ticket.find({ userId: req.params.userId });

    res.json(ticket)

})

// POST ticket
router.post('/', async(req, res) => {
    Ticket.create(req.body, function(err, result) {
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
    });
})

// Update ticket
router.patch('/:id', async(req, res) => {

    const id = req.params.id

    Ticket.updateOne({ _id: id }, { status: true }, function(err, result) {
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

module.exports = router