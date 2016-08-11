'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

var parseUrlencoded = _bodyParser2.default.urlencoded({ extended: false });
var parseJson = _bodyParser2.default.json();

var blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

router.route('/').get(function (req, res) {
  res.json(Object.keys(blocks));
}).post(parseUrlencoded, parseJson, function (req, res) {
  var newBlock = req.body;
  blocks[newBlock.name] = newBlock.description;
  console.log(newBlock.name);
  res.status(201).json(newBlock.name);
});

router.route('/:name').all(function (req, res, next) {
  var name = req.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.blockName = block;
  next();
}).get(function (req, res) {
  var description = blocks[req.blockName];
  if (!description) {
    res.status(404).json('No description found for ' + req.params.name);
  } else {
    res.json(description);
  }
}).delete(function (req, res) {
  delete blocks[req.blockName];
  res.sendStatus(200);
});

exports.default = router;