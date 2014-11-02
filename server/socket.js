var ws = require("nodejs-websocket");

var service = {
  connectToSocket: connectToSocket
};

module.exports = service;

////////////
var port = 8000;

function connectToSocket() {

  setTimeout(function () {

    console.log('okay les do dis');

    // INSERT TESSEL IP ADDRESS HERE. Always prepend with 'ws://' to indicate websocket
    var connection = ws.connect('ws://172.26.1.213:' + port, function () {
      // When we connect to the server, send some catchy text
      connection.sendText("My milkshake brings all the boys to the yard");
    });

    // When we get text back
    connection.on('text', function (text) {
      // print it out
      console.log("Echoed back from tessel:", text);
    });
  }, 30000);
}
