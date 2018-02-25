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
		function(req, username, password, done) {

			User.findOne({ 'local.email': username }, (err, user) => {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { message:"there user with this email" }); 
				}
				if (!user.validPassword(password)) {
					return done(null, false, { message: 'Incorrect password' })
				}
				return done(null, user)
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