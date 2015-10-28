'use strict';

angular.module('fccApp').controller('newPollCtrl', function ($scope, $http, Auth) {

	$scope.currentUser = Auth.getCurrentUser();

	$scope.poll = {author: $scope.currentUser.username};
	$scope.poll.options = ['', ''];

	$scope.addOption = function() {
		$scope.poll.options.push('');
	};

	$scope.deleteOption = function(num) {
		console.log("delete " + num);
		if ($scope.poll.options.length > 2) {
			$('#option' + (num + 1)).remove();
			$scope.poll.options.splice(num, 1);
		}
	};

	$scope.register = function(form) {

		$scope.submitted = true;

		if (form.$valid) {
			$scope.poll.author = $scope.currentUser.username;
			$http.post('/api/polls', $scope.poll);
		} else {
			console.log(form.options);
		}

	};

});