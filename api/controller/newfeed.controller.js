const express = require('express')

const router = express.Router()

const Newfeed = require('../model/newfeed.model')

// GET newfeed all
router.get('/', async(req, res) => {

    const newfeed = await Newfeed.find({})

    res.json(newfeed)

})

//GET All Home Product Pagination
router.get('/pagination', async(req, res) => {

    const { page } = req.query

    // Lọc theo trang. skip là bắt đầu từ vị trí sản phẩm
    const products = await Newfeed.find({}).skip((page - 1) * 3).limit(3)

    res.json(products)

})

// POST newfeed
router.post('/', async(req, res) => {
    Newfeed.create(req.body, function(err, result) {
        if (err) {
            res.json({
                msg: "Code 404",
                err
            })
        } else {
            res.json({
                msg: "Code 200",
                result
            })
        }
    });
})

// DELETE newfeed
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Newfeed.deleteOne({ _id: id }, function(err, result) {
        if (err) {
            res.json({
                msg: "Code 404",
                err
            })
        } else {
            res.json({
                msg: "Code 200",
                result
            })
        }
    })

})

module.exports = router