const { query } = require('express');
const express = require('express')

const router = express.Router()

const Product = require('../model/product.model')

// GET Product all
router.get('/', async(req, res) => {

    const product = await Product.find({})

    res.json(product)

})

// Get detail product by ID 
router.get('/:id', async(req, res) => {

    const id = req.params.id

    const product = await Product.findOne({ _id: id }).populate('shopId')

    res.json(product)

})

// Get detail product by shopId
router.get('/listProduct/:shopId', async(req, res) => {

    const { shopId } = req.params

    const product = await Product.find({ shopId });

    res.json(product)

})

// GET List product out of stock
router.get('/list/outsale', async (req, res) => {
    
    // Lấy tất cả count of product = 1
    const productOutSale = await Product.find({count: { $eq: 0 } });
    
    res.json(productOutSale)

})

// GET List product on-sale
router.get('/list/onsale', async (req, res) => {
    
    // Lấy tất cả count of product lớn hơn 1
    const productOnSale = await Product.find({count: { $gte: 1 }});
    
    res.json(productOnSale)
})

// GET List product sale 
router.get('/list/sale', async (req, res) => {
    
    // Lấy tất cả discount of product lớn hơn 1
    const productSale = await Product.find({discount: { $gte: 1 }});
        
    res.json(productSale)
})

// POST Product
router.post('/', async(req, res) => {

    const product = await Product.create(req.body)

    res.json({
        msg: "Code 200",
        product
    })

})

// Update Product
router.patch('/:id', async(req, res) => {

    const id = req.params.id;

    Product.updateOne({ _id: id }, req.body, function(err, result) {
        if (err) {
            return res.json({
                msg: 'That bai',
                err: err
            });
        }
        return res.json({
            msg: 'Thanh cong',
            product: result
        });
    })
})

// Update Product like
router.patch('/like/:id', async(req, res) => {

    const id = req.params.id;

    let product = await Product.findOne({ _id: id })

    product.like = Number(product.like) + 1;

    product.save()

    res.json("Thanh Cong")
})

// Update Product dislike
router.patch('/dislike/:id', async(req, res) => {

    const id = req.params.id;

    let product = await Product.findOne({ _id: id })

    product.like = Number(product.like) - 1;

    product.save()

    res.json("Thanh Cong")
})

// DELETE Product
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const product = await Product.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        product
    })

})

// GET Product Discount ExpireTime
router.get('/sale/discount', async(req, res) => {

    // Lấy tất cả discount of product lớn hơn 1
    const productSale = await Product.find({ discount: { $gte: 1 }});

    res.json(productSale)

})

//GET All Shop Product Pagination
router.get('/shop/pagination', async(req, res) => {

    const { page, shopId } = req.query

    // Lọc theo trang. skip là bắt đầu từ vị trí sản phẩm
    const products = await Product.find({ shopId: shopId }).skip((page - 1) * 8).limit(8)

    res.json(products)

})

//GET All Home Product Pagination
router.get('/home/pagination', async(req, res) => {

    const { page } = req.query

    // Lọc theo trang. skip là bắt đầu từ vị trí sản phẩm
    const products = await Product.find({}).skip((page - 1) * 8).limit(8)

    res.json(products)

})

// Search All Product by Name
router.get('/search', async(req, res) => {

    const { word } = req.query

    // Sử dụng regex để search
    const products = await Product.find({
        "name": {
            $regex: '.*' + word + '.*'
        }
    })

    res.json(products)

})

// PATCH Update Image Product
router.patch('/update/image', async(req, res) => {

    const product = await Product.findOne({ _id: req.body._id })

    if (product.image.length < 4) {
        var fileImage = req.files.file;

        var fileName = fileImage.name

        // create path to client get image
        // var fileProduct = "https://server-lover.herokuapp.com/" + fileName
        var fileProduct = "http://localhost:4000/" + fileName

        const image = {
            id: Math.random().toString(),
            url: fileProduct
        }

        product.image.push(image)

        // move file name in folder public
        fileImage.mv('./public/' + fileName)

        product.save()

        res.json({ msg: "Success" })
    } else {
        res.json({ msg: "Fail" })
    }

})


module.exports = router
