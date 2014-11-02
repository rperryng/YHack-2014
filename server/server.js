var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  doorbells = require('./doorbells'),
  socket = require('./socket');

var app = express();
var port = process.env.PORT || 80;

// open socket
socket.createServer();

// mongodb
mongoose.connect('mongodb://104.236.63.85:27017/yhack');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.use(doorbells);

// No other middleware handled the request
app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, function () {
  console.log('Hacking happens on port', port);
});
