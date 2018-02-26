const LocalStrategy = require('passport-local').Strategy;
const FaceBookStrategy = require('passport-facebook');
const bcrypt = require('bcrypt');
const User = require('../models/users');

module.exports = (passport) => {
	passport.use(
		'local',
		new LocalStrategy({
			usernameField: 'email',
			passwordField: 'password',
			passReqToCallback: true
		},
		function(req, username, password, done) {

			User.findOne({ 'local.email': username }, (err, user) => {
				if (err) { return done(err); }
				if (!user) {
					return done(null, false, { status:404, message:"No user found" }); 
				}
				if (!user.validPassword(password)) {
					return done(null, false, { status: 401, message: 'Incorrect password' })
				}
				return done(null, user)
			});
		}
	));

	passport.use(new FaceBookStrategy({
		clientID: process.env.FACEBOOK_CLIENT_ID,
		clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
		callbackURL: "http://localhost:8000/auth/facebook/callback"
	},

	// facebook sends back token and profile
	function(token, refreshToken, profile, done) {

		User.findOne({'facebook.id':profile.id}, (err, user) => {
			if (err) { return done(err); }
			if (user) {
				return done(null, user);
			} else {
				let newUser = new User();
				newUser.facebook.id = profile.id;
				newUser.facebook.token = token;
				newUser.facebook.name = profile.name.givenName + " " + profile.name.familyName

				newUser.save(err => {
					if (err) { throw err; }
					return done(null, newUser)
				})
			}

		})
	}
	))

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