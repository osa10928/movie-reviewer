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


	router.post('/logout', (req, res, next) => {
		console.log(req.user)
		req.logout()
		if (req.user) {
			res.status(401).send('Unable to log the user out')
		} else {
			res.json({"success":"User logged out"})
		}
	})

	router.get('/admin/getAll', isAdmin, (req, res, next) => {
		User.find().sort({'username':1})
			.exec(function(err, docs) {
				if (err) return next(err)
				if (docs) return res.json(docs)
			})
	})

	router.delete('/admin/deleteOne', isAdmin, (req, res, next) => {
		console.log(req.query)
		if (req.query.username === 'stephen') {
			res.status(401).send("Unable to delete the main administrator")
		}
		let query = {'_id': req.query['_id']}
		User.findOneAndRemove(query, function(err, doc) {
			if (err) return next(err);
			if (doc) return res.json(doc);
		})

	})

	router.delete('/admin/deleteMany', isAdmin, (req, res, next) => {
		let users = req.query.users.split(',')
		if (users.indexOf('stephen') > -1) { users.splice(users.indexOf('stephen'), 1)}
			const toDelete = users.length
		const query = {'username':{ $in: users }}
		User.remove(query, function(err, docs) {
			if (err) return next(err)
			deletedDocs = docs.n
			if (deletedDocs === toDelete) return res.json('Deleted All Selected Users')
			if (deletedDocs === 0) return res.json('Sorry, was unable to delete any Users')
			res.json(`Sorry, could only delete ${deletedDocs} of ${toDelete} Users`)
		})
	})


	return router;
}

const isAdmin = (res, req, next) => {
	if (req.user && req.user.admin) {
		next()
	} else {
		res.status(401).send("Only an administrator can perform this action");
	}
}

module.exports = userRouter;