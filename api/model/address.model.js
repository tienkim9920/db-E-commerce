const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    shopId: {
        type: String,
        required: true,
        ref: 'Shop'
    },
    address: String,
    lat: String,
    lng: String
});

const Address = mongoose.model('Address', schema, 'address');

module.exports = Address