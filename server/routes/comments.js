const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
let ObjectId = require('mongoose').Types.ObjectId;
const Movie = require('../../models/movies');
const Comment = require('../../models/comments');
const imdb = require('imdb-api');
let Promise = require('promise');

const commentsRouter = (passport) => {

	router.post('/addComment', verifyUser, (req, res, next) => {

		const user = {
			username: req.body.user.username,
			picture: req.body.user.picture ? req.body.user.picture : null
		}

		let comment = new Comment()

		comment.user = user;
		comment.date = Date.now()
		comment.movie_id = new ObjectId(req.body.movie._id)
		comment.body = req.body.comment

		const options = {
			upsert: true,
			new: true
		}

		const query = { _id: req.body.movie._id }

		comment.save(function (err, comment) {

			if (err) {
				res.status(err.status).send(err.message)
			}

			Movie.findOneAndUpdate(query, {$push: {"comments": new ObjectId(comment._id)}}, options, function(err, movie) {
				
				if (err) {
					res.status(err.status).send(err.message)
				}

				refreshComments(comment.movie_id, res, next)
			})

		})

		
	})

	router.get('/getComments', (req, res, next) => {

		query = { "movie_id": new ObjectId(req.query.movie_id)}

		Comment.find(query, function(err, comments) {
			
			if (err) {
				res.status(err.status).send(err.message)
			}

			res.json(comments)
		})
	})

	router.post('/editComment', verifyUser, (req, res, next) => {
	
	
		const query = {
			"_id": new ObjectId(req.body.editedComment._id)
		}

		const update = {
			$set: {
				"body": req.body.newComment
			}
		}

		const options = {
			safe: true,
			new: true
		}

		Comment.findOneAndUpdate(query, update, options, function(err, comment) {
			
			if (err) {
				res.status(err.status).send(`Unable to edit comment: " ${err.message}`)
			}

			res.json(comment)

		})
		
	})


	router.post('/deleteComment', verifyUser, (req, res, next) => {

		const commentQuery = {
			'_id': new ObjectId(req.body.comment._id)
		}

		Comment.findOneAndRemove(commentQuery, function(err, comment) {

			if (err) return next(err);
			
			const movieQuery = {
				'_id': new ObjectId(req.body.comment.movie_id)
			} 

			const update = {
				$pull: {
					"comments": new ObjectId(req.body.comment._id)
				}
			}

			const options = {
				safe: true,
				new: true
			}

			Movie.findOneAndUpdate(movieQuery, update, options, function(err, movie) {
				if (err) {
					res.status(err.status || error.code).send(err.message)
				}

				refreshComments(new ObjectId(req.body.comment.movie_id), res, next)

			})

		})

	})


	router.post('/addReply', verifyUser, (req, res, next) => {

		const user = {
			username: req.body.user.username,
			picture: req.body.user.picture ? req.body.user.picture : null
		}

		const reply = {
			user: user,
			date: Date.now(),
			body: req.body.reply
		}

		const query = {
			"_id": new ObjectId(req.body.comment._id)
		}

		const update = {
			$push: {
				"replies": reply
			}
		}

		const options = {
			safe: true,
			new: true
		}

		Comment.findOneAndUpdate(query, update, options, function(err, comment) {
			
			if (err) {
				res.status(err.status || error.code).send(err.message)
			}

			refreshComments(new ObjectId(req.body.comment.movie_id), res, next)
		})

	})


	router.post('/editReply', verifyUser, (req, res, next) => {

		const query = {
			"_id": new ObjectId(req.body.comment._id),
			"replies._id": new ObjectId(req.body.editReply._id)
		}

		const update = {
			"replies.$.body": req.body.newReply 
		}

		const options = {
			safe: true,
			new: true
		}
		

		Comment.findOneAndUpdate(query, update, options, function(err, comment) {
			
			if (err) {
				res.status(err.status || error.code).send(err.message)
			}

			refreshComments(new ObjectId(req.body.comment.movie_id), res, next)

		})

	})

	router.post('/deleteReply', verifyUser, (req, res, next) => {

		const query = {
			"_id": new ObjectId(req.body.comment._id)
		}

		const update = {
			$pull: {
				"replies": {
					"_id": new ObjectId(req.body.reply._id)
				}
			}
		}

		const options = {
			safe: true,
			new: true
		}

		Comment.findOneAndUpdate(query, update, options, function(err, comment) {

			if (err) {
				res.status(err.status || err.code).send(err.message)
			}

			refreshComments(new ObjectId(req.body.comment.movie_id), res, next)

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

function refreshComments (movie_id, res, next) {

	query = { "movie_id": movie_id}

	Comment.find(query, function(err, comments) {
			
		if (err) {
			res.status(err.status || err.code).send(err.message)
		}

		res.json(comments)
	})

}

module.exports = commentsRouter;