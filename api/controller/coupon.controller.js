const express = require('express')

const router = express.Router()

const Coupon = require('../model/coupon.model')

// GET coupon all
router.get('/', async(req, res) => {

    // const coupon = await Coupon.find({}).populate('userId').populate('coupId')
    const coupon = await Coupon.find({})

    res.json(coupon)

})

// GET LIST all coupon by userId
router.get('/:userId', async(req, res) => {

    const { userId } = req.params

    const coupon = await Coupon.find({ userId }).populate('coupId')

    res.json(coupon)

})

// POST coupon
router.post('/', async(req, res) => {

    Coupon.create(req.body, function(err, result) {
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

// Update Coupon
router.patch('/checking/update', async(req, res) => {

    const { userId, coupId } = req.query

    Coupon.updateOne({ userId, coupId }, { status: true }, function(err, result) {
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

// DELETE coupon
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const coupon = await Coupon.deleteOne({ _id: id })

    res.json({
        msg: "Code 200",
        coupon
    })

})

// Checking Coupon by GET Detail coupon with field userId, coupId
router.get('/checking/status', async(req, res) => {

    const { userId, coupId } = req.query

    // Duyệt theo điều kiện và return true false

    const checking = await Coupon.exists({ userId, coupId, status: true }) ? 'Status True' : 'Status False'

    res.json(checking)

})

// GET List Coupon Status by userId
router.get('/list/userId', async(req, res) => {

    const { status, userId } = req.query

    const coupon = await Coupon.find({ userId, status })

    res.json(coupon)

})

module.exports = router