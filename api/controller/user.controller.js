const express = require('express')

const router = express.Router()

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const User = require('../model/user.model')

// GET user all
router.get('/', async(req, res) => {

    const user = await User.find({}).populate('authId')

    res.json(user)

})

// POST user
router.post('/', async(req, res) => {

    const passwordHash = await bcrypt.hash(req.body.password, 10)

    req.body.password = passwordHash

    const user = await User.create(req.body)

    res.json({
        msg: "Thanh Cong",
        user
    })

})

router.post('/login', async(req, res) => {

    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email: email }).populate(['authId'])

    if (user === null) {
        res.json({ msg: "Không Tìm Thấy User" })
    } else {

        const auth = await bcrypt.compare(password, user.password)

        if (auth) {
            var token = jwt.sign({ user: user }, 'shhhhh');

            var decoded = jwt.verify(token, 'shhhhh');
            console.log(decoded.user)

            res.json({ 
                msg: "Đăng nhập thành công", 
                jwt: token 
            })
        } else {
            res.json({ 
                msg: "Sai mật khẩu"
            })
        }
    }
})

// DELETE user
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const user = await User.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        user
    })

})

module.exports = router