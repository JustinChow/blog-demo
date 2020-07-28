require('dotenv').config()
require('./lib/passport');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var cors = require('cors');

var apiRouter = require('./routes/api');

var app = express();

// MongoDB Setup
const mongoDB = process.env.MONGODB_URL;
mongoose.connect(mongoDB, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongo connection error'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// when going to `/admin`, serve the admin frontend files as static files
app.use('/admin', express.static(path.join(__dirname, '../blog-frontend-admin/build')));

// Serve public frontend
app.use(express.static(path.join(__dirname, '../blog-frontend-public/build')));

// Serve API routes
app.use('/api', apiRouter);

// Serve admin frontend
app.get('/admin/*', (req, res) => {
    console.log("adminadminadminadmi");
    res.sendFile(path.join(__dirname + '/../blog-frontend-admin/build/index.html'));
});

// "catchall" frontend handler to direct to public index.html file
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/../blog-frontend-public/build/index.html'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

module.exports = app;
