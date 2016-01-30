(function () {
    'use strict';

    angular
        .module('yamahaUi')
        .controller('Zone2Controller', function ($scope, pubSub, yamahaBackend) {
            var vm = this,
                watcherSet = false;

            pubSub.subscribe('backend:change', $scope, function (event, data) {
                var zoneId;
                //this will fill in the zones
                vm.zone = data.zones[1];
                zoneId = vm.zone.id;
                if(!watcherSet) {
                    watcherSet = true;
                    if(zoneId) {
                        pubSub.addEvent({
                            name: 'frontend:change:'+zoneId,
                            getter: function () {
                                return vm.zone;
                            }
                        });
                    }
                }
                $scope.$watchCollection('zone2.zone', function (newValue, oldValue) {
                    //send request with some property back to the service here
                    pubSub.notify('frontend:change:'+newValue['id'], oldValue);
                });
            }, true);
        });
})();
