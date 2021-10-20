const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    from: Number,
    to: Number,
    price: Number
});

const Distance = mongoose.model('Distance', schema, 'distance');

module.exports = Distance