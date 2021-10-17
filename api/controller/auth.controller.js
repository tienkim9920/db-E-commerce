const express = require('express')

const router = express.Router()

const Auth = require('../model/auth.model')

// GET auth all
router.get('/', async(req, res) => {

    const auth = await Auth.find({})

    res.json(auth)

})

// POST auth
router.post('/', async(req, res) => {

    const auth = await Auth.create(req.body)

    res.json({
        msg: "Code 200",
        auth
    })

})

// DELETE auth
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const auth = await Auth.deleteOne({ _id: id })

    res.json({
        msg: "Code 200",
        auth
    })

})

module.exports = router