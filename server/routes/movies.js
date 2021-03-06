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
		const movieTitle = req.query.movieTitle;
		const year = parseInt(req.query.year);
		Movie.findOne({ 'movieTitle': movieTitle, 'year': year }, function(err, product) {
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
							options = {upsert:true, new:true}
						Movie.findOneAndUpdate(query, movie, options, function(err, movie) {
							if (err) return next(err);
							console.log(movie)
							res.json(movie)
						})
					})
			})
			.catch(err => {console.log(err)})
	})

	router.delete("/deletemovie", (req, res, next) => {
		let query = {'imdb':req.query['imdb'], 'movieTitle':req.query["movieTitle"]}
		Movie.findOneAndRemove(query, function(err, doc) {
			if (err) return next(err);
			if (doc) return res.json(doc);
			res.status(422).send("This movie does not exist in the database")
		})
	})

	router.post("/editmovie", (req, res, next) => {
		oldMovie = req.body[1]
		createMovieObject(req.body[0])
			.then(movie => {
				let keys = Object.keys(movie._doc), editMovie = {}
				for (let key of keys) {
					if (key != '_id'){
						editMovie[key] = movie[key]
					}
				}
				let query = {'imdb':oldMovie['imdb']},
					options = {'upsert':false, 'overwrite':true}
				Movie.findOneAndUpdate(query, editMovie, options, function(err, movie) {
					if (err) return next(err);
					//console.log(movie)
					res.json(movie)
				})
			})
	})

	return router

}


function createMovieObject(data) {
	let movie = new Movie();
	const attributes = ["movieTitle", "year", "imdb", "trailer", "reviewTitle", "reviewClip", "reviewSummary", "reviewScore", "bestWeek", "bestMonth"];
	for (let i=0;i<attributes.length;i++) {
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
