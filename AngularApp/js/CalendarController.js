var microweatherApp = angular.module('microweatherApp', []);

microweatherApp.controller('CalendarController', function($scope) {
	$scope.week = [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday' ,'Thursday', 'Friday', 'Saturday'];
});