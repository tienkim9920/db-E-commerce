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


module.exports = router