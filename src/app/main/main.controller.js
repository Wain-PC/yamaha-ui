(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .controller('MainController', function ($scope, pubSub) {
            var _self = this;
            var watcherSet = false;
            this.zones = [{},{},{},{}];
            pubSub.subscribe('backend:change', $scope, function (event, data) {
                angular.extend(_self, data);
            }, true);

            $scope.$watchCollection('main.zones[0]', function (newValue, oldValue) {
                //send request with some property back to the service
            });
        });
})();
