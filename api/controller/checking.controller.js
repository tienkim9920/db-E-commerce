const Checking = require('../model/checking.model')

const express = require('express')

const router = express.Router()

// GET checking all
router.get('/', async (req, res) => {
    res.json('list checking')
})

module.exports = router