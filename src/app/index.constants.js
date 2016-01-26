(function() {
  'use strict';

  angular
    .module('yamahaUi')
      .constant('yamahaJS', new Yamaha({
          ip: '192.168.1.217'
      }));
})();
