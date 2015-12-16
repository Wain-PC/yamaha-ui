//create the controller for the main page
var App = angular.module('yamaha.ui', ['ngAnimate', 'ui.bootstrap']);

App.constant('Yamaha',
    window.Yamaha
);

//add controller for navbar
App.controller('NavbarController', function ($scope) {

});
//add controller for main page
App.controller('MainPage', function ($scope, yamahaAPI) {

    var updateBasicStatus = function () {
        return yamahaAPI.getBasicStatus().then(function (basicStatus) {
            $scope.basicStatus = basicStatus;
            $scope.tabs = [];

            var zones = basicStatus.availableZones;
            for(var i=1;i<=zones;i++) {
                if(i===1) {
                    $scope.tabs.push({title: 'Main zone', url: ''});
                    continue;
                }
                $scope.tabs.push({title: 'Zone '+i, url: 'zone_'+i});
            }
            $scope.$apply();
        });
    };
        //first get the app status
        updateBasicStatus();
        $scope.performAction = function (action, value) {
            if(yamahaAPI[action] && yamahaAPI[action] instanceof Function) {
                yamahaAPI[action](value).then(function () {
                   return updateBasicStatus();
                });
            }
        };

    })
    //add factory for remote API
    .factory('yamahaAPI', function (Yamaha) {
        //return new Yamaha();
        //for now, use fake apis
        return new function () {
            var currentState = {
                isOn: false,
                volume: -500,
                isMuted: false,
                currentInput: 'NET RADIO',
                availableInputs: ['HDMI1', 'HDMI2', 'AV1', 'AV2', 'NET RADIO', 'USB'],
                currentSoundProgram: 'Straight',
                availableSoundPrograms: ['Straight', '2ch stereo', '7ch stereo'],
                availableZones: 3
            };

            this.activeZone = 1;

            this.getBasicStatus = function () {
                return Promise.resolve(currentState)
            };

            this.turnOn = function () {
                currentState.isOn = true;
                return Promise.resolve(true);
            };

            this.turnOff = function () {
                currentState.isOn = false;
                return Promise.resolve(false);
            };
            this.setMute = function (muteState) {
                currentState.isMuted = !!muteState;
                return Promise.resolve(false);
            };
            this.setInput = function (input) {
                currentState.currentInput = currentState.availableInputs[1];
                return Promise.resolve(currentState.availableInputs[1]);
            };
        };
    });