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
    Tick.create(req.body, function(err, result) {
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

// DELETE tick
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Tick.deleteOne({ _id: id }, function(err, result) {
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