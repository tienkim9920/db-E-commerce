const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    name: String,
    description: String,
    value: Number,
    status: Boolean
});

const Ticket = mongoose.model('Ticket', schema, 'ticket');

module.exports = Ticket