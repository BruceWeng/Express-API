'use strict';
let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');
let parseUrlencoded = bodyParser.urlencoded({ extended: false });
let parseJson = bodyParser.json();

let blocks = {
  'Fixed': 'Fastened securely in position',
  'Movable': 'Capable of being moved',
  'Rotating': 'Moving in a circle around its center'
};

router.route('/')
  .get(function(req, res) {
    res.json(Object.keys(blocks));
  })
  .post(parseUrlencoded, parseJson, function(req, res) {
    let newBlock = req.body;
    blocks[newBlock.name] = newBlock.description;
    console.log(newBlock.name);
    res.status(201).json(newBlock.name);
  });

router.route('/:name')
  .all(function(req, res, next) {
    let name = req.params.name;
    let block = name[0].toUpperCase() + name.slice(1).toLowerCase();
    req.blockName = block;
    next();
  })
  .get(function(req, res) {
    let description = blocks[req.blockName];
    if (!description) {
      res.status(404).json(`No description found for ${req.params.name}`);
    } else {
      res.json(description);
    }
  })
  .delete(function(req, res) {
     delete blocks[req.blockName];
     res.sendStatus(200);
  });

module.exports = router;
