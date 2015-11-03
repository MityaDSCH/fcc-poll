'use strict';

angular.module('fccApp').controller('userCtrl', function ($scope, $http, Auth, $routeParams) {

	$scope.currentUser = Auth.getCurrentUser();

	var user = $routeParams.username;
	$scope.polls = [];
	$scope.isOwner = false
	$http.get('/api/users/' + user + '/polls').success(function(item) {
		$scope.polls = item[0].polls;
	});

	$scope.deleteBtn = function(num) {
		console.log(num);
		$('#delete' + num).removeClass('glyphicon-remove')
											.text('Are you sure?');
	};

	//show edit/delete buttons is page belongs to logged in user
	$scope.isOwner = Auth.getCurrentUser().username === user;

});