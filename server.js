'use strict';
let express = require('express');
let app = express();

app.get('/', function(request, response) {
  response.send('Hello World');
});

app.get('/blocks', function(request, response) {
  let blocks = ['Fixed', 'Movable', 'Rotating'];
  response.json(blocks);
});

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
