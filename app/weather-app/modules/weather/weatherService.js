'use strict';
(function () {
	angular.module('weatherModule').factory('weatherService', weatherService);

	weatherService.$inject = ['$http', '$log', '$q'];

	function weatherService($http, $log, $q) {
		var service = this;

		service.getByLocation = function (lat, long) {

			var url = 'http://api.openweathermap.org/data/2.5/find?lat=' + lat + '&lon=' + long + '&cnt=10&appid=676d8dbcc47d6963a5ac08e7eb5505b2';

			return $q(function (resolve, reject) {
				$http.get(url).then(
				function (response) {
					resolve(response);
				},
				function (response) {
					$log.info(response);
					reject(response);
				});
			});

		};

		service.getByZip = function (zip) {

			var url = 'http://api.openweathermap.org/data/2.5/weather?zip=' + zip + ',us&appid=676d8dbcc47d6963a5ac08e7eb5505b2';

			return $q(function (resolve, reject) {
				$http.get(url).then(
				function (response) {
					resolve(response);
				},
				function (response) {
					$log.info(response);
					reject(response);
				});
			});

		};

		service.getByCountry = function (country) {

			var url = 'http://api.openweathermap.org/data/2.5/weather?q=' + country + '&appid=676d8dbcc47d6963a5ac08e7eb5505b2';

			return $q(function (resolve, reject) {
				$http.get(url).then(
				function (response) {
					resolve(response);
				},
				function (response) {
					$log.info(response);
					reject(response);
				});
			});

		};

		return service;
	}
}());
