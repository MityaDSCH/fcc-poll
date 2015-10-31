'use strict';

angular.module('fccApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/new-poll', {
        templateUrl: 'app/polls/new_poll/new_poll.html',
        controller: 'newPollCtrl',
        authenticate: true
      })
      .when('/poll/:id', {
      	templateUrl: 'app/polls/poll/poll.html',
      	controller: 'pollCtrl'
      });
  });