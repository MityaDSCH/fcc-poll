angular.module('fccApp').controller('newPollCtrl', function ($scope, $http, Auth) {

	$scope.currentUser = Auth.getCurrentUser();

	$scope.poll = {};
	$scope.poll.options = [{}];

	$scope.addOption = function() {
		$scope.poll.options.push({});
	};

	$scope.deleteOption = function(num) {
		console.log(num);
		if ($scope.poll.options.length > 1) {
			$(".option").eq(num).remove();
			$scope.poll.options.splice(num, 1);
		}
	};

	$scope.register = function(form) {

		$scope.submitted = true;

		if (form.$valid) {
			$scope.poll.author = $scope.currentUser.username;
			console.log($scope.poll);
		}

	};

});