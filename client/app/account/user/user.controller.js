'use strict';

angular.module('fccApp').controller('userCtrl', function ($scope, $http, Auth, $routeParams) {

	$scope.currentUser = Auth.getCurrentUser();
	console.log($routeParams);

});