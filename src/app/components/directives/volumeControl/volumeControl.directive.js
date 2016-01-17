/**
 * @ngdoc directive
 * @name yamahaUi:volumeControl
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('volumeControl', function () {
        return {
            restrict: 'E',
            scope: {
                volume: '=',
                ismuted: '='
            },
            controller: function ($scope) {
                var vm = this;
                vm.openMenu = function ($mdOpenMenu, ev) {
                    $mdOpenMenu(ev);
                };
                vm.toggleMute = function () {
                    $scope.ismuted = !$scope.ismuted;
                };
                vm.changeVolumeBy = function (volumeDiff) {
                    $scope.volume += volumeDiff;
                };
            },
            controllerAs: 'volumeControl',
            templateUrl: '/app/components/directives/volumeControl/volumeControl.tmpl.html'
        };
    });
