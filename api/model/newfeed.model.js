const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    shopId: {
        type: String,
        required: true,
        ref: 'Shop'
    },
    productId: {
        type: String,
        required: true,
        ref: 'Product'
    },
    like: Number,
    comment: Number,
    createTime: String
});

const Newfeed = mongoose.model('Newfeed', schema, 'newfeed');

module.exports = Newfeed