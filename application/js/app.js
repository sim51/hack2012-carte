'use strict';

/* App Module */
var app = angular.module('hack2012', ['elastic']);

app.config(function($routeProvider) {
		$routeProvider
			.when('/', {templateUrl: 'partials/map.html',   controller: IndexCtrl})
	      	.when('/search/:lat/:lng/:query/:theme/:type/:geo', {templateUrl: 'partials/map.html',   controller: SearchCtrl})
	      	.when('/error', {templateUrl: 'partials/error.html', controller: ErrorCtrl})
	      	.otherwise({redirectTo: '/'});
});

app.run(function($rootScope, $elastic, $location){
	$rootScope.search = function() {
		$location.path('/search/' + $rootScope.lat + '/' + $rootScope.lng + '/' + $rootScope.query + '/' + $rootScope.theme + '/' + $rootScope.type + '/' + $rootScope.geo);
	}

	$rootScope.facetTheme = function(theme) {
		$rootScope.theme = theme;
		$location.path('/search/' + $rootScope.lat + '/' + $rootScope.lng + '/' + $rootScope.query + '/' + $rootScope.theme + '/all/' + $rootScope.geo);
	}

	$rootScope.facetType = function(type) {
		$rootScope.type = type;
		$location.path('/search/' + $rootScope.lat + '/' + $rootScope.lng + '/' + $rootScope.query + '/' + $rootScope.theme + '/' + $rootScope.type + '/' + $rootScope.geo);
	}

	$rootScope.facetGeo = function(to) {
		if(!to){
			to = 500;
		}
		$rootScope.geo = to;
		$location.path('/search/' + $rootScope.lat + '/' + $rootScope.lng + '/' + $rootScope.query + '/' + $rootScope.theme + '/' + $rootScope.type + '/' + $rootScope.geo);
	}
});