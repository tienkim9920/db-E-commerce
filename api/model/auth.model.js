const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    auth: String
});

const Auth = mongoose.model('Auth', schema, 'auth');

module.exports = Auth