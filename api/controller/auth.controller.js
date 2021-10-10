const express = require('express')

const router = express.Router()

const Auth = require('../model/auth.model')

// GET auth all
router.get('/', async (req, res) => {
    
    // const auth = await Auth.find({})

    res.json("Thanh Cong")

})

router.post('/', async (req, res) => {

    // await Auth.create(req.body)

    // res.json("Thanh Cong")

})

module.exports = router