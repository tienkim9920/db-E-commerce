const express = require('express')

const router = express.Router()

const bcrypt = require('bcrypt');

const User = require('../model/user.model')

// GET user all
router.get('/', async (req, res) => {
    
    const user = await User.find({}).populate('authId')

    res.json(user)

})

// POST user
router.post('/', async (req, res) => {

    const passwordHash = await bcrypt.hash(req.body.password, 10)

    req.body.password = passwordHash

    const user = await User.create(req.body)

    res.json({
        msg: "Thanh Cong",
        user
    })

})

// DELETE user
router.delete('/:id', async (req, res) => {
    
    const id = req.params.id

    const user = await User.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        user
    })
    
})

module.exports = router