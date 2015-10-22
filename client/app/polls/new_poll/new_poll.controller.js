angular.module('fccApp').controller('newPollCtrl', function ($scope, Auth, $location, $window) {

	$scope.register = function(form) {

		$scope.submitted = true;

		if (form.$vaild) {
			console.log("hi");
		}

	};

});