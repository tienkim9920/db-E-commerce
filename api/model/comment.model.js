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
    },
    star: Number,
    content: String,
    createTime: String
});

const Comment = mongoose.model('Comment', schema, 'comment');

module.exports = Comment