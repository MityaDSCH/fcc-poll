'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema, 
    User = require('../user/user.model');

var PollSchema = new Schema({

  title: {
  	type: String,
    required: true
  },
  author: {
  	type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: String,
  updated_at: String,

  votes: Object, 
  voteOptions: Object,
  voteTotals: Object

});

PollSchema.pre('save', function(next) {

  //update time properties
  var curDate = new Date();
  this.updated_at = curDate;
  if (!this.created_at) {
    this.created_at = curDate;
  }

  //update make arrays the voteOptions and voteTotals with entries for each string 
  //with a vote, and the total number of votes that string has respectively
  this.voteOptions = [];
  this.voteTotals = [];
  for (var key in this.votes) {
    var value = this.votes[key];
    console.log('placing ' + value);
    var i = this.voteOptions.indexOf(value);
    if (i === -1) {
      this.voteOptions.push(value);
      this.voteTotals[this.voteOptions.length - 1] = 1;
    } 
    else if (this.voteTotals[i] === undefined) {
      this.voteTotals[i] = 1;
    } 
    else {
      this.voteTotals[i]++;
    }
  }

  next();

});

module.exports = mongoose.model('Poll', PollSchema);