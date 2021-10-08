const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    roomId: {
        type: String,
        required: true,
        ref: 'Room'
    },
    subjectId: {
        type: String,
        required: true,
    },
    status: Boolean,
    count: Number
});

const Checking = mongoose.model('Checking', schema, 'checking');

module.exports = Checking