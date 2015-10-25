angular.module('fccApp').controller('newPollCtrl', function ($scope, $http) {

	$scope.register = function(form) {

		$scope.submitted = true;
		console.log('submitted', form.$valid);

		if (form.$valid) {
			console.log("valid");
		}

	};

});