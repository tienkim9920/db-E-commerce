const express = require('express')

const router = express.Router()

const Notification = require('../model/notification.model')

// GET notification all
router.get('/', async (req, res) => {

    const notification = await Notification.find({})

    res.json(notification)

})

//GET detail notification by userId
router.get('/:id', async (req, res) => {

    const { id } = req.params

    const notification = await Notification.find({ userId: id })

    res.json(notification)

})

// POST notification
router.post('/', async(req, res) => {

    const notification = await Notification.create(req.body)

    res.json({
        msg: "Thanh Cong",
        notification
    })

})

// DELETE notification
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const notification = await Notification.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        notification
    })

})

module.exports = router