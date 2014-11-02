var tessel = require('tessel');
var wifi = require('wifi-cc3000');
var needle = require('needle');

// CAMERA

var camera = require('camera-vc0706').use(tessel.port['D']);
camera.on('ready', function() {
  console.log('camera ready...');
});


// RFID

var rfid = require('rfid-pn532').use(tessel.port['A']);

rfid.on('ready', function (version) {
  console.log('rfid ready...');

  rfid.on('data', function (card) {
    console.log(card.uid.toString('hex'));

    camera.takePicture(function (err, picture) {

      if (err) throw err;
      else {
        var filename = 'IMG_' + Date.now() + '.jpg';
        process.sendfile(filename, picture);
        console.log('snap!');
        sendYo(filename);        
      }

    });
  });
});

function sendYo(filename) {
  var data = {
    filename: filename,
    tesselId: tessel.deviceId()
  };

  needle.post('http://rperrynguyen.me/api/doorbells', data)
  .on('end', function () {
    console.log('sent');
  });
}

// CLIMATE

var climate = require('climate-si7005').use(tessel.port['C']);

climate.on('ready', function () {
  console.log('climate ready...');

  // climate.readTemperature('c', function (err, temp) {
  //   if (err) {
  //     console.log(err);
  //   }
  //   console.log('Temperatured: ', temp, ' oC');
  // });
});

climate.on('error', function (err) {
  console.log('error connecting module:', err);
});
