(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .controller('Zone1Controller', function ($scope, yamahaBackend) {
            var vm = this;
            $scope.zone = yamahaBackend.zones[0];
            $scope.sleepTimers = [
                {
                    name: 'Off',
                    icon: 'timer'
                },
                {
                    name: '30"',
                    icon: 'timer'
                },
                {
                    name: '60"',
                    icon: 'timer'
                },
                {
                    name: '90"',
                    icon: 'timer'
                },
                {
                    name: '120"',
                    icon: 'timer'
                }
            ];
            vm.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };

            vm.setSleepTimer = function (timerValue) {
                $scope.sleepTimer = timerValue;
            }
        });
})();
