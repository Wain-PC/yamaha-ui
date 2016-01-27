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
                vm.options = $scope.options;
                vm.value = $scope.value;
                vm.openMenu = function ($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };

                vm.changeValue = function (step,multiplier) {
                    var diff = multiplier*step;
                    if((vm.value+diff) >= vm.options.min && (vm.value+diff) <= vm.options.max) {
                        vm.value += diff;
                    }
                };
            },
            controllerAs: 'soundControlButton',
            templateUrl: '/app/components/directives/settingsSoundControl/settingsSoundControl.tmpl.html'
        };
    });
