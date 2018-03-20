const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../../models/movies.js');
const User = require('../../models/users.js');

const searchRouter = () => {

	router.get('/movies', (req, res, next) => {
		const terms = req.query.terms
		Movie.find({$text: {$search: terms}})
			.limit(10)
			.exec(function(err, products) {
				if (err) { return next(err) }
				res.json(products);
			});
	})

	router.get('/users', (req, res, next) => {
		const terms = req.query.terms
		User.find({$text: {$search: terms}})
			.limit(20)
			.exec(function(err, products) {
				if (err) { return next(err) }
					res.json(products);
			})
	})

	return router
}

module.exports = searchRouter;