const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    coupId: {
        type: String,
        required: true,
        ref: 'Coup'
    },
    status: Boolean
});

const Coupon = mongoose.model('Coupon', schema, 'coupon');

module.exports = Coupon