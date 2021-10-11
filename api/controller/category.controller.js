const express = require('express')

const router = express.Router()

const Category = require('../model/category.model')

// GET category all
router.get('/', async(req, res) => {

    const category = await Category.find({})

    res.json(category)

})

// POST category
router.post('/', async(req, res) => {
    Category.create(req.body, function(err, result) {
        if (err) {
            res.json({
                msg: "That bai",
                err
            })
        } else {
            res.json({
                msg: "Thanh Cong",
                result
            })
        }
    });
})

// DELETE category
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Category.deleteOne({ _id: id }, function(err, result) {
        if (err) {
            res.json({
                msg: "That bai",
                err
            })
        } else {
            res.json({
                msg: "Thanh Cong",
                result
            })
        }
    })

})

module.exports = router