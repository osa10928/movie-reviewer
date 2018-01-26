const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: String,
  year: Number,
  imdb: String,
  trailer: String,
  reviewClip: String,
  reviewSummary: String,
  reviewScore: Number,
  createdAt: Date,
  bestWeek: Boolean,
  bestMonth: Boolean
})

module.exports = mongoose.model('Movie', MovieSchema);
