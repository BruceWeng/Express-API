'use strict';
let express = require('express');
let app = express();

// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });

app.use(express.static('public'));

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
