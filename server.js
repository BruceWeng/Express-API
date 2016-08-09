'use strict';
let express = require('express');
let app = express();
let logger = require('./logger');
// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });
app.use(logger);
app.use(express.static('public'));

app.get('/blocks', function(req, res) {
  let blocks = ['Fixed', 'Movable', 'Rotating'];
  res.json(blocks);
});

app.get('/redirect', function(req, res) {
  res.redirect(301, '/parts');
})
app.get('/parts', function(req, res) {
  console.log('This is /parts');
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
