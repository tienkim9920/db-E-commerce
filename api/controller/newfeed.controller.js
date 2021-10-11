const express = require('express')

const router = express.Router()

const Newfeed = require('../model/newfeed.model')

// GET newfeed all
router.get('/', async(req, res) => {

    const newfeed = await Newfeed.find({})

    res.json(newfeed)

})

// POST newfeed
router.post('/', async(req, res) => {
    Newfeed.create(req.body, function(err, result) {
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

// DELETE newfeed
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Newfeed.deleteOne({ _id: id }, function(err, result) {
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