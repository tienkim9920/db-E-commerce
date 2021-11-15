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

    const order = await Order.find({ userId: userId }).populate(['payId', 'shopId', 'noteId'])

    res.json(order)

})

// GET Order ShopId
router.get('/shop/:userId', async(req, res) => {
    const { userId } = req.params

    const page = req.query.page || 1
    const pageSize = req.query.pageSize || 8
    const status = req.query.status || "1"
    const start = (page - 1) * pageSize;
    const end = page * pageSize;

    let query = {}
    query.userId = { 'shopId.userId': userId };
    query.status = status !== "0" ? { 'status': status } : {}

    const order = await Order.aggregate([

        {
            $addFields: {
                shopId: { $toObjectId: "$shopId" },
                payId: { $toObjectId: "$payId" },
                noteId: { $toObjectId: "$noteId" },
                userId: { $toObjectId: "$userId" }
            }
        },

        {
            $lookup: {
                from: 'shop',
                localField: "shopId",
                foreignField: "_id",
                as: 'shopId'
            }
        },

        {
            $lookup: {
                from: 'pay',
                localField: "payId",
                foreignField: "_id",
                as: 'payId'
            }
        },

        {
            $lookup: {
                from: 'note',
                localField: "noteId",
                foreignField: "_id",
                as: 'noteId'
            }
        },

        {
            $lookup: {
                from: 'user',
                localField: "userId",
                foreignField: "_id",
                as: 'userId'
            }
        },

        {
            $unwind: {
                path: "$shopId",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $unwind: {
                path: "$payId",
                preserveNullAndEmptyArrays: true
            }
        },
        {
            $unwind: {
                path: "$noteId",
                preserveNullAndEmptyArrays: true
            }

        },
        {
            $unwind: {
                path: "$userId",
                preserveNullAndEmptyArrays: true
            }

        },

        {
            $match: { $and: [query.userId, query.status] }
        }


    ])

    // const order = await Order.find({ userId: userId }).populate(['payId', 'shopId', 'noteId'])

    res.json({ order: order.slice(start, end), total: order.length })

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

module.exports = router