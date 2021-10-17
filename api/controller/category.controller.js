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

// DELETE category
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Category.deleteOne({ _id: id }, function(err, result) {
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