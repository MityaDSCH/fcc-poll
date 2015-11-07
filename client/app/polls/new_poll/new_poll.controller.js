'use strict';

angular.module('fccApp').controller('newPollCtrl', function ($rootScope, $scope, $http, Auth, $window) {

	$rootScope.pageTitle = 'New Poll';

	$scope.currentUser = Auth.getCurrentUser();

	$scope.poll = {
		author: $scope.currentUser._id,
		votes: {}
	};
	$scope.poll.voteOptions = ['', ''];
	
	$scope.addOption = function() {
		$scope.poll.voteOptions.push('');
	};

	$scope.deleteOption = function(num) {
		if ($scope.poll.voteOptions.length > 2) {
			$('#option' + (num + 1)).remove();
			$scope.poll.voteOptions.splice(num, 1);
		}
	};

	$scope.register = function(form) {

		$scope.submitted = true;

		if (form.$valid) {
			$http.post('/api/polls', $scope.poll).success(function(pollId) {
				
				$window.location.href = '/poll/' + pollId;
				
			});
		}
	};

});