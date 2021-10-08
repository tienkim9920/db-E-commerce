const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    payId: {
        type: String,
        required: true,
        ref: 'Pay'
    },
    noteId: {
        type: String,
        required: true,
        ref: 'Note'
    },
    shopId: {
        type: String,
        required: true,
        ref: 'Shop'
    },
    total: Number,
    status: String,
    pay: Boolean,
    createTime: String
});

const Order = mongoose.model('Order', schema, 'order');

module.exports = Order