const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    limit: Number,
    code: String,
    statusOrder: Boolean
});

const Client = mongoose.model('Client', schema, 'client');

module.exports = Client