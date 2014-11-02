var express = require('express'),
  bodyParser = require('body-parser'),
  busboy = require('connect-busboy'),
  mongoose = require('mongoose'),
  multer = require('multer'),
  doorbells = require('./doorbells'),
  socket = require('./socket');

var app = express();
var port = process.env.PORT || 80;
var portSocket = 82;

// open socket
socket.createServer(portSocket);

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(multer({
  dest: './img'
}));
// app.use(busboy());

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
