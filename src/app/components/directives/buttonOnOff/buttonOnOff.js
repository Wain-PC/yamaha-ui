/**
 * @ngdoc directive
 * @name yamahaUi:buttonOnOff
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('buttonOnOff', function () {
        return {
            restrict: 'E',
            scope: {
                param: '='
            },
            controller: function ($scope) {
                var vm = this;
                vm.toggle = function () {
                    $scope.param = !$scope.param;
                };
                vm.turnOn = function () {
                    $scope.param = true;
                };
                vm.turnOff = function () {
                    $scope.param = false;
                };
            },
            controllerAs: 'buttonOnOff',
            templateUrl: '/app/components/directives/buttonOnOff/buttonOnOff.tmpl.html'
        };
    });
