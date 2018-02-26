const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/users.js');
let bcrypt = require('bcrypt');
const saltRounds = 10;
const flash = require('flash');


const userRouter = (passport) => {

	router.post('/register', (req, res, err) => {

		const email = req.body.email;
		const password = req.body.password;

		let user = new User();
		user.local.email = email;
		user.local.password = user.generateHash(password);

		user.save(err => {
			console.log(user)
			console.log(err)
			if (err && err.code != 11000) {
				console.log(err.message);
				console.log(err.code);
				res.status(500);
				res.send('An unexpected error showed up');
				return;
			}

			if (err && err.code == 11000) {
				console.log(err.message);
				res.status(422).send("This username is already registered");
				return
			}
			req.login(user, (err) => {
				if (err) {
					console.log(err)
					return next(err)
				}
				console.log(user)
				res.json(user)
			})
		})
	})
/*
	router.post('/login', (req, res) => {
		console.log(req)
		res.json({"email":"stephen", "password":"djdhfjf"})
	})
*/

	router.post('/login', (req, res, next) => {
		passport.authenticate('local', function(err, user, info) {
			if (err) {
				console.log(err)
				return next(err);
			}
			if (!user) {
				res.status(info.status).send(info.message)
				return
			}
			res.json(req.user)
		})(req, res, next);
	})


	router.post('/logout', (req, res) => {
		console.log(req.user)
		req.logout()
		if (req.user) {
			console.log('error')
			let err = new Error()
			err.status = 401
			err.message("unable to log user out")
			res.send(err)
		}
		res.json({"success":"User logged out"})
	})

	function beforeLogin(req, next) {
		req.logout()
		return next()
	}

	return router;
}

module.exports = userRouter;