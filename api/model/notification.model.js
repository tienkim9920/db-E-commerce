const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    userId: {
        type: String,
        required: true,
        ref: 'User'
    },
    description: String
});

const Notification = mongoose.model('Notification', schema, 'notification');

module.exports = Notification