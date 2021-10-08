const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    authId: {
        type: String,
        required: true,
        ref: 'Auth'
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    image: String,
    score: Number
});

const User = mongoose.model('User', schema, 'user');

module.exports = User