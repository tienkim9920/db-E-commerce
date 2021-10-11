const express = require('express')

const router = express.Router()

const Distance = require('../model/distance.model')

// GET distance all
router.get('/', async(req, res) => {

    const distance = await Distance.find({})

    res.json(distance)

})

// POST distance
router.post('/', async(req, res) => {
    Distance.create(req.body, function(err, result) {
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

// DELETE distance
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Distance.deleteOne({ _id: id }, function(err, result) {
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