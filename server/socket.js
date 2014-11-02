var ws = require('nodejs-websocket');

var service = {
  createServer: createServer
};

module.exports = service;

///////////////


function createServer(port) {
  ws.createServer(function (conn) {
    console.log('new connection!');

    // text from the client..
    conn.on('text', function (str) {
      console.log('Received:', str);

      conn.sendText(str.toUpperCase() + '!!!');
    });

    conn.on('close', function (code, reason) {
      console.log('Connection closed due to', reason);
    });
  }).listen(port);
}
