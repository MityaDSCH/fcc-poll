'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PollSchema = new Schema({
  name: {
  	type: String,
  	required: true
  },
  url: {
  	type: String,
  	required: true,
  	unique: true
  },
  creator: {
  	type: Number,
  	ref: "User"
  },
  active: Boolean,
  public: Boolean,
  votes: Object
});

PollSchema
	.virtual("");

module.exports = mongoose.model('Poll', PollSchema);