const express = require('express')

const router = express.Router()

const Address = require('../model/address.model')

// GET address all
router.get('/', async(req, res) => {

    const address = await Address.find({})

    res.json(address)

})

// Get address by shopID

router.get('/address', async (req, res) => {
    
    const shopId = req.query.shopId

    const address = await Address.find({shopId: shopId});
    
    res.json(address)({
        msg: "Get order by status success",
        address
    })

})

// POST address
router.post('/', async(req, res) => {

    const address = await Address.create(req.body)

    res.json({
        msg: "Thanh Cong",
        address
    })

})

// Update address of shop 

router.patch('/address/:id', async (req,res) =>{

    try{

        const _id = req.params.id
        const address = req.body.address

        const addressSite = await Address.findByIdAndUpdate(_id,{address: address},{
            new:true
        });
        
        res.json(addressSite)({
            msg: "Update address shop success",
            addressSite
        })
    
    }catch(e){
        res.status(400).send(e);
    }
})


// DELETE address
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const address = await Address.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        address
    })

})

module.exports = router