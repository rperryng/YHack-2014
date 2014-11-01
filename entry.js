var tessel = require('tessel');
var wifi = require('wifi-cc3000');
var needle = require('needle');


// CAMERA

process.env.TESSEL_UPLOAD_DIR = './pictures';
var camera = require('camera-vc0706').use(tessel.port['D']);
camera.on('ready', function() {
  console.log('camera ready...');
});


// RFID

var rfid = require('rfid-pn532').use(tessel.port['A']);

rfid.on('ready', function (version) {
  console.log('rfid ready...');

  rfid.on('data', function (card) {
    console.log(card);

    if (wifi.isConnected()) {
      var data = {
        api_token: 'talk about amateur hour, who the hell committed the api key?',
        username: 'christopherciufo'
      };

      needle
        .post('https://api.justyo.co/yo/', data)
        .on('end', function() {
          console.log('done');
        });
    } else {
      console.log('not connected');
    }
    console.log(card.uid.toString('hex'));

    camera.takePicture(function(err, image) {

      if (err) throw err;
      else {
        var name = 'IMG_' + Date.now() + '.jpg';
        process.sendfile(name, image);
        console.log('snap!');
        sendYo();
      }

    });
  });

});

function sendYo () {
  if (wifi.isConnected()) {
    var data = {
      api_token: 'hmm ... this shouldn\'t be here',
      username: 'christopherciufo'
    };

    needle
      .post('https://api.justyo.co/yo/', data)
      .on('end', function() {
        console.log('done');
      });
  } else {
    console.log('not connected');
  }
}

