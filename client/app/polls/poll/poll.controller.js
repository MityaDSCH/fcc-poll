'use strict';

angular.module('fccApp').controller('pollCtrl', function ($scope, $http, Auth, $routeParams) {

	var ctx = $('#chart')[0].getContext('2d');

	function resizeCanvas() {
		var wid = $('#chart-container').width();
		ctx.canvas.width = wid;
		ctx.canvas.height = wid*4/5;
	}

	resizeCanvas();
	$(window).resize(function() {
		resizeCanvas();
		console.log('resize');
	});

	$scope.currentUser = Auth.getCurrentUser();

});