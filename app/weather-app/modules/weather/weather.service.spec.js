'use strict';

describe('myApp/myState', function () {

	var $rootScope, $state, $injector, myServiceMock, state = 'myState';

	beforeEach(function () {

		module('weatherApp', function ($provide) {
			$provide.value('myService', myServiceMock = {});
		});

		inject(function (_$rootScope_, _$state_, _$injector_, $templateCache) {
			$rootScope = _$rootScope_;
			$state = _$state_;
			$injector = _$injector_;

			// We need add the template entry into the templateCache if we ever
			// specify a templateUrl
			$templateCache.put('template.html', '');
		})
	});

	it('should respond to URL', function () {
		expect($state.href(state, { id: 1 })).toEqual('#/state/1');
	});

	it('should resolve data', function () {
		myServiceMock.findAll = jasmine.createSpy('findAll').and.returnValue('findAll');
		// earlier than jasmine 2.0, replace "and.returnValue" with "andReturn"

		$state.go(state);
		$rootScope.$digest();
		expect($state.current.name).toBe(state);

		// Call invoke to inject dependencies and run function
		expect($injector.invoke($state.current.resolve.data)).toBe('findAll');
	});
});

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

	beforeEach(inject(function ($controller, $rootScope) {
		rootScope = $rootScope.$new();
		controller = $controller('weather-controller', { $scope: rootScope });
	}));

	// Test the controller
	it('get the weather by longitide and latitide', function () {
		var result = controller.getByLocation(123, 456);
		rootScope.$apply();
		expect(result).toBe('got by location lat(123) long(456)');
	});

});
