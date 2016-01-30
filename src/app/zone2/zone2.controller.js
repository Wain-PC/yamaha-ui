(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .controller('Zone1Controller', function ($scope, pubSub, yamahaBackend) {
            var vm = this,
                watcherSet = false;

            pubSub.subscribe('backend:change', $scope, function (event, data) {
                var zoneId;
                //this will fill in the zones
                vm.zone = data.zones[0];
                zoneId = vm.zone.id;
                if(!watcherSet) {
                    watcherSet = true;
                    //set watcher (if not previously set)
                    vm.zone.sleepTimers = [
                        {
                            name: 'Off',
                            icon: 'timer'
                        },
                        {
                            name: '30"',
                            icon: 'timer'
                        },
                        {
                            name: '60"',
                            icon: 'timer'
                        },
                        {
                            name: '90"',
                            icon: 'timer'
                        },
                        {
                            name: '120"',
                            icon: 'timer'
                        }
                    ];
                    if(zoneId) {
                        pubSub.addEvent({
                            name: 'frontend:change:'+zoneId,
                            getter: function () {
                                return vm.zone;
                            }
                        });
                    }
                }
                $scope.$watchCollection('zone1.zone', function (newValue, oldValue) {
                    //send request with some property back to the service here
                    pubSub.notify('frontend:change:'+newValue['id'], oldValue);
                });
            }, true);

            vm.openMenu = function ($mdOpenMenu, ev) {
                $mdOpenMenu(ev);
            };

            vm.setScene = function (sceneNumber) {
                yamahaBackend.setMainZoneScene(sceneNumber+1);
            }
        });
})();
