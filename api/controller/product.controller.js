const { query } = require('express');
const express = require('express')

const router = express.Router()

const Product = require('../model/product.model')

// GET Product all
router.get('/', async (req, res) => {
    
    const product = await Product.find({});
    
    res.json(product)

})

// Get detail product by categoryId 
router.get('/product', async (req, res) => {
    
    const categoryId = req.query.categoryId
    
    const product = await Product.find({categoryId: categoryId});
    
    res.json(product)({
        msg: "Get product by category success",
        product
    })

})

// GET List product 
// router.get('/product', async (req, res) => {
    
//     const discount = req.query.discount


//     const product = await Product.find({discount: discount});
    
//     res.json(product)({
//         msg: "Get product by discound success",
//         product
//     })

// })

// POST Product
router.post('/', async (req, res) => {
    
    const product = await Product.create(req.body, function(err, result){
        if(err) {
            res.json({
                msg:"0",
                err
            })
        }else{
            res.json({
                msg:"1",
                result
            })
        }
    });

})

// DELETE Product
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const product = await Product.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        product
    })

})

// GET Product Discount ExpireTime
router.get('/discount', async (req, res) => {

    // Lọc theo điều kiện lớn hơn 1
    const products = await Product.where('expiredTime').gte(1).limit(9)

    res.json(products)

})

//GET All Home Product Pagination
router.get('/home/pagination', async (req, res) => {

    const { page } = req.query

    // Lọc theo trang. skip là bắt đầu từ vị trí sản phẩm
    const products = await Product.find({ }).skip((page - 1) * 8).limit(8)

    res.json(products)

})

// Search All Product by Name
router.get('/search', async (req, res) => {

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
router.patch('/update/image', async (req, res) => {

    const product = await Product.findOne({ _id: req.body._id })

    if (product.image.length < 4){
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
    }else{
        res.json({ msg: "Fail" })
    }

})


module.exports = router