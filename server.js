'use strict';
let express = require('express');
let app = express();

app.get('/', function(request, response) {
  response.send('Hello World');
});

app.get('/blocks', function(request, response) {
  let blocks = ['Fixed', 'Movable', 'Rotating'];
  response.redirect(301, '/parts');
});

app.get('/parts', function(request, response) {
  console.log('This is /parts');
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
