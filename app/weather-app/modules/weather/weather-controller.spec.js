describe('Weather Controller: ', function() { // eslint-disable-line no-undef
	var rootScope;
    var controller;
    var message;

    beforeEach(module('ngRoute'));
    beforeEach(module('ui.router'));
    beforeEach(module(function($stateProvider) {}));

    beforeEach(module('weatherModule')); // eslint-disable-line no-undef

	beforeEach(module(function($provide) { // eslint-disable-line no-undef
		$provide.factory('weatherService', function($q) {
			return {
				getByLocation: function(lat, long) {
					var deferred = $q.defer(); // eslint-disable-line angular/deferred
					if (lat > 0 && long > 0) {
						deferred.resolve
                        ({
                            data: {
                                Message: 'Ok', 
                                list: undefined, 
                                main: {
                                    temp: 0
                                }, 
                                name: 'test', 
                                weather: [{
                                    description: 'test description',
                                    main: 'test main'
                                }]
                            }
                        });
					} else {
						deferred.reject({
                            data: {
                                message: 'Error getting by location!'
                            }
                        });
					}
					return deferred.promise;
				},
                getByZip: function(zip) {
					var deferred = $q.defer(); // eslint-disable-line angular/deferred
					if (zip > 0 && zip.toString().length == 5) {
						deferred.resolve
                        ({
                            data: {
                                Message: 'Ok', 
                                list: undefined, 
                                main: {
                                    temp: 0
                                }, 
                                name: 'test', 
                                weather: [{
                                    description: 'test description',
                                    main: 'test main'
                                }]
                            }
                        });
					} else {
						deferred.reject({
                            data: {
                                message: 'Error getting by location!'
                            }
                        });
					}
					return deferred.promise;
				},
                getByCountry: function(country) {
					var deferred = $q.defer(); // eslint-disable-line angular/deferred
					if (country == 'United States') {
						deferred.resolve
                        ({
                            data: {
                                Message: 'Ok', 
                                list: undefined, 
                                main: {
                                    temp: 0
                                }, 
                                name: 'test', 
                                weather: [{
                                    description: 'test description',
                                    main: 'test main'
                                }]
                            }
                        });
					} else {
						deferred.reject({
                            data: {
                                message: 'Error getting by location!'
                            }
                        });
					}
					return deferred.promise;
				}
			};
		});
	}));

	beforeEach(inject(function($controller, $rootScope) { // eslint-disable-line no-undef
		rootScope = $rootScope.$new();
		controller = $controller('weather-controller', { $scope: rootScope });
	}));

	it('can get by valid lat and long', function() { // eslint-disable-line no-undef

        // Arrange
        var lat = 5;
        var long = 7;

        // Act
        controller.getByLocation(lat, long);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(true);
        
	});

    it('can get by valid lat and long (where <0 == invalid)', function() { // eslint-disable-line no-undef

        // Arrange
        var lat = -5;
        var long = 7;

        // Act
        controller.getByLocation(lat, long);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(false);
        
	});

    it('can\'t get by invalid lat and long (where <0 == invalid)', function() { // eslint-disable-line no-undef

        // Arrange
        var lat = -5;
        var long = -7;

        // Act
        controller.getByLocation(lat, long);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(false);

	});

    it('can\'t get by invalid lat and valid long (where NaN(lat) == invalid)', function() { // eslint-disable-line no-undef

        // Arrange
        var lat = 'bad hacker entry';
        var long = 7;

        // Act
        controller.getByLocation(lat, long);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(false);
        
	});

    it('can get by valid lat and long (as string int)', function() { // eslint-disable-line no-undef

        // Arrange
        var lat = '5';
        var long = 7;

        // Act
        controller.getByLocation(lat, long);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(true);
        
	});

    it('can get by valid zip', function() { // eslint-disable-line no-undef

        // Arrange
        var zip = 83402;

        // Act
        controller.getByZip(zip);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(true);
        
	});

    it('can get by valid zip (as string int)', function() { // eslint-disable-line no-undef

        // Arrange
        var zip = '83402';

        // Act
        controller.getByZip(zip);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(true);
        
	});

    it('can\'t get by invalid zip', function() { // eslint-disable-line no-undef

        // Arrange
        var zip = 'invalid zip and postal code';

        // Act
        controller.getByZip(zip);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(false);
        
	});

    it('can get by valid country', function() { // eslint-disable-line no-undef

        // Arrange
        var country = 'United States';

        // Act
        controller.getByCountry(country);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(true);
        
	});

    it('can\'t get by invalid country', function() { // eslint-disable-line no-undef

        // Arrange
        var country = 'invalid country';

        // Act
        controller.getByCountry(country);

        // Assert
		rootScope.$apply();
        expect(controller.gotTemperature).toBe(false);
        
	});

});