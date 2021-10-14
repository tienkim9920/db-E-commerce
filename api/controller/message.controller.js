const express = require('express')

const router = express.Router()

const Message = require('../model/message.model')

// GET Message all
router.get('/', async(req, res) => {

    const message = await Message.find({});

    res.json(message)

})

// POST Message
router.post('/', async(req, res) => {

    Message.create(req.body, function(err, result) {
        if (err) {
            res.json({
                msg: "0",
                err
            })
        } else {
            res.json({
                msg: "1",
                result
            })
        }
    });

})

// DELETE Message
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Message.deleteOne({ _id: id }, function(err, result) {
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