'use strict';

angular.module('fccApp')
  .controller('FooterCtrl', function ($scope) {

    var nameWidth = $('name').css('width');
    var animating = false;
    $('#github').css('width', nameWidth);

    $scope.showName = function() {
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
    };

    $scope.hideName = function() {
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
      }, 1200);
    };

    $scope.logoHover = function() {
      if (!animating) {
        $scope.showName();
      }
    };

    $scope.logoExit = function() {
      if (!animating) {
        $scope.hideName();
      } else {
        var intv = setInterval(function() {
          if (!animating) {
            $scope.hideName();
            clearInterval(intv);
            animating = false;
          }
        }, 100);
      }
    };
  });