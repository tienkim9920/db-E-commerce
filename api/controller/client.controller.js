const express = require('express')

const router = express.Router()

const Client = require('../model/client.model')

// GET Client all
router.get('/', async (req, res) => {
    
    const client = await Client.find({});
    
    res.json(client)

})

// POST Client
router.post('/', async (req, res) => {
    
    Client.create(req.body, function(err, result){
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

// DELETE Client
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    Client.deleteOne({ _id: id }, function(err, result) {
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