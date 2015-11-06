'use strict';

var _ = require('lodash');
var Poll = require('./poll.model');
var User = require('../user/user.model');

// Get list of polls
exports.index = function(req, res) {
  Poll.find(function (err, polls) {
    if(err) { return handleError(res, err); }
    return res.status(200).json(polls);
  });
};

// Get a single poll
exports.show = function(req, res) {
  Poll.findById(req.params.id, function (err, poll) {
    if(err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    return res.json(poll);
  });
};

// Creates a new poll in the DB.
exports.create = function(req, res) {
  var pollId = '';
  Poll.create(req.body, function(err, poll) {
    if(err) { return handleError(res, err); }
    pollId = poll._id;
  });
  //Update author's user model with the poll
  User.findById(req.body.author, function(err, user) {
    if (err) return handleError(res, err);
    user.polls.push(pollId);
    user.save(function(err) {
      if (err) return validationError(res, err);
      res.status(200).send(pollId);
    });
  });
};

// Updates an existing poll in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Poll.findById(req.params.id, function (err, poll) {
    if (err) { return handleError(res, err); }
    if(!poll) { return res.status(404).send('Not Found'); }
    console.log(poll, req.body);
    var updated = _.extend(poll, req.body);
    updated.save(function (err) {
      console.log(err);
      if (err) { return handleError(res, err); }
      return res.status(200).json(poll);
    });
  });
};

// Deletes a poll from the DB.
exports.destroy = function(req, res) {
  //if delete path is /all remove all polls
  if (req.params.id === "all") {
    console.log("delete all");
    Poll.find({}, function(err, polls) {
      if(err) { return handleError(res, err); }
      polls.forEach(function(ele) {
        ele.remove(function(err) {
          if(err) { return handleError(res, err); }
          return res.status(204).send('No Content');
        });
      });
    });
  } else {

    //original delete by id
    Poll.findById(req.params.id, function (err, poll) {
      if(err) { return handleError(res, err); }
      if(!poll) { return res.status(404).send('Not Found'); }
      User.findById(poll.author, function(err, user) {
        user.polls.forEach(function(pollId, i) {
          if (pollId === req.params.id) {
            user.polls.splice(i, 1);
          }
        });
        user.save(function(err) {
          if (err) return validationError(res, err);
        });
      });
      poll.remove(function(err) {
        if(err) { return handleError(res, err); }
        return res.status(204).send('No Content');
      });

    });

  }
};

function handleError(res, err) {
  return res.status(500).send(err);
}