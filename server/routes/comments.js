const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../../models/movies.js');
const imdb = require('imdb-api');
let Promise = require('promise');

const commentsRouter = (passport) => {

	router.post('/addComment', verifyUser, (req, res, next) => {

		const user = {
			username: req.body.user.username,
			picture: req.body.user.picture ? req.body.user.picture : null
		}

		const comment = {
			user: user,
			date: Date.now(),
			body: req.body.comment
		}

		const options = {
			safe: true,
			new: true
		}

		const query = {
			movieTitle: req.body.movie.movieTitle,
			imdb: req.body.movie.imdb
		}

		Movie.findOneAndUpdate(query, {$push: {"comments": comment}}, options, function(err, movie) {
			console.log(movie);
		})
	})

	return router;

}

const verifyUser = (req, res, next) => {
	
	if (req.user.username == req.body.user.username) {
		next()
	} else {
		res.status(422).send("There was a problem with the user login. Please log in again")
	}
}

module.exports = commentsRouter;