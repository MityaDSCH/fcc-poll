'use strict';

angular.module('fccApp').controller('userCtrl', function ($scope, $http, Auth, $routeParams) {

	$scope.currentUser = Auth.getCurrentUser();

	var user = $routeParams.username;
	$scope.polls = [];
	$http.get('/api/users/' + user + '/polls').success(function(item) {
		console.log(item);
		$scope.polls = item[0].polls;
	});

});