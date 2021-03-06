var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');

var index = require('./routes/index');
var auth = require('./routes/auth');
var postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const usersRouter = require('./routes/users');

const { sequelize } = require('./models');

var app = express();


sequelize.sync({force: false})
  .then(() => {
    console.log('database connection success');
  })
  .catch((err) => {
    console.error(err);
  });

  
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', index);
app.use('/auth', auth);
app.use('/post', postRouter);
app.use('/posts', postsRouter);
app.use('/users', usersRouter);

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

module.exports = app;
