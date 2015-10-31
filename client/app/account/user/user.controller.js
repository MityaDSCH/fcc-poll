'use strict';

angular.module('fccApp').controller('userCtrl', function ($scope, $http, Auth, $routeParams) {

	$scope.currentUser = Auth.getCurrentUser();
	$scope.pageUser = Auth.getUser($routeParams.username);

});