const express = require('express')

const router = express.Router()

const Shop = require('../model/shop.model')
const Product = require('../model/product.model')

// GET shop all
router.get('/', async(req, res) => {
    const limit = Number(req.query.limit) || ""

    const shop = await Shop.find({}).limit(limit)

    res.json(shop)

})

// GET detail shop by ID :TN
router.get('/:id', async(req, res) => {

    const id = req.params.id

    const shop = await Shop.findOne({ _id: id });

    res.json(shop)

})

// GET Shop Category
router.get('/category/:id', async(req, res) => {
    const id = req.params.id

    const search = req.query.keyWord || ""
    let query = {}

    id === "search" ? query = { name: { $regex: search, $options: 'i' } } : query = { categoryId: id }

    let shop = await Product.aggregate([
        { $match: query },
        { $group: { _id: { $toObjectId: "$shopId" } } },
        {
            $lookup: {
                from: 'shop',
                localField: "_id",
                foreignField: "_id",
                as: 'shop'
            }
        },
        {
            $unwind: "$shop"
        },
        {
            $project: {
                _id: 0,
                shop: 1
            }
        },
        { $group: { _id: "$shop._id", name: { "$first": "$shop.name" } } }
    ])


    res.json(shop)

})

// GET detail shop by userId
router.get('/detail/:userId', async(req, res) => {

    const { userId } = req.params

    const shop = await Shop.findOne({ userId })

    res.json(shop)

})

// POST shop
router.post('/', async(req, res) => {

    const shop = await Shop.create(req.body)

    res.json({
        msg: "Code 200",
        result: shop
    })

})

// Update info of shop :TN

router.patch('/:id', async(req, res) => {

    const userId = req.params.id

    const {name,description} = req.body

    let fileShop= req.body.file || ""

    if(req.files){

        var fileImage = req.files.file;

        var fileName = fileImage.name
    
        fileShop = "http://localhost:4000/" + fileName
    
        // move file name in folder public
        fileImage.mv('./public/' + fileName)
    }
 

    const shop = await Shop.findOneAndUpdate({ userId : userId},{ name : name,description:description, image: fileShop})

    res.json(shop)({
        msg: "Update info of shop success",
        result: shop
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
router.patch('/update/image', async(req, res) => {

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