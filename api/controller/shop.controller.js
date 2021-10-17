const express = require('express')

const router = express.Router()

const Shop = require('../model/shop.model')

// GET shop all
router.get('/', async(req, res) => {

    const shop = 
    await Shop.find({}).populate('userId')

    res.json(shop)

})

// GET detail shop by ID :TN

// router.get('/:id', async (req, res) => {
    
//     const id = req.params.id

//     const shop = await Shop.find({_id: id});
    
//     res.json(shop)({
//         msg: "Get shop by id success",
//         shop
//     })

// })

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
        msg: "Code 200",
        shop
    })

})

// DELETE shop
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const shop = await Shop.deleteOne({ _id: id })

    res.json({
        msg: "Code 200",
        shop
    })

})

// PATCH update image shop
router.patch('/update/image', async (req, res) => {

    const shop = await Shop.findOne({ _id: req.body._id })

    var fileImage = req.files.file;

    var fileName = fileImage.name

    // var fileProduct = "https://server-lover.herokuapp.com/" + fileName
    var fileShop = "http://localhost:4000/" + fileName

    shop.image = fileShop

    // move file name in folder public
    fileImage.mv('./public/' + fileName)

    shop.save()

    res.json({ 
        msg: "Code 200" 
    })

})

module.exports = router