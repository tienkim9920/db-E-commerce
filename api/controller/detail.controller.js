const express = require('express')

const router = express.Router()

const Detail = require('../model/detail.model')

// GET detail all
router.get('/', async(req, res) => {

    const detail = await Detail.find({})

    res.json(detail)

})

// GET detail orderID
router.get('/order', async(req, res) => {
    const { orderId } = req.query
    const detail = await Detail.find({ orderId: orderId }).populate('productId').populate('orderId')
    res.json(detail)

})

// POST detail
router.post('/', async(req, res) => {
    Detail.create(req.body, function(err, result) {
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

// DELETE detail
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Detail.deleteOne({ _id: id }, function(err, result) {
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