var request = require('request'),
  Doorbell = require('./doorbells.model');

var controller = {
  get: get,
  post: post
};

module.exports = controller;

////////////

var api = {
  url: 'https://api.justyo.co/yo',
  token: require('../yo.key')
};

function get(req, res) {
  console.log('got GET request with params', req.query);
  res.sendStatus(200);

  request
    .post(api.url, {
        form: {
          username: req.query.username,
          api_token: api.token
        }
      },
      function (err, response) {
        console.log('sent yo to rperryng and received', response.statusCode);
      }
  );
}

function post(req, res) {

  Doorbell.findOne({
    tesselId: req.body.tesselId
  }, onResult);

  function onResult(err, tessel) {
    if (err) {
      res.sendStatus(400);
      return;
    }

    tessel.subscribers.forEach(function (subscriber) {
      request
        .post(api.url, {
          form: {
            username: subscriber,
            api_token: api.token
          }
        }, function (err) {
          if (err) {
            console.log('got an error:', err);
          }
        });
    });

    console.log(tessel.subscribers);
    res.sendStatus(200);
  }

}
