'use strict';
(function () {
	angular.module('weatherModule', []).config(weatherModule);

	weatherModule.$inject = ['$stateProvider'];

	function weatherModule($stateProvider) {
		$stateProvider
			.state('weather', {
				url: '/weather',
				templateUrl: 'app/weather-app/modules/weather/weather.tmpl.html',
				controller: 'weather-controller'
			});
	}
})();