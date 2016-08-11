'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _blocks = require('./routes/blocks');

var _blocks2 = _interopRequireDefault(_blocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)();

// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });
app.use(_logger2.default);
app.use(_express2.default.static('public'));

var locations = {
  'Fixed': 'First floor',
  'Movable': 'Second floor',
  'Rotating': 'Penthouse'
};

app.use('/blocks', _blocks2.default);

app.param('name', function (req, res, next) {
  var name = req.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.blockName = block;
  next();
});

app.get('/locations/:name', function (req, res) {
  var description = _blocks2.default[req.blockName];
  if (!description) {
    res.status(404).json('No description found for ' + req.params.name);
  } else {
    res.json(description);
  }
});
app.get('/redirect', function (req, res) {
  res.redirect(301, '/parts');
});
app.get('/parts', function (req, res) {
  console.log('This is /parts');
});

app.listen(3000, function () {
  console.log('Listening on port 3000');
});