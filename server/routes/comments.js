const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let ObjectId = require('mongoose').Types.ObjectId;
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
			if (err) {
				res.status(err.status).send(err.message)
			}
			res.json(movie.comments)
		})
	})

	router.post('/editComment', verifyUser, (req, res, next) => {
	
		const query = {
			imdb: req.body.movie.imdb,
			"comments._id": new ObjectId(req.body.editedComment._id)
		}

		const update = {
			$set: {
				"comments.$.body": req.body.newComment
			}
		}

		const options = {
			safe: true,
			new: true
		}

		Movie.findOneAndUpdate(query, update, options, function(err, movie) {
			
			if (err) {
				res.status(err.status).send(`Unable to edit comment: " ${err.message}`)
			}

			comments = movie.comments

			for (comment of comments) {
				
				if (comment._id == req.body.editedComment._id) {
					res.json(comment)
					break
				}
			}
		})
		
	})

	router.post('/deleteComment', verifyUser, (req, res, next) => {

			const query = {
				imdb: req.body.movie.imdb,

			}

			const update = {
				$pull: {
					"comments": {
						"_id": new ObjectId(req.body.comment._id)
					}
				}
			}

			const options = {
				safe: true,
				new: true
			}

			Movie.findOneAndUpdate(query, update, options, function(err, movie) {
				if (err) {
					res.status(err.status || error.code).send(err.message)
				}
				res.json(movie.comments)
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