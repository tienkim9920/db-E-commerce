const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    name: String,
    address: String,
    description: String,
    reply: Number,
    replyTime: String,
    lat: String,
    lng: String,
    createTime: String
});

const Shop = mongoose.model('Shop', schema, 'shop');

module.exports = Shop