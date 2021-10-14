const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    shopId: {
        type: String,
        required: true,
        ref: 'Shop'
    },
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
});

const Reputation = mongoose.model('Reputation', schema, 'reputation');

module.exports = Reputation