const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const flash = require('flash');
const cookieParser = require('cookie-parser');
const bluebird = require('bluebird');
const session = require('express-session');
const passport = require('./config/passport.js');
const MongoStore = require('connect-mongo')(session);

const app = express();

let mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/movieReview', { promiseLibrary: bluebird})
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

// API file for interacting with MongoDB
const moviesApi = require('./server/routes/movies');
const usersApi = require('./server/routes/users')



// Parsers
app.use(express.static(path.join(__dirname, 'dist')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// TODO: Research more session options as they relate to production
app.use(session({ 
	secret: "vegeta",
	store: new MongoStore({ mongooseConnection: mongoose.connection }),
	saveUninitialized: false,
	resave: false

}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


app.use(logger('dev'));

// Cors: Allow no one
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET", "POST", "PUT", "DELETE", "OPTIONS");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Angular DIST output folder

// API location
app.use('/api', moviesApi);
app.use('/users', usersApi(passport));

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});


// catch 404 and forward to error handler
app.use((req, res, next) => {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});

// error handler
app.use((err, req, res, next) => {
 // set locals, only providing error in development
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
});


// Set port
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost ${port}`));
