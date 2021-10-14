const express = require('express')

const router = express.Router()

const Like = require('../model/like.model')

// GET like all
router.get('/', async(req, res) => {

    const like = await Like.find({}).populate('productId').populate('userId')

    res.json(like)

})

// POST like
router.post('/', async(req, res) => {

    const like = await Like.create(req.body)

    res.json({
        msg: "Thanh Cong",
        like
    })

})

// DELETE like
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const like = await Like.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        like
    })

})

module.exports = router