const express = require('express')

const router = express.Router()

const Shop = require('../model/shop.model')

// GET shop all
router.get('/', async(req, res) => {

    const shop = 
    await Shop.find({})

    res.json(shop)

})

// GET detail shop by ID :TN
router.get('/:id', async (req, res) => {
    
    const id = req.params.id

    const shop = await Shop.find({_id: id});
    
    res.json(shop)({
        msg: "Get detail by userID success",
        shop
    })

})

// POST shop
router.post('/', async(req, res) => {

    const shop = await Shop.create(req.body)

    res.json({
        msg: "Thanh Cong",
        shop
    })

})

// Update info of shop :TN

router.patch('/:id', async (req,res) =>{

    try{

        const _id = req.params.id

        const shop = await Shop.findByIdAndUpdate(_id,req.body,{
            new:true
        });
        
        res.json(shop)({
            msg: "Update info of shop success",
            shop
        })
    
    }catch(e){
        res.status(400).send(e);
    }
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