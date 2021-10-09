const Client = require('../model/client.model')

const express = require('express')

const router = express.Router()

// GET client all
router.get('/', async (req, res) => {
    res.json('list client')
})

module.exports = router