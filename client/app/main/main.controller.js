'use strict';

angular.module('fccApp')
  .controller('MainCtrl', function ($rootScope, $scope, $http) {
    $rootScope.pageTitle = 'Fcc Poll';
    $scope.awesomeThings = [];

    $http.get('/api/things').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });

    $scope.addThing = function() {
      if($scope.newThing === '') {
        return;
      }
      $http.post('/api/things', { name: $scope.newThing });
      $scope.newThing = '';
    };

    $scope.deleteThing = function(thing) {
      $http.delete('/api/things/' + thing._id);
    };

    $scope.active = null;
    $scope.makeActive = function() {
      $scope.active = this.thing;
    };

  });
