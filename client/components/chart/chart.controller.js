'use strict';

angular.module('fccApp')
	.controller('ChartCtrl', function ($scope, $http) {



		$scope.poll = {};
		$http.get('/api/polls/' + $scope.pollId).success(function(poll) {
			$scope.poll = poll;
		}).then(function() {

			var votesData = [];

			for (var i = 0; i < $scope.poll.options.length; i++) {
				votesData[i] = 0;
				for (var voter in $scope.poll.votes) {
					if ($scope.poll.options[i] === $scope.poll.votes[voter]) {
						votesData[i]++;
						delete $scope.poll.votes[voter];
					}
				}
			}

			var data = {
			    labels: $scope.poll.options,
			    datasets: [
			        {
			            label: $scope.poll.title,
			            fillColor: "rgba(220,220,220,0.5)",
			            strokeColor: "rgba(220,220,220,0.8)",
			            highlightFill: "rgba(220,220,250,0.75)",
			            highlightStroke: "rgba(220,220,250,1)",
			            data: votesData
			        }
			    ]
			};

			var barOptions = {			    
				scaleBeginAtZero : true,
			    scaleShowGridLines : true,
			    scaleGridLineColor : "rgba(0,0,0,.05)",
			    scaleGridLineWidth : 1,
			    scaleShowHorizontalLines: false,
			    scaleShowVerticalLines: true,
			    barShowStroke : true,
			    barStrokeWidth : 2,
			    barValueSpacing : 5,
			    barDatasetSpacing : 1,
			}

			var ctx = $("#chart" + $scope.pollId);
			var myBarChart = new Chart(ctx, {
			    type: 'bar',
			    data: data,
			    options: barOptions
			});
			console.log($scope.poll);
		});

		

	});