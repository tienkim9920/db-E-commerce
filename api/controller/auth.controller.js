const Auth = require('../model/auth.model')

const express = require('express')

const router = express.Router()

// GET auth
router.get('/', async (req, res) => {
    res.json('list auth')
})

module.exports = router