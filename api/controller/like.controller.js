const express = require('express')

const router = express.Router()

const Like = require('../model/like.model')

// GET like all
router.get('/', async(req, res) => {

    // const like = await Like.find({}).populate('productId').populate('userId')

    const like = await Like.find({})

    res.json(like)

})

// GET List like by productId
router.get('/list/productId', async (req, res) => {

    const { productId } = req.query

    const like = await Like.find({ productId })

    res.json(like)
    
})

// POST like
router.post('/', async(req, res) => {

    const like = await Like.create(req.body)

    res.json({
        msg: "Code 200",
        like
    })

})

// DELETE like
router.delete('/delete', async (req, res) => {

    const { userId, productId } = req.query

    const like = await Like.deleteOne({ userId, productId })

    res.json({
        msg: "Code 200",
        like
    })

})

// Checking Like User return true & false
router.get('/checking', async (req, res) => {

    const { userId, productId } = req.query

    const checking = await Like.exists({ userId, productId })

    res.json(checking)

})

module.exports = router