const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const favicon = require('serve-favicon');
const logger = require('morgan');
const app = express();
const cookieParser = require('cookie-parser')
const bluebird = require('bluebird')

let mongoose = require('mongoose');
mongoose.Promise = bluebird;
mongoose.connect('mongodb://localhost/movieReview', { promiseLibrary: bluebird})
  .then(() => console.log('connection successful'))
  .catch((err) => console.error(err));

// API file for interacting with MongoDB
const moviesApi = require('./server/routes/movies');



// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'dist')));

// API location
app.use('/api', moviesApi);

// Send all other requests to the Angular app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname,'dist/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 var err = new Error('Not Found');
 err.status = 404;
 next(err);
});

// error handler
app.use(function(err, req, res, next) {
 // set locals, only providing error in development
 res.locals.message = err.message;
 res.locals.error = req.app.get('env') === 'development' ? err : {};

 // render the error page
 res.status(err.status || 500);
 res.render('error');
});


// Set export
const port = process.env.PORT || '3000';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`Running on localhost ${port}`));
