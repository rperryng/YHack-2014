var request = require('request');
var apiToken = require('../yo.key.js');

module.exports.get = function (req, res) {
  console.log('got request with params', req.query);
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
};
