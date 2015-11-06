'use strict';

angular.module('fccApp')
  .directive('pollchart', function () {
    return {
      templateUrl: 'components/pollchart/pollchart.html',
      restrict: 'EA',
      link: function (scope, element, attrs) {
      	scope.hasVotes = function(votes) {
      		if (votes === undefined || Object.keys(votes).length === 0) {
      			return false;
      		}
      		return true;
      	}
      }
    };
  });