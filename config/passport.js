let passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passportApp = () => {
	passport.use(new localStrategy(
		(username, password, done) => {
			User.findOne({ username: username }, (err, user) => {
				if (err) { return done(err); }
				if (!user) {return done(null, false); }
				if (!user.verifyPassword(password)) { return done(null, false); }
				return done(null, user);
			});
		}
	));

	passport.serializeUser((user, done) => {
		done(null, user.id);
	})

	passport.deserializeUser((obj, done) => {
		done(err, user)
	})

	return passport
}

module.exports = passport;