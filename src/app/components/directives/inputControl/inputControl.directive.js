/**
 * @ngdoc directive
 * @name yamahaUi:inputControl
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('inputControl', function () {
        return {
            restrict: 'E',
            scope: {
                input: '=',
                inputslist: '='
            },
            controller: function ($scope) {
                var vm = this;
                vm.openMenu = function ($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };
                vm.changeInput = function (inputName) {
                    if($scope.inputslist.some(function (item) {
                            return item.name === inputName;
                        })) {
                        $scope.input = inputName;
                    }
                };
            },
            controllerAs: 'inputControl',
            templateUrl: '/app/components/directives/inputControl/inputControl.tmpl.html'
        };
    });
