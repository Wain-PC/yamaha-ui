/**
 * @ngdoc directive
 * @name yamahaUi:pageLoader
 *
 * @description
 *
 *
 * @restrict E
 * */
angular.module('yamahaUi')
    .directive('pageLoader', function () {
        return {
            restrict: 'E',
            controller: function ($scope, $rootScope, pubSub) {
                $rootScope.pageLoading = true;
                pubSub.subscribe('backend:change', $scope, function (event, data) {
                    $rootScope.pageLoading = false;
                });
            },
            controllerAs: 'pageLoader',
            templateUrl: '/app/components/directives/pageLoader/pageLoader.tmpl.html'
        };
    });
