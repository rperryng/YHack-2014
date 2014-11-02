var mongoose = require('mongoose');

var doorbellSchema = mongoose.Schema({
  tesselId: String,
  subscribers: [String]
});

module.exports = mongoose.model('Doorbell', doorbellSchema);
