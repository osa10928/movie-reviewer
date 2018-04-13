const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
  
  movie_id: { type: Object, index: true },
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
    date: Date,
    body: String
  }]

})


module.exports = mongoose.model('Comment', CommentSchema);
