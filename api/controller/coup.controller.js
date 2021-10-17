const express = require('express')

const router = express.Router()

const Coup = require('../model/coup.model')

// GET Coup all
router.get('/', async(req, res) => {

    const coup = await Coup.find({});

    res.json(coup)

})

// GET all coup of shop by shopId
router.get('/coup', async (req, res) => {
    
    const shopId = req.query.shopId

    const coup = await Coup.find({shopId: shopId});
    
    res.json(coup)({
        msg: "Get coup by shopId success",
        coup
    })

})

// POST Coup
router.post('/', async(req, res) => {

    Coup.create(req.body, function(err, result) {
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

// DELETE Coup
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Coup.deleteOne({ _id: id }, function(err, result) {
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

// Checking Discount Coup By Code
router.get('/:code', async (req, res) => {

    const { code } = req.params

    const coup = await Coup.findOne({ code })

    res.json(coup)
    
})


module.exports = router