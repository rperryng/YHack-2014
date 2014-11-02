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

var weatherRequest;
var justHackIt = true;

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
      if (weatherRequest) {
        weatherRequest.sendStatus(500);
        return;
      }
      res.sendStatus(400);
      return;
    }

    if (weatherRequest) {
      weatherRequest.sendStatus(200);
    } else {
      console.log('no weather request to submit...');
    }
  });

  submitYo(req.query.username);
  res.sendStatus(200);
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
  console.log('storing ref of request');
  weatherRequest = res;

  console.log('request stored:', (weatherRequest !== undefined && weatherRequest !== null));

  if (justHackIt) {
    justHackIt = false;
    return;
  }

  Doorbell.findOne({
    tesselId: req.body.tesselId
  }, onResult);

  function onResult(err, tessel) {
    if (err) {
      console.log('aw man', err);
      res.sendStatus(400);
      return;
    }

    console.log('lol it worked', tessel);

    tessel.subscribers.forEach(function (subscriber) {
      console.log('about to alert', subscriber);
      submitYo(subscriber);
    });

    console.log('received weather with temp:', req.body.temp);

    // keep request open
  }
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
