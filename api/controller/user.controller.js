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

//GET user detail
router.get('/:id', async (req, res) => {

    const { id } = req.params

    const user = await User.findOne({ _id: id })

    res.json(user)

})

// POST user
router.post('/', async (req, res) => {

    const { email } = req.body

    const user = await User.findOne({ email })

    if (user){
        res.json({
            msg: "Email was existed"
        })
    }else{
        const passwordHash = await bcrypt.hash(req.body.password, 10)

        req.body.password = passwordHash
    
        const user = await User.create(req.body)

        res.json({
            msg: "Code 200",
            userId: user._id
        })
    }

})

router.post('/login', async(req, res) => {

    const email = req.body.email
    const password = req.body.password

    const user = await User.findOne({ email: email }).populate(['authId'])

    if (user === null) {
        res.json({ msg: "Code 404" })
    } else {

        const auth = await bcrypt.compare(password, user.password)

        if (auth) {
            var token = jwt.sign({ user: user }, 'shhhhh');

            var decoded = jwt.verify(token, 'shhhhh');
            console.log(decoded.user)

            res.json({ 
                msg: "Code 200", 
                jwt: token,
                userId: user._id,
                permission: user.authId.auth,
                name: user.name,
                image: user.image
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

// PATCH update profile user
router.patch('/update/:id', async (req, res) => {

    const { id } = req.params;

    const user = await User.findOne({ _id: id })

    if (req.body.checking === 'true'){
        var fileImage = req.files.file;

        var fileName = fileImage.name
    
        // var fileProduct = "https://server-lover.herokuapp.com/" + fileName
        var fileUser = "http://localhost:4000/" + fileName

        user.image = fileUser

        // move file name in folder public
        fileImage.mv('./public/' + fileName)
    }

    user.name = req.body.name

    user.save()

    res.json({
        msg: "Code 200",
    })

})

module.exports = router