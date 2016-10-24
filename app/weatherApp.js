'use strict';
(function () {

	angular.module('weatherApp', [
		, 'ui.router'
		, 'ngRoute'
		//, 'ngTouch'
		, 'weatherModule'
		]);

	angular.module('weatherApp').config(function ($httpProvider) {
		$httpProvider.defaults.headers.common = {};
		$httpProvider.defaults.headers.post = {};
		$httpProvider.defaults.headers.put = {};
		$httpProvider.defaults.headers.patch = {};
	});

	angular.module('weatherApp').config(function ($urlRouterProvider) {
		$urlRouterProvider.otherwise('/weather');
	});

})();
