const express = require('express')

const router = express.Router()

const Option = require('../model/option.model')

// GET Option all
router.get('/', async (req, res) => {
    
    const option = await Option.find({});
    
    res.json(option)

})

// POST Option
router.post('/', async (req, res) => {
    
    Option.create(req.body, function(err, result){
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

// DELETE Option
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    Option.deleteOne({ _id: id }, function(err, result) {
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