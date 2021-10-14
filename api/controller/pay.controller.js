const express = require('express')

const router = express.Router()

const Pay = require('../model/pay.model')

// GET Pay all
router.get('/', async(req, res) => {

    const pay = await Pay.find({});

    res.json(pay)

})

// POST Pay
router.post('/', async(req, res) => {

    Pay.create(req.body, function(err, result) {
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

// DELETE Pay
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Pay.deleteOne({ _id: id }, function(err, result) {
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