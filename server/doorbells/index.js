var express = require('express'),
  doorbellsController = require('./doorbells.controller');

var app = module.exports = express();

app.get('/api/notify', function (req, res) {
  doorbellsController.yoCallback(req, res);
});

app.post('/api/notify', function (req, res) {
  doorbellsController.notify(req, res);
});

app.post('/api/doorbells', function (req, res) {
  doorbellsController.create(req, res);
});

app.post('/api/weather', function (req, res) {
  doorbellsController.weather(req, res);
});
