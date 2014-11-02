var apiToken = require('../yo.key.js'),
  fs = require('fs-extra'),
  mkdirp = require('mkdirp'),
  path = require('path'),
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
  console.log('request received with body', req.body);

  if (!req.busboy) {
    res.sendStatus(400);
    return;
  }


  req.pipe(req.busboy);
  req.busboy.on('file', function (fieldname, file, filename) {

    //Path where image will be uploaded
    var filepath = path.join(__dirname, '../img/', filename);
    var imageDirectory = path.join(__dirname, '../img/');

    // Creates file if it doesn't exist
    mkdirp(imageDirectory, function (err) {
      if (err) {

        // Couldn't create directory
        res.sendStatus(500);
        return;
      }

      var fstream = fs.createWriteStream(filepath);
      file.pipe(fstream);
      fstream.on('close', function () {
        console.log('Upload Finished of ' + filename);
        res.sendStatus(200); //where to go next
      });
    });
  });
}
