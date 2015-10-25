'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({

  name: {
  	type: String,
    required: true
  },
  username: {
  	type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  created_at: String,
  updated_at: String,

  url: {
    type: String,
    required: true,
    unique: true
  },
  active: Boolean,
  public: Boolean,

  options: Object,
  votes: Object

});

PollSchema.pre('save', function(next) {

  //update time properties
  var curDate = new Date();
  this.updated_at = curDate;
  if (!this.created_at) {
    this.created_at = curDate;
  }

  next();

});

module.exports = mongoose.model('Poll', PollSchema);