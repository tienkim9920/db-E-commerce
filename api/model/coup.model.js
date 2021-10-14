const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    shopId: {
        type: String,
        required: true,
        ref: 'Shop'
    },
    code: String,
    discount: Number,
    limit: Number
});

const Coup = mongoose.model('Coup', schema, 'coup');

module.exports = Coup