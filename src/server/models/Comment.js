var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Comment = new Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  modified: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Comment', Comment);
