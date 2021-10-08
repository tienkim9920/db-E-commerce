const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    productId: {
        type: String,
        required: true,
        ref: 'Product'
    },
    userId: {
        type: String,
        required: true,
        ref: 'User'
    }
});

const Like = mongoose.model('Like', schema, 'like');

module.exports = Like