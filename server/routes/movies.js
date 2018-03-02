const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Movie = require('../../models/movies.js');
const imdb = require('imdb-api');
let Promise = require('promise');

const movieRouter = (passport) => {


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

	router.post("/addmovie", (req, res, next) => {
		createMovieObject(req.body)
			.then(movie => {
				Movie.findOne({'imdb':movie['imdb']})
					.then(foundMovie => {
						if (foundMovie) {
							res.status(422).send("This movie already exist. Please Double check the IMDb ID");
							return
						}
						let query = {'imdb':movie['imdb']},
							options = {'upsert':true, 'new':true}
						Movie.findOneAndUpdate(query, movie, options, function(err, movie) {
							if (err) return next(err);
							console.log(movie)
							res.json(movie)
						})
					})
			})
			.catch(err => {console.log(err)})
	})

	return router

}


function createMovieObject(data) {
	let movie = new Movie();
	const attributes = ["movieTitle", "year", "imdb", "trailer", "reviewTitle", "reviewClip", "reviewSumary", "reviewScore", "bestWeek", "bestMonth"];
	for (let i=0;i<data.length;i++) {
  		movie[attributes[i]] = data[i];
  	}
  	movie['createdAt'] = Date.now();
  	if (movie["imdb"]) {
  		return new Promise((resolve, reject) => {
  			imdb.getById(movie["imdb"], { apiKey: process.env.OMDB_KEY })
  			.then(movieData => {
  				//console.log(movieData)
  				movie['imdbRating'] = +movieData['rating'];
  				movie['poster'] = movieData['poster'];
  				resolve(movie)
  			})
  			.catch(err => reject(err))

  		})
  	} else {
  		return new Promise((resolve, reject) => {
  			return movie
  		})
  	}
}


module.exports = movieRouter;
