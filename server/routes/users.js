const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../../models/users.js');
let bcrypt = require('bcrypt');
const saltRounds = 10;
const flash = require('flash');


const userRouter = (passport) => {

	router.post('/register', (req, res, err) => {
		const username = req.body.username;
		const password = req.body.password;

		bcrypt.genSalt(saltRounds, (err, salt) => {
			bcrypt.hash(password, salt, (err, hash) => {
				user = new User({ 'username' : username, 'password': hash })
				user.save((err) => {
					if (err && err.code != 11000) {
						console.log(err.message);
						console.log(err.code);
						res.status(500);
						res.send('An unexpected error showed up');
						return;
					}

					if (err && err.code == 11000) {
						console.log(err.message);
						res.status(422).send(err);
						return
					}
					req.login(user, (err) => {
						console.log(res)
						res.json(user)
					})
				})
			})
		})
	})

	return router;
}

module.exports = userRouter;