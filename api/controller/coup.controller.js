const express = require('express')

const router = express.Router()

const Coup = require('../model/coup.model')

// GET Coup all
router.get('/', async(req, res) => {

    const coup = await Coup.find({});

    res.json(coup)

})

// POST Coup
router.post('/', async(req, res) => {

    Coup.create(req.body, function(err, result) {
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

// DELETE Coup
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Coup.deleteOne({ _id: id }, function(err, result) {
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