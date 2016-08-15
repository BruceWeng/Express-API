var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var webpackDevConfig = require('../webpack.config.js');
var reload = require('reload');
var http = require('http');
var mongoose = require('mongoose');

var compiler = webpack(webpackDevConfig);
var app = express();
var server = http.createServer(app);
reload(server, app);
mongoose.connect('mongodb://localhost/ecomm_database');

var logger = require('./server/logger');
var blocks = require('./server/routes/blocks');
// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });
app.use(webpackDevMiddleware(compiler, {
  publicPath: webpackDevConfig.output.publicPath,
  noInfo: true,
  stats: {
    colors: true
  }
}));
app.use(webpackHotMiddleware(compiler));
app.use(logger);
app.use(express.static('public'));

var locations = {
  'Fixed': 'First floor',
  'Movable': 'Second floor',
  'Rotating': 'Penthouse'
};

app.get('/api', function(req, res) {
  res.json('Ecomm API is running');
});

app.use('/blocks', blocks);

app.param('name', function(req, res, next) {
  var name = req.params.name;
  var block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.blockName = block;
  next();
});


app.get('/locations/:name', function(req, res) {
  var description = blocks[req.blockName];
  if (!description) {
    res.status(404).json(`No description found for ${req.params.name}`);
  } else {
    res.json(description);
  }
})
app.get('/redirect', function(req, res) {
  res.redirect(301, '/parts');
})
app.get('/parts', function(req, res) {
  console.log('This is /parts');
});



server.listen(3000, function() {
  console.log('Reload server is listening on port 3000');
});
