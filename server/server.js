var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose');

var app = express();
var port = process.env.PORT || 80;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Hello from the server');
});

app.get('/events', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.status(200).send('Woah a different route!!!');
});

// No other middleware handled the request
app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, function () {
  console.log('Hacking happens on port', port);
});
