/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';

var Thing = require('../api/thing/thing.model');
var User = require('../api/user/user.model');
var Poll = require('../api/poll/poll.model');

Thing.find({}).remove().exec(function() {
  Thing.create({
    name : 'Development Tools',
    info : 'Integration with popular tools such as Bower, Grunt, Karma, Mocha, JSHint, Node Inspector, Livereload, Protractor, Jade, Stylus, Sass, CoffeeScript, and Less.'
  }, {
    name : 'Server and Client integration',
    info : 'Built with a powerful and fun stack: MongoDB, Express, AngularJS, and Node.'
  }, {
    name : 'Smart Build System',
    info : 'Build system ignores `spec` files, allowing you to keep tests alongside code. Automatic injection of scripts and styles into your index.html'
  },  {
    name : 'Modular Structure',
    info : 'Best practice client and server structures allow for more code reusability and maximum scalability'
  },  {
    name : 'Optimized Build',
    info : 'Build process packs up your templates as a single JavaScript payload, minifies your scripts/css/images, and rewrites asset names for caching.'
  },{
    name : 'Deployment Ready',
    info : 'Easily deploy your app to Heroku or Openshift with the heroku and openshift subgenerators'
  }, function() {
      console.log('finished populating things');
  });
});

User.find({}).remove().exec(function() {
  User.create({
    provider: 'local',
    username: 'test',
    email: 'test@test.com',
    password: 'test'
  }, {
    provider: 'local',
    role: 'admin',
    username: 'admin',
    email: 'admin@admin.com',
    password: 'admin'
  }, function() {
      console.log('finished populating users');
  }).then(function() {
    makePoll();
  }); 
});

function makePoll() {
  var parentUser;
  Poll.find({}).remove().exec(function() {
    //poll 1
    User.findOne({username: 'admin'}).exec()
      .then(function(user) {
        parentUser = user;
        return Poll.create({
          testPoll: true,
          title: "Does this work?",
          author: user._id,
          created_at: Date.now(),
          updated_at: Date.now(),
          voteOptions: ["yes", "no", "maybe"],
          votes: {
            'admin': "yes",
            'test': "no",
            'anonymous': "maybe",
            'anonymous1': "yes",
            'anonymous2': "no"
          }
        });
      }).then(function(poll) {
        parentUser.polls.push(poll._id);
        parentUser.save(function(err) {
          if (err) console.log(err);
        })
      })
    //poll 2
    User.findOne({username: 'admin'}).exec()
    .then(function(user) {
      parentUser = user;
      return Poll.create({
        testPoll: true,
        title: "Does this work? 2",
        author: user._id,
        created_at: Date.now(),
        updated_at: Date.now(),
        voteOptions: ["yes", "no"],
        votes: {
          'admin': "yes",
          'test': "no"
        }
      });
    }).then(function(poll) {
      parentUser.polls.push(poll._id);
      parentUser.save(function(err) {
        if (err) console.log(err);
      })
    })
  });
}