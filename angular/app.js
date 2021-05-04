angular.module('angularApp', ['ngRoute'])
	.config(['$routeProvider', function(r){
		r.
		when('/',{
			controller:'dataController',
			templateUrl: 'templates/home.html'
		});
	}]);	