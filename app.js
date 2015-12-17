//create the controller for the main page
var App = angular.module('yamaha.ui', ['ngAnimate', 'ui.bootstrap', 'ui.bootstrap-slider']);

App.constant('Yamaha',
    window.Yamaha
);

//add controller for main page
App.controller('MainPage', function ($scope, yamahaAPI) {
        $scope.basicStatus = {};
        $scope.systemConfig = {};

    var updateBasicInfo = function () {
        return yamahaAPI.getBasicInfo(true).then(function (basicInfo) {
            $scope.basicStatus = basicInfo;
            $scope.$apply();
        });
    };

    $scope.volumeChange = function (by) {
        $scope.basicStatus.currentVolume += parseInt(by*10);
    };

        var updateSystemInfo = function () {
            return yamahaAPI.getSystemConfig(true).then(function (systemConfig) {
                $scope.systemConfig = systemConfig;
                $scope.zones = systemConfig.availableZones;
                $scope.$apply();
            });
        };
        //first get the app status
        updateBasicInfo().then(updateSystemInfo);

        $scope.performAction = function (action, value) {
            if(yamahaAPI[action] && yamahaAPI[action] instanceof Function) {
                yamahaAPI[action](value).then(updateBasicInfo);
            }
        };

    //listen for currentVolume changes and change volume info on the receiver
        $scope.$watch(function(scope) { return scope.basicStatus.currentVolume },
            function(newValue, oldValue) {
                $scope.performAction('setVolume',newValue);
            }
        );

    })
    //add factory for remote API
    .factory('yamahaAPI', function (Yamaha) {
        return new Yamaha({
            ip: '192.168.1.217',
            responseDelay: 0
        });
    });