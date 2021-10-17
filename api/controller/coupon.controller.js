const express = require('express')

const router = express.Router()

const Coupon = require('../model/coupon.model')

// GET coupon all
router.get('/', async(req, res) => {

    // const coupon = await Coupon.find({}).populate('userId').populate('coupId')
    const coupon = await Coupon.find({})

    res.json(coupon)

})

// POST coupon
router.post('/', async(req, res) => {

    const coupon = await Coupon.create(req.body)

    res.json({
        msg: "Thanh Cong",
        coupon
    })

})

// Update ticket
router.patch('/:id', async(req, res) => {

    const id = req.params.id

    Coupon.updateOne({ _id: id }, { status: true }, function(err, result) {
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

// DELETE coupon
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const coupon = await Coupon.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        coupon
    })

})

// Checking Coupon by GET Detail coupon with field userId, coupId
router.get('/checking', async(req, res) => {

    const { userId, coupId } = req.query

    // Duyệt theo điều kiện và return true false
    const checking = await Coupon.exists({ userId, coupId }) ? 'Code 200' : 'Code 404'

    res.json(checking)

})

module.exports = router