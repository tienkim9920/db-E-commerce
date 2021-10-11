const express = require('express')

const router = express.Router()

const Comment = require('../model/comment.model')

// GET Comment all
router.get('/', async (req, res) => {
    
    const comment = await Comment.find({});
    
    res.json(comment)

})

// POST Comment
router.post('/', async (req, res) => {
    
    Comment.create(req.body, function(err, result){
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

// DELETE Comment
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    Comment.deleteOne({ _id: id }, function(err, result) {
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