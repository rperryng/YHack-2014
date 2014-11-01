var tessel = require('tessel'),
  climatelib = require('climate-si7005');

var climate = climatelib.use(tessel.port['C']);

climate.on('ready', function () {
  console.log('connected to climate module si7005');

  function reportTemperature() {
    climate.readTemperature('c', function (err, temp) {
      if (err) {
        console.log(err);
      }
      console.log('Temperatured:', temp, 'degrees celsius');

      setTimeout(reportTemperature, 5000);
    });
  }

  reportTemperature();
});

climate.on('error', function (err) {
  console.log('error connecting module:', err);
});
