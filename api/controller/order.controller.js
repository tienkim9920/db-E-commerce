const express = require('express')

const router = express.Router()

const Order = require('../model/order.model')
const { route } = require('./address.controller')

// GET order all
router.get('/', async(req, res) => {

    // const order = await Order.find({}).populate('userId').populate('payId')
    //     .populate('noteId').populate('shopId')

    const order = await Order.find({})

    res.json(order)

})

// GET Detail Order
router.get('/:id', async(req, res) => {

    const { id } = req.params

    const order = await Order.findOne({ _id: id }).populate(['payId', 'userId', 'noteId'])

    res.json(order)

})

// GET Order UserId
router.get('/user/:userId', async(req, res) => {
    const { userId } = req.params
    const order = await Order.find({ userId: userId }).populate(['payId', 'shopId'])

    res.json(order)

})


// Get Order by status

router.get('/order', async(req, res) => {

    const status = req.query.status

    const order = await Order.find({ status: status });

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
        result: order
    })

})

// Update Status order

router.patch('/:id', async(req, res) => {

    const _id = req.params.id
    const status = req.body.status

    const order = await Order.findByIdAndUpdate(_id, { status: status }, {
        new: true
    });

    res.json({
        msg: "Transfer status success",
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

// GET Statistic
router.get('/statistic/:shopId', async (req, res) => {

    const { shopId } = req.params

    const { checking, getDay, getMonth, getYear } = req.query


    if (parseInt(checking) === 1){

        const createTime = `${getDay}/${getMonth}/${getYear}`

        const statistic = await Order.find({ createTime, shopId, status: '4' }).populate(['userId', 'payId'])

        res.json(statistic)
    }else if (parseInt(checking) === 2){

        const createTime = `/${getMonth}/${getYear}`

        const statistic = await Order.find({
            "createTime": {
                $regex: '.*' + createTime + '.*'
            },
            shopId, status: '4'
        }).populate(['userId', 'payId'])

        res.json(statistic)
    }else {
        const createTime = `/${getYear}`

        const statistic = await Order.find({
            "createTime": {
                $regex: '.*' + createTime + '.*'
            },
            shopId, status: '4'
        }).populate(['userId', 'payId'])

        res.json(statistic)
    }

})

module.exports = router