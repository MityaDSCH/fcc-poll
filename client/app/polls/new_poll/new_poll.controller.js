'use strict';

angular.module('fccApp').controller('newPollCtrl', function ($scope, $http, Auth, $window) {

	$scope.currentUser = Auth.getCurrentUser();

	$scope.poll = {author: $scope.currentUser._id};
	$scope.poll.options = ['', ''];

	$scope.addOption = function() {
		$scope.poll.options.push('');
	};

	$scope.deleteOption = function(num) {
		if ($scope.poll.options.length > 2) {
			$('#option' + (num + 1)).remove();
			$scope.poll.options.splice(num, 1);
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