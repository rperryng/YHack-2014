var express = require('express'),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  doorbells = require('./doorbells'),
  socket = require('./socket'),
  timeout = require('connect-timeout');

var app = express();
var port = process.env.PORT || 80;

// open socket
socket.connectToSocket();

// mongodb
mongoose.connect('mongodb://104.236.63.85:27017/yhack');

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(timeout(99999999));

app.use('/client', express.static(__dirname + '/client'));

// routes
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/client/index.html');
});

app.use(doorbells);

// No other middleware handled the request
app.use(function (req, res) {
  res.sendStatus(404);
});

app.listen(port, function () {
  console.log('Hacking happens on port', port);
});
