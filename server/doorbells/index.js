var express = require('express'),
  doorbellsController = require('./doorbells.controller');

var app = module.exports = express();

app.get('/api/doorbells', function (req, res) {
  doorbellsController.get(req, res);
});
