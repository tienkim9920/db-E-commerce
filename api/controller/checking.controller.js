const express = require('express')

const router = express.Router()

const Checking = require('../model/checking.model')

// GET Checking all
router.get('/', async(req, res) => {

    const checking = await Checking.find({});

    res.json(checking)

})

// POST Checking
router.post('/', async(req, res) => {

    Checking.create(req.body, function(err, result) {
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

// DELETE Checking
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Checking.deleteOne({ _id: id }, function(err, result) {
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


module.exports = router