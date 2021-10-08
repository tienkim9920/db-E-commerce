const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    payment: String
});

const Pay = mongoose.model('Pay', schema, 'pay');

module.exports = Pay