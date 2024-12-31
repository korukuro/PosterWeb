const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
  posterName: {
    type: String,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
  },
  image: {
    type: Number,
  },
  size: {
    type: [Number],
  },
  quantity: {
    type: Number,
  },
});

module.exports = mongoose.model('Poster', posterSchema);