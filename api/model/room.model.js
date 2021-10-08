const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    clientId: {
        type: String,
        required: true,
        ref: 'Client'
    },
    shopId: {
        type: String,
        required: true,
        ref: 'Shop'
    }
});

const Room = mongoose.model('Room', schema, 'room');

module.exports = Room