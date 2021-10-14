const express = require('express')

const router = express.Router()

const Order = require('../model/order.model')

// GET order all
router.get('/', async(req, res) => {

    const order = await Order.find({}).populate('userId').populate('payId')
        .populate('noteId').populate('shopId')

    res.json(order)

})

// Get Order by status

router.get('/order', async (req, res) => {
    
    const status = req.query.status

    const order = await Order.find({status: status});
    
    res.json(order)({
        msg: "Get order by status success",
        order
    })

})


// POST order
router.post('/', async(req, res) => {

    const order = await Order.create(req.body)

    res.json({
        msg: "Thanh Cong",
        order
    })

})

// DELETE order
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const order = await Order.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        order
    })

})

module.exports = router