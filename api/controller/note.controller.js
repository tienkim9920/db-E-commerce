const express = require('express')

const router = express.Router()

const Note = require('../model/note.model')

// GET note all
router.get('/', async(req, res) => {

    const note = await Note.find({})

    res.json(note)

})

// POST note
router.post('/', async(req, res) => {

    const note = await Note.create(req.body)

    res.json({
        msg: "Thanh Cong",
        result: note
    })

})

// DELETE note
router.delete('/:id', async(req, res) => {

    const id = req.params.id

    const note = await Note.deleteOne({ _id: id })

    res.json({
        msg: "Thanh Cong",
        note
    })

})

module.exports = router