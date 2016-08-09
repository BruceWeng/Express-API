'use strict';
let express = require('express');
let app = express();
let logger = require('./logger');
// app.get('/', function(request, response) {
//   response.sendFile(__dirname + '/public/index.html');
// });
app.use(logger);
app.use(express.static('public'));

let blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

app.get('/blocks', function(req, res) {
  res.json(blocks);
});

app.get('/blocks/:name', function(req, res) {
  let description = blocks[req.params.name];
  if (!description) {
    res.status(404).json(`No description found for ${req.params.name}`);
  } else {
    res.json(description);
  }
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
