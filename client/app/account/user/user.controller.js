'use strict';

angular.module('fccApp').controller('userCtrl', function ($scope, $http, Auth, $routeParams) {

	$scope.currentUser = Auth.getCurrentUser();

	var user = $routeParams.username;
	$scope.polls = [];
	$scope.isOwner = false;
	$http.get('/api/users/' + user + '/polls').success(function(item) {
		$scope.polls = item[0].polls;
	});

	$scope.deleteBtn = function(num) {

		if ($scope['showPrompt' + num] === false || $scope['showPrompt' + num] === undefined) {
			$scope['showPrompt' + num] = true;
			$('#delete' + num).removeClass('glyphicon-remove glyphicon')
												.text('Delete');
			$('#edit' + num).removeClass('glyphicon-edit glyphicon')
											.text('Cancel');
		} else {
			 $http.delete('/api/polls/' + $scope.polls[num]._id);
			 $scope.polls.splice(num, 1);
			 //yeah, this is weird, but it resets the next poll from the delete confirmation
			 $scope.editBtn(num);
		}
	};

	$scope.editBtn = function(num) {
		if ($scope['showPrompt' + num] === false) {
			//edit link
		} else {
			$scope['showPrompt' + num] = false;
			$('#delete' + num).addClass('glyphicon-remove glyphicon')
												.text('');
			$('#edit' + num).addClass('glyphicon-edit glyphicon')
											.text('');
		}
	};

	//show edit/delete buttons is page belongs to logged in username
	$scope.isOwner = Auth.getCurrentUser().username === user;

});