const express = require('express')

const router = express.Router()

const Comment = require('../model/comment.model')

// GET Comment all
router.get('/', async(req, res) => {

    const comment = await Comment.find({});

    res.json(comment)

})

// GET Comment Product
router.get('/:productId', async(req, res) => {

    const comment = await Comment.find({ productId: req.params.productId }).populate('userId');

    res.json(comment)

})

// POST Comment
router.post('/', async(req, res) => {

    Comment.create(req.body, async function(err, result) {
        if (err) {
            res.json({
                msg: "Code 404",
                err
            })
        } else {

            const comment = await Comment.findOne({ _id: result._id }).populate('userId')

            res.json({
                msg: "Code 200",
                result: comment
            })
        }
    });

})

// DELETE Comment
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Comment.deleteOne({ _id: id }, function(err, result) {
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