const express = require('express')

const router = express.Router()

const Reputation = require('../model/reputation.model')

// GET reputation all
router.get('/', async(req, res) => {

    const reputation = await Reputation.find({})

    res.json(reputation)

})

// POST reputation
router.post('/', async(req, res) => {
    Reputation.create(req.body, function(err, result) {
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

// DELETE reputation
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Reputation.deleteOne({ _id: id }, function(err, result) {
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