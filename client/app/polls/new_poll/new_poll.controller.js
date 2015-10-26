angular.module('fccApp').controller('newPollCtrl', function ($scope, $http, Auth) {

	$scope.currentUser = Auth.getCurrentUser();
	console.log($scope.getCurrentUser);
	$scope.poll = {};

	$scope.register = function(form) {

		$scope.submitted = true;

		if (form.$valid) {
			$scope.poll.author = $scope.currentUser.username;
			console.log($scope.poll);
		}

	};

});