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

module.exports = router;
