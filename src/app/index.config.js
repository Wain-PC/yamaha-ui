(function() {
  'use strict';

  angular
    .module('yamahaUi')
    .config(config);

  /** @ngInject */
  function config($logProvider, $locationProvider, $mdThemingProvider) {
    // Enable log
    $logProvider.debugEnabled(true);
    $locationProvider.html5Mode(true);

    $mdThemingProvider.theme('default')
        .primaryPalette('blue-grey')
        .accentPalette('deep-orange');
  }

})();
