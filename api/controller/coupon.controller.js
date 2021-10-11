const express = require('express')

const router = express.Router()

const Coupon = require('../model/coupon.model')

// GET coupon all
router.get('/', async (req, res) => {
    
    const coupon = await Coupon.find({}).populate('userId').populate('coupId')

    res.json(coupon)

})

// POST coupon
router.post('/', async (req, res) => {

    const coupon = await Coupon.create(req.body)

    res.json({
        msg: "Thanh Cong",
        coupon
    })

})

// DELETE coupon
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const coupon = await Coupon.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        coupon
    })
    
})

module.exports = router