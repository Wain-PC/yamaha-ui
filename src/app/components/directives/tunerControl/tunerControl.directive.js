/**
 * @ngdoc directive
 * @name yamahaUi:tunerControl
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('tunerControl', function () {
        return {
            restrict: 'E',
            scope: {
                options: '='
            },
            controller: function ($scope) {
                var vm = this;
                vm.openMenu = function ($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };

                vm.changeFrequency = function (multiplier) {
                    $scope.options.value += multiplier*$scope.freqs[$scope.options.type].step;
                };

                $scope.freqs = {
                    AM: {
                        min: 531,
                        max: 1602,
                        step: 1,
                        title: 'KHz'
                    },
                    FM: {
                        min: 88,
                        max: 108,
                        step: 0.1,
                        title: 'MHz'
                    }
                };
            },
            controllerAs: 'tunerControl',
            templateUrl: '/app/components/directives/tunerControl/tunerControl.tmpl.html'
        };
    });
