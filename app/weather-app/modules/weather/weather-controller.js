'use strict';
(function () {
	angular.module('weatherModule').controller('weather-controller', weatherController);

	weatherController.$inject = ['$scope', 'weatherService'];

	function weatherController($scope, weatherService) {

		var vm = $scope;

		vm.getByLocation = true; // default

		vm.getByLocation = function (lat, long) {

			weatherService.getByLocation(lat, long).then(vm.getByLocation_onSuccess, vm.getByLocation_onError);

		}

		vm.getByLocation_onSuccess = function (response) {

			vm.displayResponse(response);

		}

		vm.getByLocation_onError = function (error) {

			vm.getByLocation = false;
			vm.showError(error);

		}

		vm.getByZip = function (zip) {

			weatherService.getByZip(zip).then(vm.getByZip_onSuccess, vm.getByZip_onError);

		}

		vm.getByZip_onSuccess = function (response) {
			vm.displayResponse(response);
		}

		vm.getByZip_onError = function (error) {
			vm.getByLocation = false;
			vm.showError(error);
		}

		vm.getByCountry = function (country) {

			weatherService.getByCountry(country).then(vm.getByCountry_onSuccess, vm.getByCountry_onError);

		}

		vm.getByCountry_onSuccess = function (response) {

			vm.displayResponse(response);

		}

		vm.getByCountry_onError = function (error) {

			vm.getByLocation = false;
			vm.showError(error);

		}

		// get the weather by either zip/postal or country
		vm.getWeather = function () {

			if (!vm.isNull(vm.postalOrZip)) {
				// get by zip
				vm.getByZip(vm.postalOrZip);
			}

			if (!vm.isNull(vm.country)) {
				// get by country
				vm.getByCountry(vm.country);
			}

		}

		// show weather input form
		vm.showForm = function () {
			vm.disablePostalZip = false;
			vm.disableCountry = false;
			vm.getByLocation = false;
			vm.postalOrZip = '';
			vm.country = '';
		}

		// to check if string value is null
		vm.isNull = function (val) {
			if (val === undefined || val === undefined || val === null || val === '') {
				return true;
			}
			return false;
		}

		vm.disableCountryInput = function () {

			if (vm.postalOrZip.length > 0) {
				vm.disableCountry = false;
				vm.disablePostalZip = true;
			} else {
				vm.disableCountry = false;
				vm.disablePostalZip = false;
			}

		}

		vm.disablePostalZipInput = function () {

			if (vm.country.length > 0) {
				vm.disableCountry = true;
				vm.disablePostalZip = false;
			} else {
				vm.disableCountry = false;
				vm.disablePostalZip = false;
			}

		}

		vm.increment = function () {

			vm.incrementer = setTimeout(vm.tick, 1000);

		}

		// the countdown handles at least two conditions
		// 1. if the user says 'don't allow': there is currently no way to know if the user refuses to allow the location
		// 2. if the user takes longer than 10 seconds to make a decision
		// in either case, I show a message to the user, and a button so they can see the input form
		vm.tick = function () {

			vm.ticks += 1;
			vm.remainingSeconds = (11 - (vm.ticks + 1));

			if (vm.remainingSeconds > 0 && vm.gotTemperature == false) {

				// show the countdown
				vm.timerDisplay = 'less than ' + vm.remainingSeconds + ' seconds...';

				vm.countdown = vm.timerDisplay;
				$scope.$apply();
				vm.increment();

			} else {
				if (vm.gotTemperature == false) {
					vm.countdown = '';

					// show button
					vm.showChangeLocation = true;

					// display message explaining what happened
					vm.message = 'You chose not to share your location or took longer than 10 seconds to reply.  Please click the "Change Location" button and you can get the weather by using your postal/zip or country.';

					// hide loader
					vm.hideLoader = true;

					// the above 'hideLoader' is not hiding the loader even after $scope.$apply so I am using jQuery to manually hide it
					$('#p_loader').html('');
					$scope.$apply();

				}
				if (vm.gotTemperature == true) {

				}
			}

		}

		// prompts the user for access to their location
		vm.promptForLocation = function () {

			vm.output = 'Allow access to your location.';

			// I cannot capture when the user does not allow location access.  See the accepted answer here on Stack Overflow:
			// http://stackoverflow.com/questions/5947637/function-fail-never-called-if-user-declines-to-share-geolocation-in-firefox
			// "... This means that getCurrentPosition can return either because the user closed the confirmation UI, or because it 
			// successfully started it asynchronous request - there doesn't appear to be a way to discriminate between the two."
			// so... I am showing the "Change Location" button to solve for this.

			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition(vm.getCurrentPosition_onSuccess, vm.getCurrentPosition_onError);
			} else {
				// i.e., Google Chrome does not support this feature.
				vm.output = "Geolocation is not supported by this browser.";
				vm.getByLocation = false;

				clearTimeout(vm.incrementer);

			}

			vm.ticks = 0;
			vm.increment();

		}

		vm.getCurrentPosition_onSuccess = function (position) {

			vm.getByLocation(position.coords.latitude, position.coords.longitude);

		}

		vm.getCurrentPosition_onError = function (error) {

			vm.gotTemperature = false;
			vm.getByLocation = false; // display form

			// show errors
			console.log('Error getting by lat/long (location):');
			console.log(error);

		}

		// show the display output
		vm.displayResponse = function (response) {

			console.log(response);

			if (response.data.list == undefined) {
				vm.temperature = Math.round(response.data.main.temp * (9 / 5) - 459.67);
				vm.location = response.data.name;
				vm.description = response.data.weather[0].description;
				vm.main = response.data.weather[0].main;
			} else {
				vm.temperature = Math.round(response.data.list[0].main.temp * (9 / 5) - 459.67);
				vm.location = response.data.list[0].name;
				vm.description = response.data.list[0].weather[0].description;
				vm.main = response.data.list[0].weather[0].main;
			}

			vm.getByLocation = true;
			vm.gotTemperature = true;
			vm.countdown = '';
			vm.message = '';
			$('#p_loader').html('');

		}

		// clean up any memory leaks
		$scope.$on('$destroy', function () { });

		// init()
		vm.init = function () {
			debugger;
			vm.gotTemperature = false;
			vm.promptForLocation();
		};

		vm.init();

		return vm;
	}
}());
