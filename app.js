'use strict';

const express = require('express');
const app = express();
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
const cookieSecret = 'fgg87488s';
app.use(cookieParser(cookieSecret));

app.set('view engine', 'jade')
app.set('x-powered-by', false)

// stateless routes (no session)
app.use('/check',     require('./routes/check'));

// Setup session
const sessionOpt = {
  name: "sesstoken",
  proxy: true,
  resave: true,
  ttl: 36000,
  saveUninitialized: true,
  secret: cookieSecret
}

// Session
app.use(session(sessionOpt))


/*==============================
=            Routes            =
==============================*/

app.use('/*', function(req, res, next) {
  const sess = req.session;
  next();
});

app.use('/post_call', require(__dirname + '/routes/post_call'))
app.use('/delete_call', require(__dirname + '/routes/delete_call'))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*=====  End of Routes  ======*/
const serve = app.listen(4123, function() {
  const host = serve.address().address;
  const port = serve.address().port;

  console.log('lListening at http://%s:%s', host, port);
});
