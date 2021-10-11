const express = require('express')

const router = express.Router()

const Shop = require('../model/shop.model')

// GET shop all
router.get('/', async(req, res) => {

    const shop = await Shop.find({}).populate('userId')

    res.json(shop)

})

// POST shop
router.post('/', async(req, res) => {

    const shop = await Shop.create(req.body)

    res.json({
        msg: "Thanh Cong",
        shop
    })

})

// DELETE shop
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const shop = await Shop.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        shop
    })

})

module.exports = router