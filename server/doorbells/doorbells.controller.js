var request = require('request'),
  Doorbell = require('./doorbells.model');

var controller = {
  create: create,
  notify: notify,
  weather: weather,
  yoCallback: yoCallback
};

module.exports = controller;

////////////

var currentTemp;

var api = {
  url: 'https://api.justyo.co/yo',
  token: require('../yo.key')
};

function yoCallback(req, res) {

  var name = req.query.username;

  Doorbell.findOne({
    subscribers: name
  }, function (err, doorbell) {
    if (err) {
      res.sendStatus(500);
      return;
    }

    submitYoLink(name);
    console.log('the requested temperature is', currentTemp);
    res.sendStatus(200);
  });

  //  submitYo(req.query.username);
}

function notify(req, res) {

  Doorbell.findOne({
    tesselId: req.body.tesselId
  }, onResult);

  function onResult(err, tessel) {
    if (err) {
      res.sendStatus(400);
      return;
    }

    tessel.subscribers.forEach(function (subscriber) {
      submitYo(subscriber);
    });

    console.log(tessel.subscribers);
    res.sendStatus(200);
  }
}

function create(req, res) {
  var doorbell = new Doorbell(req.body);

  doorbell.save(function (err, result) {
    if (err) {
      res.sendStatus(400);
      return;
    }

    res.sendStatus(200);
  });
}

function weather(req, res) {

  // save the weather...
  currentTemp = req.body.temp;
  console.log('new temp is', currentTemp);
}

function submitYo(username) {
  request
    .post(api.url, {
        form: {
          username: username,
          api_token: api.token
        }
      },
      function (err, response) {
        console.log('sent yo to', username, 'and received', response.statusCode);
      }
  );
}
function submitYoLink(username) {
  request
    .post(api.url, {
        form: {
          username: username,
          api_token: api.token,
          link: 'http://rperrynguyen.me/temperature/:' + currentTemp
        }
      },
      function (err, response) {
        console.log('sent yo to', username, 'and received', response.statusCode);
      }
  );
}
