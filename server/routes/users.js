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
		const picture = req.body.picture;

		let user = new User();
		user.local.email = email;
		user.local.password = user.generateHash(password);
		user.local.picture = picture;
		user.username = email;
		email === "stephen" ? user.admin = true : user.admin = false;
		// TODO: Get rid of above line in favor of populat when shipping project

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
				let returnUser = {
					username: req.user.local.email,
					picture: req.user.local.picture,
					admin: req.user.admin
				}
				console.log(returnUser)
				res.json(returnUser)
			})
		})
	})

/* Save Facebook login for production 

	router.get('/auth/facebook', passport.authenticate('facebook', {
		scope: ['email', 'photos']
	}))

	router.get('auth/facebook/callback', (req, res, next) => {
		passport.authenticate('facebook', (err, user, info) => {
			if (err) {
				console.log(err)
				return next(err);
			}
			res.json(req.user)
		})(req, res, next)
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
			req.login(user, (err) => {
				if (err) {
					console.log(err)
					return next(err)
				}
			})
			let returnUser = {
				username: req.user.local.email,
				picture: req.user.local.picture,
				admin: req.user.admin
			}
			console.log(returnUser)
			res.json(returnUser)
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
		} else {
			res.json({"success":"User logged out"})
		}
	})


	return router;
}

module.exports = userRouter;