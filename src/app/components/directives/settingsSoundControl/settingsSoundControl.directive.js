/**
 * @ngdoc directive
 * @name yamahaUi:settingsSoundControl
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('settingsSoundControl', function () {
        return {
            restrict: 'E',
            scope: {
                options: '=',
                value: '='
            },
            controller: function ($scope) {
                var vm = this;
                vm.clicks = 0;
                vm.options = $scope.options;
                vm.value = $scope.value;
                vm.openMenu = function ($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };

                vm.changeValue = function (step,multiplier) {
                    var diff = multiplier*step;
                    vm.clicks++;
                    if(vm.clicks === 3) {
                        debugger;
                    }
                    if((vm.value+diff) >= vm.options.min && (vm.value+diff) <= vm.options.max) {
                        vm.value += diff;
                    }
                };
            },
            controllerAs: 'soundControlButton',
            templateUrl: '/app/components/directives/settingsSoundControl/settingsSoundControl.tmpl.html'
        };
    });
