const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../../models/movies.js');


router.get('/movies', (req, res, next) => {
  Movie.find(function(err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/movie', (req, res, next) => {
	const title = req.query.title;
	const year = parseInt(req.query.year);
	Movie.findOne({ 'title': title, 'year': year }, function(err, product) {
		if (err) return next(err);
		res.json(product);
	})
})


module.exports = router;
