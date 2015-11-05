'use strict';

angular.module('fccApp')
  .directive('pollchart', function () {
    return {
      templateUrl: 'components/pollchart/pollchart.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {

      }
    };
  });