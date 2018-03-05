const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../../models/movies.js');


const searchRouter = () => {

	router.get('/basic', (req, res, next) => {
		const terms = req.query.terms
		Movie.find({$text: {$search: terms}})
			.limit(10)
			.exec(function(err, products) {
				if (err) { return next(err) }
				res.json(products);
			});
	})

	return router
}

module.exports = searchRouter;