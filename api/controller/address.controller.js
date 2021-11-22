const express = require('express')

const router = express.Router()

const Address = require('../model/address.model')

// GET address all
router.get('/', async(req, res) => {

    const address = await Address.find({})

    res.json(address)

})

// Get address by shopID
router.get('/detail/:shopId', async (req, res) => {
    
    const { shopId } = req.params

    const address = await Address.find({ shopId });
    
    res.json(address)

})

// Get detail address by addressID
router.get('/detailAddress/:id', async (req, res) =>{

    const { id } = req.params

    const address = await Address.findOne({ _id: id });

    res.json(address)
})

// POST address
router.post('/', async(req, res) => {

    const address = await Address.create(req.body)

    res.json({
        msg: "Code 200",
        address
    })

})

// Update address of shop 

router.patch('/:id', async (req,res) =>{

    const _id = req.params.id
    const body = req.body

    const addressSite = await Address.findByIdAndUpdate(_id,body)

    
    res.json({
        msg: "Update address shop success",
        addressSite
    })
    
})


// DELETE address
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const address = await Address.deleteOne({ _id: id })

    res.json({
        msg: "Code 200",
        address
    })

})

module.exports = router