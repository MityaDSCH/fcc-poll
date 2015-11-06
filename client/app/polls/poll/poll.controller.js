'use strict';

angular.module('fccApp').controller('pollCtrl', function ($scope, $http, Auth, $routeParams) {


	$scope.user = Auth.getCurrentUser();
	$scope.userId = $scope.user._id || "Anonymous";

	$scope.userVote = '';
	$scope.setVote = function(option) {
		if ($scope.poll.voteOptions.indexOf($scope.userVote) != -1) {
			$scope.poll.voteTotals[$scope.poll.voteOptions.indexOf($scope.userVote)]--;
		}
		$scope.poll.voteTotals[$scope.poll.voteOptions.indexOf(option)]++;
		$scope.userVote = option;
	};

	//get poll display data
	$scope.pollId = $routeParams.id;
	$scope.poll = {};
	$http.get('/api/polls/' + $scope.pollId).success(function(poll) {
		$scope.poll = poll;
	}).then(function() {

		$scope.data = $scope.poll.voteTotals;
		$scope.labels = $scope.poll.voteOptions;

		//activate voted button if user has already voted
		if ($scope.userId != "Anonymous") {
			$scope.userVote = $scope.poll.votes[$scope.user.username];
		}
	});
});