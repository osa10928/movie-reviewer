const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  movieTitle: String,
  year: Number,
  imdb: String,
  imdbRating: Number,
  trailer: String,
  reviewTitle: String,
  reviewClip: String,
  reviewSummary: String,
  reviewScore: Number,
  createdAt: Date,
  bestWeek: Boolean,
  bestMonth: Boolean,
  poster: String
})


module.exports = mongoose.model('Movie', MovieSchema);
