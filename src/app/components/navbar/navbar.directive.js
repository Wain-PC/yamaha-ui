(function() {
  'use strict';

  angular
    .module('yamahaUi')
    .directive('yamahaNavbar', acmeNavbar);

  /** @ngInject */
  function acmeNavbar() {
    return {
      restrict: 'E',
      templateUrl: 'app/components/navbar/navbar.html',
      scope: {
          zones: '='
      },
      controller: NavbarController,
      controllerAs: 'vm',
      bindToController: true
    };

    /** @ngInject */
    function NavbarController($scope, $mdMedia, $mdSidenav) {
      var vm = this;
      vm.options = {};
      $scope.zones= [
        {
          url: '/zone1',
          name: 'Zone 1'
        },
        {
          url: '/zone2',
          name: 'Zone 2'
        },
        {
          url: '/zone3',
          name: 'Zone 3'
        },
        {
          url: '/zone4',
          name: 'Zone 4'
        }
      ];
      $scope.$watch(function() {
        vm.options.desktopMode = $mdMedia('gt-sm');
      });

      vm.openSidebar = function () {
        $mdSidenav('left').open();
      };

      vm.lastChar = function (str) {
        return str[str.length - 1];
      };
    }
  }

})();
