/**
 * @ngdoc directive
 * @name yamahaUi:buttonToggle
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('buttonToggle', function () {
        return {
            restrict: 'E',
            transclude: true,
            scope: {
                param: '=',
                iconenabled: '@',
                icondisabled: '@'
            },
            controller: function ($scope) {
                var vm = this;
                vm.toggle = function () {
                    $scope.param = !$scope.param;
                };
                vm.disable = function () {
                    $scope.param = false;
                };
                vm.enable = function () {
                    $scope.param = true;
                };
            },
            controllerAs: 'buttonToggle',
            templateUrl: '/app/components/directives/buttonToggle/buttonToggle.tmpl.html'
        };
    });
