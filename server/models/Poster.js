const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
  posterName: String,
  description: String,
  image: String,
  price: Number,
  quantity: Number,
  size: [String]
});

module.exports = mongoose.model('Poster', posterSchema);