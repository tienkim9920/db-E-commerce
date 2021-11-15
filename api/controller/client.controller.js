const express = require('express')

const router = express.Router()

const Client = require('../model/client.model')

// GET Client all
router.get('/', async(req, res) => {

    const client = await Client.find({});

    res.json(client)

})

// POST Client
router.post('/', async(req, res) => {

    Client.create(req.body, function(err, result) {
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

router.get('/:id', async(req, res) => {
    const client = await Client.findOne({ _id: req.params.id })
    res.json(client)
})

// DELETE Client
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    Client.deleteOne({ _id: id }, function(err, result) {
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

// Checking Status Client by userId
router.get('/checking/cart', async(req, res) => {

    const { code } = req.query

    const client = await Client.exists({ code, statusOrder: true })

    if (client){
        const data = await Client.findOne({ code })
        res.json(data)
    }else{
        res.json(client)
    }

})

// PATCH status client by userId
router.patch('/update/:userId', async(req, res) => {

    const { userId } = req.params

    const client = await Client.findOne({ userId })

    client.statusOrder = !client.statusOrder

    client.save()

    res.json({
        msg: "Code 200"
    })

})


// PATCH Limit client by userId
router.patch('/:userId', async (req, res) => {

    const { userId } = req.params

    Client.updateOne({ userId }, req.body, function(err, result) {
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