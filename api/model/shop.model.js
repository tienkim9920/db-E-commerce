const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    name: String,
    image: String,
    description: String,
    reply: Number,
    replyTime: String,
    createTime: String
});

const Shop = mongoose.model('Shop', schema, 'shop');

module.exports = Shop