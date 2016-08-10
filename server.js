'use strict';
let express = require('express');
let app = express();
let logger = require('./logger');
let bodyParser = require('body-parser');
let parseUrlencoded = bodyParser.urlencoded({ extended: false });
let parseJson = bodyParser.json();
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

let locations = {
  'Fixed': 'First floor',
  'Movable': 'Second floor',
  'Rotating': 'Penthouse'
};

app.post('/blocks', parseUrlencoded, parseJson, function(req, res) {
  let newBlock = req.body;
  blocks[newBlock.name] = newBlock.description;
  console.log(newBlock.name);
  res.status(201).json(newBlock.name);
});

app.param('name', function(req, res, next) {
  let name = req.params.name;
  let block = name[0].toUpperCase() + name.slice(1).toLowerCase();
  req.blockName = block;
  next();
});

app.get('/blocks', function(req, res) {
  res.json(Object.keys(blocks));
});

app.get('/blocks/:name', function(req, res) {
  let description = blocks[req.blockName];
  if (!description) {
    res.status(404).json(`No description found for ${req.params.name}`);
  } else {
    res.json(description);
  }
});

app.get('/locations/:name', function(req, res) {
  let description = blocks[req.blockName];
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

 app.delete('/blocks/:name', function(req, res) {
   delete blocks[req.blockName];
   res.sendStatus(200);
 });

app.listen(3000, function() {
  console.log('Listening on port 3000');
});
