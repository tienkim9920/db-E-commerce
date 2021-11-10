const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    productId: {
        type: String,
        required: true,
        ref: 'Product'
    },
    size: String,
    count: Number
});

const Option = mongoose.model('Option', schema, 'option');

module.exports = Option