const mongoose = require('mongoose');
const Comment = require('./comments')

const MovieSchema = new mongoose.Schema({
  movieTitle: {type: String, text: true},
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
  poster: String,
  comments: [String]
})


module.exports = mongoose.model('Movie', MovieSchema);
