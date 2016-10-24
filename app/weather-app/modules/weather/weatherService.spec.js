'use strict';

describe('weatherModule should', function () {
	var rootScope;
	var controller;

	beforeEach(module('weatherModule'));

	// mock the weatherService
	beforeEach(angular.mock.module(function ($provide) {
		$provide.factory("weatherService", function ($http, $log, $q) {
			return {
				getByLocation: function (lat, long) {
					return 'got by location lat(' + lat + ') long(' + long + ')';
				}
			};
		});
	}));


	beforeEach(inject(function($controller, $rootScope) { // eslint-disable-line no-undef
		rootScope = $rootScope.$new();
		controller = $controller('weather-controller', { $scope: rootScope });
	}));

	// Test the controller
	it('get the weather by longitide and latitide', function() {
		var result = controller.getByLocation(123, 456);
		rootScope.$apply();
		expect(result).toBe('got by location lat(123) long(456)');
	});

});
