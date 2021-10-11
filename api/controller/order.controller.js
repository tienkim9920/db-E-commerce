const express = require('express')

const router = express.Router()

const Order = require('../model/order.model')

// GET order all
router.get('/', async (req, res) => {
    
    const order = await Order.find({}).populate('userId').populate('payId')
    .populate('noteId').populate('shopId')

    res.json(order)

})

// POST order
router.post('/', async (req, res) => {

    const order = await Order.create(req.body)

    res.json({
        msg: "Thanh Cong",
        order
    })

})

// DELETE order
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const order = await Order.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        order
    })
    
})

module.exports = router