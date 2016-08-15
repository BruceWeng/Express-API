var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var parseJson = bodyParser.json();
var Product = require('../models/Product');

router.route('/')
  .get(function(req, res) {
    Product.find(function(err, products) {
      if (!err) {
        res.json(products);
      } else {
        console.log(err);
      }
    });
  })
  .post(parseUrlencoded, parseJson, function(req, res) {
    var product = new Product({
      title: req.body.title,
      description: req.body.description,
      style: req.body.style
    });
    product.save(function(err) {
      if (!err) {
        console.log('Created!');
      } else {
        console.log(err);
      }
    });
    res.json(product);
  });

  module.exports = router;
