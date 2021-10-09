const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    description: String,
    value: Number
});

const Tick = mongoose.model('Tick', schema, 'tick');

module.exports = Tick