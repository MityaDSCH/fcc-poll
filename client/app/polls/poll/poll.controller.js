'use strict';

angular.module('fccApp').controller('pollCtrl', function ($scope, $http, Auth, $routeParams) {

	$scope.pollId = $routeParams.id;

});