const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    phone: String,
    address: String
});

const Note = mongoose.model('Note', schema, 'note');

module.exports = Note