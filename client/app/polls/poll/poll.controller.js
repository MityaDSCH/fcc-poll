'use strict';

angular.module('fccApp').controller('pollCtrl', function ($rootScope, $scope, $http, Auth, $routeParams) {

	$scope.user = Auth.getCurrentUser();
	$scope.userId = $scope.user.username || 'Anonymous - ' + Date.now() + ' - ' + Math.random()*Math.pow(10,17);
	$scope.loggedIn = Auth.isLoggedIn();

	$scope.userVote = '';
	$scope.updateGraph = function(pollBack) {
		$scope.poll.voteOptions = pollBack.voteOptions;
		$scope.poll.voteTotals = pollBack.voteTotals;
	};
	$scope.setVote = function(option) {
		$scope.userVote = option;
	};

	//get poll display data
	$scope.pollId = $routeParams.id;
	$scope.poll = {};
	$http.get('/api/polls/' + $scope.pollId).success(function(poll) {
		$scope.poll = poll;
	    $rootScope.pageTitle = poll.title;
	}).then(function() {

		$scope.data = $scope.poll.voteTotals;
		$scope.labels = $scope.poll.voteOptions;
		$scope.poll.votes = $scope.poll.votes || {};

		//activate voted button if user has already voted
		if ($scope.userId.indexOf('Anonymous - ') != -1) {
			$scope.userVote = $scope.poll.votes[$scope.user.username];
		}
	});

	$scope.submitVote = function(userVote) {
		var btn = $('#submit-btn');
		if (!userVote) {
			alert('Pick an option');
		} else if (!btn.hasClass('active')) {
			btn.html('Submitting <i class="fa fa-circle-o-notch fa-spin"></i>');
			btn.addClass('active');
			var newPoll = $scope.poll;
			newPoll.votes[$scope.userId] = userVote;
			$http.patch('/api/polls/' + $scope.pollId, newPoll).success(function(poll) {
				btn.addClass('btn-success');
				btn.removeClass('btn-primary');
				btn.text('Success!');
				$scope.updateGraph(poll);
			}).error(function() {
				btn.text('Error');
				btn.addClass('btn-danger');
				btn.removeClass('btn-primary');
			});
		}
	};

});