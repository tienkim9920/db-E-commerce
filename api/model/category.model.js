const mongoose = require('mongoose');
const { Schema } = mongoose;

const schema = new Schema({
    name: String,
    image: String
});

const Category = mongoose.model('Category', schema, 'category');

module.exports = Category