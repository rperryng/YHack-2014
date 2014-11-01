var tessel = require('tessel');
var wifi = require('wifi-cc3000');
var needle = require('needle');

var rfidlib = require('rfid-pn532');
var rfid = rfidlib.use(tessel.port['A']);

rfid.on('ready', function (version) {
  console.log('Ready...');

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

  });

});
