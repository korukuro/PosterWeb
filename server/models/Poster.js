const mongoose = require('mongoose');

const posterSchema = new mongoose.Schema({
  posterName: {
    type: String,
  },
  description: {
    type: String,
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
  },
  price: {
    type: Number,
  },
  image: {
    type: String,
  },
  size: {
    type: [String],
  },
  quantity: {
    type: Number,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  posterBoughtBy: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
  },
  rating:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Rating",
  }
});

module.exports = mongoose.model('Poster', posterSchema);