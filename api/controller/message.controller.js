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
                msg: "Code 404",
                err
            })
        } else {
            res.json({
                msg: "Code 200",
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
                msg: "Code 404",
                err
            })
        } else {
            res.json({
                msg: "Code 200",
                result
            })
        }
    })

})

// GET List Message by roomId
router.get('/list/roomId/:id', async (req, res) => {

    const { id } = req.params

    const messages = await Message.find({ roomId: id })

    res.json(messages)

})


module.exports = router