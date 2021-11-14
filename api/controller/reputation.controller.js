const express = require('express')

const router = express.Router()

const Reputation = require('../model/reputation.model')

// GET reputation all
router.get('/', async(req, res) => {

    const reputation = await Reputation.find({})

    res.json(reputation)

})

// GET Detail reputation 
router.get('/detail', async(req, res) => {
    const { userId, shopId } = req.query || ""

    const reputation = await Reputation.find({
        $or: [{ userId: userId }, { shopId: shopId }]
    }).populate('userId')

    res.json(reputation)

})

// GET Checking reputation
router.get('/checking', async (req, res) => {

    const { userId, shopId } = req.query

    const reputation = await Reputation.exists({ userId, shopId })

    res.json(reputation)

})

// POST reputation
router.post('/', async(req, res) => {
    Reputation.create(req.body, async function(err, result) {
        if (err) {
            res.json({
                msg: "That bai",
                err
            })
        } else {

            const reputation = await Reputation.findOne({ _id: result._id }).populate('userId')

            res.json({
                msg: "Thanh Cong",
                result: reputation
            })
        }
    });
})

// DELETE reputation
router.delete('/delete', async (req, res) => {

    const { userId, shopId } = req.query

    Reputation.deleteOne({ userId, shopId }, function(err, result) {
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