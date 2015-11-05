'use strict';

angular.module('fccApp').controller('pollCtrl', function ($scope, $http, Auth, $routeParams) {

	$scope.pollId = $routeParams.id;
	$scope.poll = {};
	$http.get('/api/polls/' + $scope.pollId).success(function(poll) {
		$scope.poll = poll;
	}).then(function() {

		$scope.data = $scope.poll.voteTotals;
		$scope.labels = $scope.poll.voteOptions;

	});

});