//jshint strict: false
module.exports = function(config) {
  config.set({

    basePath: '',

    files: [

      'index.html',
      
      'scripts/jquery/jquery.min.js',

      'scripts/angular/angular.min.js',
      'scripts/angular/angular-route.min.js',
      'scripts/angular/angular-ui-router.min.js',
      'scripts/angular/angular-mocks.js',

      'app/weatherApp.js',
      'app/weather-app/modules/weather/weatherModule.js',
      'app/weather-app/modules/weather/weatherService.js',
      'app/weather-app/modules/weather/weather-controller.js',
        
      'app/weather-app/modules/weather/weather-controller.spec.js'

    ],

    autoWatch: true,

    frameworks: ['jasmine'],

    browsers: ['Chrome', 'Firefox'],

    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine'
    ]

  });
};
