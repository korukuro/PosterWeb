const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
  posterName: String,
  image: String, // URL
  description: String,
  price: Number,
});

module.exports = mongoose.model('Poster', posterSchema);