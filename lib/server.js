'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackDevMiddleware = require('webpack-dev-middleware');

var _webpackDevMiddleware2 = _interopRequireDefault(_webpackDevMiddleware);

var _webpackHotMiddleware = require('webpack-hot-middleware');

var _webpackHotMiddleware2 = _interopRequireDefault(_webpackHotMiddleware);

var _webpackConfig = require('../webpack.config.js');

var _webpackConfig2 = _interopRequireDefault(_webpackConfig);

var _reload = require('reload');

var _reload2 = _interopRequireDefault(_reload);

var _http = require('http');

var _http2 = _interopRequireDefault(_http);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _blocks = require('./routes/blocks');

var _blocks2 = _interopRequireDefault(_blocks);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var compiler = webpack(_webpackConfig2.default);
var app = (0, _express2.default)();
var server = _http2.default.createServer(app);
(0, _reload2.default)(server, app);

// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });
app.use((0, _webpackDevMiddleware2.default)(compiler, {
  publicPath: _webpackConfig2.default.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));
app.use((0, _webpackHotMiddleware2.default)(compiler));
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

server.listen(3000, function () {
  console.log('Reload server is listening on port 3000');
});