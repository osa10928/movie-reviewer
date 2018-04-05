const mongoose = require('mongoose');

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
  comments: [{

    user: {
      username: String,
      picture: String
    },
    date: Date,
    body: String,
    replies: [{
      user:{
        username: String,
        picture: String
      },
      date: Date
    }]

  }]
})


module.exports = mongoose.model('Movie', MovieSchema);
