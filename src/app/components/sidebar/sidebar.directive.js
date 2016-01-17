(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .directive('yamahaSidebar',function () {
            return {
                restrict: 'E',
                templateUrl: 'app/components/sidebar/sidebar.html',
                scope: {},
                controller: SidebarController,
                controllerAs: 'sidebar',
                bindToController: true
            };

            /** @ngInject */
            function SidebarController($timeout, $mdSidenav) {
                var vm = this;
                vm.closeSidebar = function () {
                    $mdSidenav('left').close();
                }
            }
        });

})();
