const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    shopId: {
        type: String,
        required: true,
        ref: 'Shop'
    },
    categoryId: {
        type: String,
        required: true,
        ref: 'Category'
    },
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        require: true
    },
    image: Array,
    discount: Number,
    like: Number,
    comment: Number,
    expiredTime: Number
});

const Product = mongoose.model('Product', schema, 'product');

module.exports = Product