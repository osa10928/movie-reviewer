const localStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('../models/users');

module.exports = (passport) => {
	passport.use(
		'local',
		new localStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, email, password, done) {

			User.findOne({ 'local.email': email }, (err, user) => {
				if (err) { return done(err); }
				if (user) {
					return done(null, false); 
				} else {
					const newUser = new User()
					newUser.local.email = email
					newUser.local.password = newUser.generateHash(password)

					newUser.save((err) => {
						if (err) {
							throw err
						}
						return done(null, newUser)
					})
				}
			});
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	})

	passport.deserializeUser((id, done) => {
		 User.findById(id, function(err, user) {
            done(err, user);
        });
	})

	return passport
}

;