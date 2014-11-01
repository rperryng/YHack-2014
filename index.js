var tessel = require('tessel');
var rfidlib = require('rfid-pn532');

var rfid = rfidlib.use(tessel.port['A']);

rfid.on('ready', function (version) {
  console.log('Ready...');

  rfid.on('data', function (card) {
    console.log('UID:' + card.uid.toString('hex'));
  });

});