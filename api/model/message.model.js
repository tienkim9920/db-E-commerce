const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    subjectId: {
        type: String,
        required: true
    },
    roomId: {
        type: String,
        required: true,
        ref: 'Room'
    },
    message: String
});

const Message = mongoose.model('Message', schema, 'message');

module.exports = Message