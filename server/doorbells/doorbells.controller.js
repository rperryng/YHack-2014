var apiToken = require('../yo.key.js'),
  request = require('request');

var controller = {
  get: get,
  post: post
};

module.exports = controller;

////////////

function get(req, res) {
  console.log('got GET request with params', req.query);
  res.sendStatus(200);

  request
    .post('https://api.justyo.co/yo', {
        form: {
          username: req.query.username,
          api_token: apiToken
        }
      },
      function (err, response) {
        console.log('sent yo to rperryng and received', response.statusCode);
      }
  );
}

function post(req, res) {
  console.dir(req.files);
  res.sendStatus(200);
}
