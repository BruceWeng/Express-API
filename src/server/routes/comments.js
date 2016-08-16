var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var parseUrlencoded = bodyParser.urlencoded({ extended: false });
var parseJson = bodyParser.json();
var Comment = require('../models/Comment');

router.route('/')
  .get(function(req, res) {
    Comment.find(function(err, comments) {
      if (!err) {
        res.json(comments);
      } else {
        console.log(err);
      }
    });
  })
  .post(parseUrlencoded, parseJson, function(req, res) {
    var comment = new Comment({
      name: req.body.name,
      description: req.body.description,
    });
    comment.save(function(err) {
      if (!err) {
        console.log('Created!');
      } else {
        console.log(err);
      }
    });
    res.json(comment);
  });

  router.route('/:id')
    .get(function(req, res) {
      Comment.findById(req.params.id, function(err, comment) {
        if (!err) {
          res.json(comment);
        } else {
          console.log(err);
        }
      });
    })
    .put(parseUrlencoded, parseJson, function(req, res) {
      Comment.findById(req.params.id, function(err, comment) {
        if (err) {
          console.log(err);
        }

        comment.name = req.body.name;
        comment.description = req.body.description;
        comment.save(function(err) {
          if (!err) {
            console.log('Updated!');
          } else {
            console.log(err);
          }
        });
        res.json(comment);
      });
    })
    .delete(function(req, res) {
      Comment.findById(req.params.id, function(err, comment) {
        comment.remove(function(err) {
          if (!err) {
              console.log('Removed!');
          } else {
            console.log(err);
          }
        });
      });
    });

module.exports = router;
