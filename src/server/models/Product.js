var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Product = new Schema({
  title: {type: String, required: true},
  description: {type: String, require: true},
  style: {type: String, unique: true},
  modified: { type: Date, default: Date.now}
});

module.exports = mongoose.model('Product', Product);
