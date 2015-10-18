'use strict';

var animating = false;

function showName() {
  animating = true;
  //fade out github link
  $('#github').removeClass('fadeInRight')
              .addClass('flipOutX');
  window.setTimeout(function() {
    //stop logo from blocking after logo is gone
    $('#github').css('display', 'none');
    //fade in name
    $('#name').removeClass('flipOutX fadeOutDown')
              .addClass('fadeInRight')
              .css('display', 'inline-block');
    $('.mw-logo').css('background-color', '#666633');
    $('.mw-logo').css('box-shadow', '0px 0px 4px 1.5px #aaaaaa');
    //set animating to false after all animation is done
    window.setTimeout(function() {
      animating = false;
    }, 1200);
  }, 800);
}

function hideName() {
  animating = true;
  //fade out name
  $('#name').removeClass('fadeInRight');
  $('#name').addClass('flipOutX');
  window.setTimeout(function() {
    //stop logo from blocking
    $('#name').css('display', 'none');
    //fade in name
    $('#github').removeClass('flipOutX fadeOutDown')
              .addClass('fadeInRight')
              .css('display', 'inline-block');
    $('.mw-logo').css('background-color', 'white');
    $('.mw-logo').css('box-shadow', 'none');
    //set animating to false after all animation is done
    window.setTimeout(function() {
      animating = false;
    }, 1200);
  }, 800);
}

angular.module('fccApp')
  .controller('MainCtrl', function ($scope, $http) {
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

  });
