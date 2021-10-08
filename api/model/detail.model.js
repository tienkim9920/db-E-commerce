const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    productId: {
        type: String,
        required: true
    },
    orderId: {
        type: String,
        required: true
    },
    count: Number,
    size: String,
    update: Boolean
});

const Detail = mongoose.model('Detail', schema, 'detail');

module.exports = Detail