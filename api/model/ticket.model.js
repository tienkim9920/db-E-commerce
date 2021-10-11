const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    // userId: {
    //     type: String,
    //     required: true,
    //     ref: 'User'
    // },
    // tickId: {
    //     type: String,
    //     required: true,
    //     ref: 'Tick'
    // },
    status: Boolean
});

const Ticket = mongoose.model('Ticket', schema, 'ticket');

module.exports = Ticket