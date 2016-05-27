var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var mongodb = require('mongodb');
var mongoGrid = mongodb.Grid;


var pmpdata = require('./routes/index');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

var monk = require('monk');
var db = monk('127.0.0.1:27017/pmpdb')

// Make our db accessible to our router
app.use(function(req,res,next){
    req.db = db;
    next();
});

app.use(function(req,res,next){
    req.dbGrid = mongoGrid;
    next();
});

app.use(function(req,res,next){
    req.session = session;
    next();
});


// Routing the REST services
app.use('/', pmpdata);
app.use('/users', users);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}


// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
