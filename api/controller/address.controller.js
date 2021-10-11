const express = require('express')

const router = express.Router()

const Address = require('../model/address.model')

// GET address all
router.get('/', async (req, res) => {
    
    const address = await Address.find({}).populate('shopId')

    res.json(address)

})

// POST address
router.post('/', async (req, res) => {

    const address = await Address.create(req.body)

    res.json({
        msg: "Thanh Cong",
        address
    })

})

// DELETE address
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const address = await Address.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        address
    })
    
})

module.exports = router