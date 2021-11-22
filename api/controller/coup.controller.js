const express = require('express')

const router = express.Router()

const Coup = require('../model/coup.model')

// GET Coup all
router.get('/', async(req, res) => {

    const coup = await Coup.find({});

    res.json(coup)

})

// GET all coup of shop by shopId
router.get('/detail/:shopId', async (req, res) => {
    
    const { shopId } = req.params

    const coup = await Coup.find({ shopId });
    
    res.json(coup)

})

// POST Coup
router.post('/', async(req, res) => {


    const coup = await Coup.create(req.body)

    res.json({
        msg: "Code 200",
        coup
    })

})

// Update coup of shop 

router.patch('/:id', async (req,res) =>{

    const _id = req.params.id
    const body = req.body

    const coupPatch = await Coup.findByIdAndUpdate(_id,body)

    
    res.json({
        msg: "Update coup of shop success",
        coupPatch
    })
    
   
})


// DELETE Coup
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const coup = await Coup.deleteOne({ _id: id})

    res.json({
        msg: "Code 200",
        coup
    })

})

// Checking Discount Coup By Code
router.get('/:code', async (req, res) => {

    const { code } = req.params

    const coup = await Coup.findOne({ code })

    res.json(coup)
    
})


module.exports = router