const express = require('express')

const router = express.Router()

const Checking = require('../model/checking.model')

// GET Checking all
router.get('/', async (req, res) => {
    
    const checking = await Checking.find({});
    
    res.json(checking)

})

// POST Checking
router.post('/', async (req, res) => {
    
    Checking.create(req.body, function(err, result){
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

// DELETE Checking
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    Checking.deleteOne({ _id: id }, function(err, result) {
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