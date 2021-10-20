const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    noticeClient: Number,
    noticeShop: Number
});

const Checking = mongoose.model('Checking', schema, 'checking');

module.exports = Checking